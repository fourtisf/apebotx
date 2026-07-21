import { NextResponse } from "next/server";
import type { SmartEvent } from "@/lib/server/store";
import type { WalletQuality } from "@/lib/server/walletQuality";
import { buildTweet, loadConfig, pickStyle } from "@/lib/server/tweetGate";
import { postTweet } from "@/lib/server/twitter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Force ONE representative signal tweet through the REAL compose path
 * (buildTweet from tweetGate.ts → postTweet), for end-to-end verification that
 * the X channel actually posts. It deliberately BYPASSES the candidate pool,
 * the quality gate, and the anti-spam pacing — those exist to keep the live
 * account quiet, which is exactly what you don't want when smoke-testing — and
 * it does NOT write to the rate-limit history, so a force test can never
 * suppress a real post.
 *
 *   GET /api/tweets/force?secret=INGEST_SECRET            → posts a sample
 *   GET /api/tweets/force?secret=...&dry=1                → compose only, no post
 *   GET /api/tweets/force?secret=...&token=WIF&usd=50000&style=punchy
 *
 * Auth = INGEST_SECRET (?secret= or Authorization), mirroring the other routes.
 */
function authorized(req: Request): boolean {
  const secret = process.env.INGEST_SECRET;
  if (!secret) return true;
  const auth = req.headers.get("authorization") || "";
  const url = new URL(req.url);
  return auth === secret || url.searchParams.get("secret") === secret;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const cfg = loadConfig();

  const token = url.searchParams.get("token") || "WIF";
  const usd = Number(url.searchParams.get("usd")) || 50000;
  // A real, established mint keeps the cashtag/link plausible; the numbers below
  // are synthetic so the sample always reads like a clean high-conviction buy.
  const mint =
    url.searchParams.get("mint") ||
    "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm"; // $WIF
  const ev: SmartEvent = {
    id: `force-${Date.now()}`,
    ts: Date.now(),
    chain: "solana",
    wallet: "ForceTestWa11etOcolos000000000000000000000000",
    walletShort: "Forc…olos",
    label: "Test",
    segment: "smart",
    action: "buy",
    token,
    tokenMint: mint,
    amountUsd: usd,
    marketCapUsd: 2_000_000,
    liquidityUsd: 1_000_000,
    tokenAgeMin: 240,
    risk: { verdict: "ok", reasons: [] },
  };
  const quality: WalletQuality = {
    wallet: ev.wallet,
    segment: "smart",
    winRate: 88,
    closedTrades: 12,
    pnlUsd: 640_000,
    trades: 20,
    observed: true,
  };

  const style = url.searchParams.get("style") || pickStyle([], cfg);
  const text = buildTweet(ev, quality, cfg, style);

  if (url.searchParams.get("dry") === "1") {
    return NextResponse.json({ ok: true, dryRun: true, style, chars: text.length, text });
  }

  const res = await postTweet(text);
  return NextResponse.json({ ...res, style, chars: text.length, text });
}
