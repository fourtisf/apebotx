#!/usr/bin/env node
/**
 * Render the Ocolos social banners to PNG (1500×500 @2x → 3000×1000, X-header
 * size) with Playwright + the pre-installed Chromium, using embedded premium
 * fonts (Space Grotesk display + Inter UI). Run from the project dir:
 *   npm install --no-save @fontsource/space-grotesk @fontsource/inter
 *   node scripts/make-banners.mjs
 * Outputs: public/social/x-banner.png (Ocolos live feed) and
 *          public/social/banner-robinhood-soon.png (Robinhood Chain — will be added).
 */
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";

// ── embed fonts as base64 @font-face (self-contained render) ──────────────────
async function face(family, weight, file) {
  const b64 = (await readFile(file)).toString("base64");
  return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
}
const SG = "node_modules/@fontsource/space-grotesk/files";
const IN = "node_modules/@fontsource/inter/files";
const fonts = (
  await Promise.all([
    face("Space Grotesk", 500, `${SG}/space-grotesk-latin-500-normal.woff2`),
    face("Space Grotesk", 600, `${SG}/space-grotesk-latin-600-normal.woff2`),
    face("Space Grotesk", 700, `${SG}/space-grotesk-latin-700-normal.woff2`),
    face("Inter", 500, `${IN}/inter-latin-500-normal.woff2`),
    face("Inter", 600, `${IN}/inter-latin-600-normal.woff2`),
    face("Inter", 700, `${IN}/inter-latin-700-normal.woff2`),
  ])
).join("\n");

// ── shared bot-head mark (hexagon + antenna beacon + eyes + mouth) ────────────
const mark = (id, size) => `
<svg width="${size}" height="${size}" viewBox="0 0 32 32" style="filter:drop-shadow(0 0 14px rgba(124,77,255,.6))">
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

const spark = (color) => `
<svg width="72" height="26" viewBox="0 0 72 26" fill="none">
  <path d="M2 20 L14 16 L24 18 L36 9 L48 12 L60 5 L70 3" stroke="${color}" stroke-width="2.4"
    stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
  <circle cx="70" cy="3" r="2.6" fill="${color}"/>
</svg>`;

const base = `
  ${fonts}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1500px;height:500px}
  body{font-family:'Inter',system-ui,Arial,sans-serif;-webkit-font-smoothing:antialiased;
       text-rendering:geometricPrecision}
  .stage{position:relative;width:1500px;height:500px;overflow:hidden;
    background:radial-gradient(130% 130% at 18% 8%, #14102a 0%, #0a0813 46%, #08070e 100%)}
  .grid{position:absolute;inset:0;
    background-image:linear-gradient(rgba(124,77,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(124,77,255,.05) 1px,transparent 1px);
    background-size:52px 52px;mask-image:radial-gradient(120% 120% at 30% 40%,#000 40%,transparent 85%)}
  .vignette{position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(130% 130% at 50% 130%,transparent 52%,rgba(0,0,0,.6) 100%)}
  .disp{font-family:'Space Grotesk','Inter',sans-serif}
  .gradV{background:linear-gradient(120deg,#c3b0ff 0%,#7c4dff 60%,#22d3ee 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .gradG{background:linear-gradient(120deg,#d4ff7a 0%,#00e07a 55%,#00c805 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .lock{position:absolute;left:88px;top:56px;display:flex;align-items:center;gap:15px}
  .lock .nm{font-family:'Space Grotesk';font-size:29px;font-weight:700;letter-spacing:.5px;color:#f1eff8}
  .panel{position:absolute;border-radius:26px;overflow:hidden;
    background:linear-gradient(160deg,rgba(38,30,66,.66),rgba(13,10,24,.72));
    border:1px solid rgba(168,139,255,.20);
    box-shadow:0 34px 90px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.02),
      inset 0 1px 0 rgba(255,255,255,.07)}
  .panel .sheen{position:absolute;left:0;right:0;top:0;height:120px;
    background:linear-gradient(180deg,rgba(124,77,255,.16),transparent)}
  .phead{position:relative;display:flex;align-items:center;justify-content:space-between;
    padding:22px 24px 14px}
  .phTitle{display:flex;align-items:center;gap:11px;font-family:'Space Grotesk';
    font-size:20px;font-weight:700;letter-spacing:1.5px;color:#efeafb}
  .pulse{width:11px;height:11px;border-radius:50%;background:#ff4d6d;
    box-shadow:0 0 0 4px rgba(255,77,109,.18),0 0 12px rgba(255,77,109,.9)}
  .tag{font-family:'Inter';font-size:14px;font-weight:700;letter-spacing:1.5px;color:#9a92b8;
    border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:5px 12px}
  .rows{position:relative;padding:4px 16px 18px;display:flex;flex-direction:column;gap:11px}
  .row{display:flex;align-items:center;gap:15px;padding:13px 15px;border-radius:15px;
    background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06)}
  .av{width:46px;height:46px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;
    font-family:'Space Grotesk';font-weight:700;font-size:15px;color:#0c0912;
    box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.25),0 6px 16px rgba(0,0,0,.4)}
  .rc{display:flex;flex-direction:column;gap:3px;min-width:0}
  .sym{font-family:'Space Grotesk';font-size:20px;font-weight:700;color:#f4f2fb;line-height:1}
  .act{font-size:14px;font-weight:600;color:#9089ab;line-height:1}
  .spacer{flex:1}
  .amt{font-family:'Space Grotesk';font-size:20px;font-weight:700;color:#eafff3;text-align:right;line-height:1}
  .wr{margin-top:5px;font-size:13px;font-weight:700;color:#7bf5b0;
    background:rgba(0,224,122,.12);border:1px solid rgba(0,224,122,.32);border-radius:999px;padding:3px 9px}
  .foot{position:absolute;left:90px;bottom:44px;display:flex;align-items:center;gap:22px}
  .live{display:inline-flex;align-items:center;gap:10px;font-size:16px;font-weight:700;letter-spacing:2px;
    color:#7bf5b0;background:rgba(0,224,122,.1);border:1px solid rgba(0,224,122,.3);
    border-radius:999px;padding:9px 17px}
  .live .p{width:9px;height:9px;border-radius:50%;background:#00e07a;box-shadow:0 0 10px #00e07a}
  .handle{font-family:'Space Grotesk';font-size:24px;font-weight:700;color:#9d80ff;letter-spacing:.3px}
  .site{font-size:20px;font-weight:600;color:#6c6984;letter-spacing:.5px}
`;

// ─────────────── Banner 1 — Ocolos LIVE signal feed ───────────────
const row = (grad, initials, sym, act, amt, wr) => `
  <div class="row">
    <div class="av" style="background:linear-gradient(135deg,${grad})">${initials}</div>
    <div class="rc"><div class="sym">${sym}</div><div class="act">${act}</div></div>
    <div class="spacer"></div>
    ${spark("#00e07a")}
    <div class="rc" style="align-items:flex-end;text-align:right">
      <div class="amt">${amt}</div><div class="wr">${wr}</div>
    </div>
  </div>`;

const ocolos = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .h{position:absolute;left:88px;top:150px;font-family:'Space Grotesk';font-weight:700;
    font-size:60px;line-height:1.04;letter-spacing:-.5px;color:#f6f4fc}
  .sub{position:absolute;left:90px;top:300px;width:660px;font-size:24px;font-weight:500;
    line-height:1.4;color:#a7a2be}
  .lp{position:absolute;left:912px;top:64px;width:500px;height:372px}
</style></head><body>
  <div class="stage">
    <div class="grid"></div>
    <div class="lock">${mark("em1", 44)}<span class="nm">Ocolos</span></div>
    <div class="h disp">See smart money<br><span class="gradV">the second it moves.</span></div>
    <div class="sub">Ocolos scores Solana's winning wallets and fires the signal the instant they ape in — live on X.</div>
    <div class="foot">
      <span class="live"><span class="p"></span>LIVE</span>
      <span class="handle">@Ocolosxyz</span>
      <span class="site">ocolos.xyz</span>
    </div>
    <div class="panel lp">
      <div class="sheen"></div>
      <div class="phead">
        <div class="phTitle"><span class="pulse"></span>LIVE SIGNALS</div>
        <div class="tag">SOLANA</div>
      </div>
      <div class="rows">
        ${row("#f7b955,#e8863b", "W", "$WIF", "smart-money buy", "$92K", "94% WR")}
        ${row("#8a7bff,#5a2fe0", "P", "$POPCAT", "whale loaded", "$58K", "88% WR")}
        ${row("#ffcf3a,#f79b1a", "B", "$BONK", "conviction buy", "$210K", "91% WR")}
      </div>
    </div>
    <div class="vignette"></div>
  </div>
</body></html>`;

// ─────────────── Banner 2 — Robinhood Chain will be added ───────────────
const chainRow = (grad, initials, name, desc, badge, badgeCls) => `
  <div class="row">
    <div class="av" style="background:linear-gradient(135deg,${grad})">${initials}</div>
    <div class="rc"><div class="sym" style="font-size:19px">${name}</div><div class="act">${desc}</div></div>
    <div class="spacer"></div>
    <span class="cbadge ${badgeCls}">${badge}</span>
  </div>`;

const robinhood = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .h{position:absolute;left:88px;top:150px;font-family:'Space Grotesk';font-weight:700;
    font-size:58px;line-height:1.05;letter-spacing:-.5px;color:#f6f4fc}
  .sub{position:absolute;left:90px;top:300px;width:660px;font-size:24px;font-weight:500;
    line-height:1.4;color:#a7a2be}
  .lp{position:absolute;left:912px;top:78px;width:500px;height:344px}
  .cbadge{font-size:14px;font-weight:700;letter-spacing:1.2px;border-radius:999px;padding:7px 15px}
  .cbadge.live{color:#c9bcff;background:rgba(124,77,255,.14);border:1px solid rgba(124,77,255,.4)}
  .cbadge.soon{color:#89f2b6;background:rgba(0,224,122,.13);border:1px solid rgba(0,224,122,.4)}
  .cmore{display:flex;align-items:center;justify-content:center;gap:9px;padding:12px;margin-top:2px;
    font-size:15px;font-weight:600;letter-spacing:1px;color:#6f6b86}
  .greenpulse{background:#00e07a !important;box-shadow:0 0 0 4px rgba(0,224,122,.18),0 0 12px rgba(0,224,122,.9) !important}
</style></head><body>
  <div class="stage">
    <div class="grid"></div>
    <div class="lock">${mark("em2", 44)}<span class="nm">Ocolos</span></div>
    <div class="h disp"><span class="gradG">Robinhood Chain</span><br>will be added.</div>
    <div class="sub">The eye is expanding beyond Solana — same smart-money tracking, one more chain.</div>
    <div class="foot">
      <span class="live"><span class="p"></span>EXPANDING</span>
      <span class="handle">@Ocolosxyz</span>
      <span class="site">ocolos.xyz</span>
    </div>
    <div class="panel lp">
      <div class="sheen"></div>
      <div class="phead">
        <div class="phTitle"><span class="pulse greenpulse"></span>NETWORKS</div>
        <div class="tag">ROADMAP</div>
      </div>
      <div class="rows">
        ${chainRow("#9945ff,#14f195", "◎", "Solana", "Smart-money tracking", "● LIVE", "live")}
        ${chainRow("#d4ff7a,#00c805", "R", "Robinhood Chain", "Integration in progress", "● SOON", "soon")}
        <div class="cmore">+ more chains on the radar</div>
      </div>
    </div>
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
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: "png" });
  await writeFile(j.out, buf);
  console.log(`✓ ${j.out} (${(buf.length / 1024).toFixed(0)} KB)`);
}
await browser.close();
