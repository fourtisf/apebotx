#!/usr/bin/env node
/**
 * Render the Ocolos social banners to PNG (1500×500 @2x → 3000×1000, X-header
 * size) with Playwright + the pre-installed Chromium. Run from the project dir:
 *   node scripts/make-banners.mjs
 * Outputs: public/social/x-banner.png (Ocolos) and
 *          public/social/banner-robinhood-soon.png (Robinhood Chain — Soon).
 */
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

// Shared bot-head mark (hexagon head + antenna beacon + two eyes + mouth).
const mark = (id, size) => `
<svg width="${size}" height="${size}" viewBox="0 0 32 32" style="filter:drop-shadow(0 0 18px rgba(124,77,255,.55))">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#a98bff"/><stop offset="55%" stop-color="#7c4dff"/><stop offset="100%" stop-color="#22d3ee"/>
  </linearGradient></defs>
  <circle cx="16" cy="4.4" r="1.7" fill="url(#${id})"/>
  <line x1="16" y1="6" x2="16" y2="8.7" stroke="url(#${id})" stroke-width="1.9" stroke-linecap="round"/>
  <path d="M16 8.7 L24.7 13.35 L24.7 22 L16 26.7 L7.3 22 L7.3 13.35 Z" fill="none" stroke="url(#${id})" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="12.6" cy="17.2" r="1.7" fill="url(#${id})"/>
  <circle cx="19.4" cy="17.2" r="1.7" fill="url(#${id})"/>
  <line x1="13" y1="21.6" x2="19" y2="21.6" stroke="url(#${id})" stroke-width="1.7" stroke-linecap="round"/>
</svg>`;

const base = `
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1500px;height:500px}
  body{font-family:'Inter','Segoe UI',system-ui,'Helvetica Neue',Arial,sans-serif;
       -webkit-font-smoothing:antialiased}
  .stage{position:relative;width:1500px;height:500px;overflow:hidden;
    background:linear-gradient(135deg,#08070e 0%,#0b0a14 58%,#0e0a1a 100%)}
  .grid{position:absolute;inset:0;
    background-image:linear-gradient(rgba(124,77,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(124,77,255,.05) 1px,transparent 1px);
    background-size:48px 48px}
  .vignette{position:absolute;inset:0;
    background:radial-gradient(120% 120% at 50% 120%,transparent 55%,rgba(0,0,0,.55) 100%)}
  .grad{background:linear-gradient(135deg,#a98bff 0%,#7c4dff 55%,#22d3ee 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .word{background:linear-gradient(180deg,#a98bff,#5a2fe0);
    -webkit-background-clip:text;background-clip:text;color:transparent}
`;

// ─────────────── Banner 1 — Ocolos ───────────────
const ocolos = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .aura{position:absolute;right:-120px;top:50%;transform:translateY(-50%);
    width:820px;height:680px;border-radius:50%;
    background:radial-gradient(closest-side,rgba(124,77,255,.42),rgba(124,77,255,0))}
  .trail{position:absolute;inset:0}
  .content{position:absolute;left:92px;top:78px}
  .word1{font-size:118px;font-weight:800;letter-spacing:1px;color:#f4f3f8;line-height:1}
  .tag{margin-top:20px;font-size:33px;font-weight:700;color:#b9b6cc;letter-spacing:.3px}
  .rule{margin-top:26px;width:470px;height:3px;border-radius:2px;
    background:linear-gradient(90deg,#7c4dff,rgba(124,77,255,0))}
  .chips{margin-top:30px;display:flex;gap:40px;font-size:24px;font-weight:700;color:#cabfe6}
  .chips .d{display:flex;align-items:center;gap:13px}
  .dot{width:12px;height:12px;border-radius:50%;background:#7c4dff;
    box-shadow:0 0 12px rgba(124,77,255,.9)}
  .foot{position:absolute;left:95px;bottom:44px;display:flex;align-items:center;gap:26px}
  .handle{font-size:27px;font-weight:800;color:#8b6bff;letter-spacing:.4px}
  .site{font-size:22px;font-weight:700;color:#6c6984;letter-spacing:1px}
  .badge{font-size:20px;font-weight:800;color:#22d3ee;letter-spacing:2px;
    border:1.5px solid rgba(34,211,238,.4);border-radius:999px;padding:7px 16px}
  .markwrap{position:absolute;right:150px;top:50%;transform:translateY(-50%)}
</style></head><body>
  <div class="stage">
    <div class="grid"></div>
    <div class="aura"></div>
    <svg class="trail" viewBox="0 0 1500 500" preserveAspectRatio="none">
      <path d="M40 410 L300 372 L470 396 L660 300 L840 338 L1010 210 L1180 250 L1470 88"
        fill="none" stroke="#7c4dff" stroke-width="3" opacity=".14"/>
      <circle cx="1010" cy="210" r="6" fill="#22d3ee" opacity=".7"/>
      <circle cx="1470" cy="88" r="6" fill="#ff5cc8" opacity=".7"/>
    </svg>
    <div class="markwrap">${mark("em1", 300)}</div>
    <div class="content">
      <div class="word1"><span class="word">OCO</span>LOS</div>
      <div class="tag">The smartest money on Solana leaves a trail.</div>
      <div class="rule"></div>
      <div class="chips">
        <div class="d"><span class="dot"></span>Scored wallets</div>
        <div class="d"><span class="dot"></span>Anti-rug fused</div>
        <div class="d"><span class="dot"></span>24/7 autonomous</div>
      </div>
    </div>
    <div class="foot">
      <span class="handle">@Ocolosxyz</span>
      <span class="site">ocolos.xyz</span>
      <span class="badge">SOLANA · LIVE ON X</span>
    </div>
    <div class="vignette"></div>
  </div>
</body></html>`;

// ─────────────── Banner 2 — Robinhood Chain (Coming Soon) ───────────────
const robinhood = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .auraV{position:absolute;left:-190px;top:50%;transform:translateY(-50%);
    width:680px;height:600px;border-radius:50%;
    background:radial-gradient(closest-side,rgba(124,77,255,.28),rgba(124,77,255,0))}
  .auraG{position:absolute;right:-230px;top:50%;transform:translateY(-50%);
    width:720px;height:620px;border-radius:50%;
    background:radial-gradient(closest-side,rgba(0,224,122,.17),rgba(0,224,122,0))}
  .greenword{background:linear-gradient(135deg,#c6ff5e 0%,#00e07a 55%,#00c805 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent;
    filter:drop-shadow(0 0 30px rgba(0,224,122,.22))}
  .lock{position:absolute;left:92px;top:52px;display:flex;align-items:center;gap:16px}
  .lock .nm{font-size:30px;font-weight:800;letter-spacing:2px;color:#e9e7f2}
  .kicker{position:absolute;left:94px;top:142px;font-size:23px;font-weight:800;letter-spacing:6px;color:#8b6bff}
  .big{position:absolute;left:90px;top:176px;font-size:82px;font-weight:800;line-height:1;color:#f4f3f8}
  .row{position:absolute;left:94px;top:300px;display:flex;align-items:center;gap:26px}
  .soon{display:inline-flex;align-items:center;gap:11px;font-size:23px;font-weight:800;
    letter-spacing:3px;color:#041209;background:linear-gradient(135deg,#c6ff5e,#00e07a);
    border-radius:999px;padding:10px 22px;box-shadow:0 0 22px rgba(0,224,122,.4)}
  .soon .p{width:11px;height:11px;border-radius:50%;background:#041209}
  .sub{font-size:27px;font-weight:700;color:#b9b6cc;letter-spacing:.3px}
  .chips{position:absolute;left:94px;top:392px;display:flex;gap:42px;font-size:23px;font-weight:800;letter-spacing:.5px}
  .chip{display:flex;align-items:center;gap:13px}
  .chip.live{color:#cabfe6}.chip.live .p{background:#7c4dff;box-shadow:0 0 12px rgba(124,77,255,.9)}
  .chip.soon2{color:#9fe7bf}.chip.soon2 .p{background:#00e07a;box-shadow:0 0 12px rgba(0,224,122,.9)}
  .chip .p{width:12px;height:12px;border-radius:50%}
  .foot{position:absolute;left:94px;top:450px;font-size:23px;font-weight:800;color:#8b6bff;letter-spacing:.4px}
  .foot span{color:#6c6984;font-weight:700;letter-spacing:1px}
</style></head><body>
  <div class="stage">
    <div class="grid"></div>
    <div class="auraV"></div>
    <div class="auraG"></div>
    <div class="lock">${mark("em2", 46)}<span class="nm">OCOLOS</span></div>
    <div class="kicker">THE EYE IS EXPANDING</div>
    <div class="big"><span class="greenword">Robinhood Chain</span></div>
    <div class="row">
      <span class="soon"><span class="p"></span>COMING SOON</span>
      <span class="sub">Smart-money tracking moves beyond Solana.</span>
    </div>
    <div class="chips">
      <span class="chip live"><span class="p"></span>SOLANA — LIVE</span>
      <span class="chip soon2"><span class="p"></span>ROBINHOOD CHAIN — SOON</span>
    </div>
    <div class="foot">@Ocolosxyz&nbsp;&nbsp;·&nbsp;&nbsp;<span>ocolos.xyz</span></div>
    <div class="vignette"></div>
  </div>
</body></html>`;

const jobs = [
  { html: ocolos, out: "public/social/x-banner.png" },
  { html: robinhood, out: "public/social/banner-robinhood-soon.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1500, height: 500 },
  deviceScaleFactor: 2,
});
for (const j of jobs) {
  await page.setContent(j.html, { waitUntil: "networkidle" });
  const buf = await page.screenshot({ type: "png" });
  await writeFile(j.out, buf);
  console.log(`✓ ${j.out} (${(buf.length / 1024).toFixed(0)} KB)`);
}
await browser.close();
