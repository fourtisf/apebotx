#!/usr/bin/env node
/**
 * Always-on tweet worker. Polls the local tweet-dispatch endpoint on an interval
 * so the auto-tweet channel keeps posting (at most one, strictly-gated tweet per
 * tick) without anyone viewing the app. Run under PM2:
 *
 *   pm2 start scripts/tweet-worker.mjs --name ocolos-tweets && pm2 save
 *
 * The dispatcher enforces its own pacing (min spacing + per-hour/day caps), so a
 * short poll interval here just means it *checks* often — it never over-posts.
 */
import { readFile } from "node:fs/promises";

/**
 * Load .env.local so a PM2-launched worker inherits INGEST_SECRET / PORT. Plain
 * `node` doesn't read .env.local (only Next does), so without this the worker
 * hits /api/tweets/dispatch with NO secret while the server expects one — every
 * tick 401s and nothing is ever posted. Existing env wins.
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
const intervalMs = (Number(process.env.TWEET_INTERVAL_SEC) || 60) * 1000;
const url = `http://localhost:${port}/api/tweets/dispatch${
  secret ? `?secret=${encodeURIComponent(secret)}` : ""
}`;

async function tick() {
  try {
    const r = await fetch(url);
    const j = await r.json();
    if (j.posted) console.log(new Date().toISOString(), "tweeted", j.posted);
  } catch (e) {
    console.error("tweet-worker:", e.message);
  }
}

console.log(`Ocolos tweet worker → ${url} every ${intervalMs / 1000}s`);
tick();
setInterval(tick, intervalMs);
