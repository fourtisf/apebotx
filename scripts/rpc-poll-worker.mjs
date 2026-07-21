#!/usr/bin/env node
/**
 * Solana RPC poll worker — the free, no-Helius fallback.
 *
 * Polls tracked wallets for new swaps via the local /api/ingest/rpc-poll
 * endpoint on an interval, so smart-money trades flow into the terminal +
 * Telegram alerts WITHOUT a Helius webhook (and without its monthly credit cap).
 *
 * ⚠️  Pick ONE ingest mode. If you run the Helius webhook
 *     (scripts/setup-helius-webhook.mjs), STOP this worker —
 *     `pm2 stop ocolos-rpc` — because polling pulls every wallet every cycle
 *     regardless of activity, so a paid RPC (Helius) burns credits here. This
 *     worker is meant for the FREE public RPC, when you have no Helius webhook.
 *
 * Run under PM2 (alongside `ocolos` + `ocolos-alerts`):
 *   pm2 start scripts/rpc-poll-worker.mjs --name ocolos-rpc && pm2 save
 *
 * Tunables (env / .env): SOLANA_RPC_URL, RPC_POLL_INTERVAL_SEC (default 30),
 * RPC_SIGS_PER_WALLET, RPC_CALL_DELAY_MS, RPC_MAX_AGE_MIN, RPC_MAX_WALLETS.
 */
import { readFile } from "node:fs/promises";

/**
 * Load .env.local so a PM2-launched worker inherits INGEST_SECRET / PORT / the
 * tunables above. Plain `node` doesn't read .env.local (only Next does), so
 * without this the worker calls the API with NO secret while the server expects
 * one — every tick 401s and nothing is ingested. Existing env wins.
 */
async function loadEnvLocal() {
  let txt = "";
  try {
    txt = await readFile(new URL("../.env.local", import.meta.url), "utf8");
  } catch {
    try {
      txt = await readFile(".env.local", "utf8");
    } catch {
      return;
    }
  }
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    } else {
      const hash = val.indexOf(" #");
      if (hash !== -1) val = val.slice(0, hash).trim();
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
await loadEnvLocal();

const port = process.env.PORT || 3000;
const secret = process.env.INGEST_SECRET || "";
const intervalMs = (Number(process.env.RPC_POLL_INTERVAL_SEC) || 30) * 1000;
const url = `http://localhost:${port}/api/ingest/rpc-poll${
  secret ? `?secret=${encodeURIComponent(secret)}` : ""
}`;

let busy = false; // a cycle can take a few seconds; never overlap ticks

async function tick() {
  if (busy) return;
  busy = true;
  try {
    const r = await fetch(url);
    const j = await r.json();
    if (j.ingested) {
      console.log(new Date().toISOString(), `ingested ${j.ingested}/${j.found}`);
    } else if (j.ok === false) {
      console.error("rpc-poll-worker:", j.error || r.status);
    }
  } catch (e) {
    console.error("rpc-poll-worker:", e.message);
  } finally {
    busy = false;
  }
}

console.log(`Ocolos RPC poll worker → ${url} every ${intervalMs / 1000}s`);
tick();
setInterval(tick, intervalMs);
