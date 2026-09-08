/* ============================================================
   "THE EXECUTION" — practitioner-proof demo panels
   ------------------------------------------------------------
   Silent, looping, pure-CSS "screen recordings" for each
   service page: navigating a live Google Ads structure,
   running a technical audit, wiring automated tracking, etc.
   Exposes window.renderExecution(key) for services.html.
   No audio, no video files — everything is animated markup,
   so it loads instantly and loops forever like a GIF.
   ============================================================ */
(function () {

  /* ── styles (injected once) ─────────────────────────────── */
  var CSS = `
.exec-section p em { color: var(--fg3); font-style: italic; }
.exec-window { background: #0d1524; border: 1px solid oklch(40% 0.06 195 / 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px oklch(20% 0.04 220 / 0.18); }
.exec-bar { display: flex; align-items: center; gap: 6px; padding: 11px 16px; background: #121f36; border-bottom: 1px solid #1c2b47; }
.exec-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.exec-tab { font-family: var(--mono); font-size: 10.5px; color: #5f7191; margin-left: 10px; letter-spacing: 0.02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.exec-rec { margin-left: auto; font-family: var(--mono); font-size: 9px; font-weight: 700; color: #ff5f56; letter-spacing: 0.12em; animation: execBlink 1.6s steps(2, start) infinite; flex-shrink: 0; }
@keyframes execBlink { 50% { opacity: 0.25; } }
.exec-caption { display: flex; align-items: center; gap: 8px; margin-top: 12px; font-family: var(--mono); font-size: 11px; color: var(--fg3); }
.exec-caption i { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); flex-shrink: 0; animation: execPing 2.2s infinite; }
@keyframes execPing { 0% { box-shadow: 0 0 0 0 oklch(55% 0.11 195 / 0.45); } 70%, 100% { box-shadow: 0 0 0 8px transparent; } }

/* ── ads console (account structure navigation) ── */
.exec-ads { display: grid; grid-template-columns: 1.05fr 0.95fr; min-height: 300px; }
.exec-tree { padding: 16px 12px; border-right: 1px solid #1c2b47; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.exec-ti { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; color: #7e90ab; padding: 8px 10px; border-radius: 8px; animation: execFocus 14s linear infinite; animation-delay: calc(var(--i) * 1.55s); min-width: 0; }
.exec-ti b { color: #d4e5f0; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.exec-ti[data-l="1"] { margin-left: 18px; }
.exec-ti[data-l="2"] { margin-left: 36px; }
@keyframes execFocus { 0%, 9% { background: oklch(60% 0.12 195 / 0.16); } 13%, 100% { background: transparent; } }
.exec-tag { margin-left: auto; font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 999px; flex-shrink: 0; font-family: var(--mono); }
.exec-tag.ok { color: #3ddc97; background: rgba(61, 220, 151, 0.12); }
.exec-tag.warn { color: #ffbd2e; background: rgba(255, 189, 46, 0.12); }
.exec-tag.bad { color: #ff5f56; background: rgba(255, 95, 86, 0.12); }
.exec-side { padding: 18px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.exec-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.exec-kpi { background: #121f36; border: 1px solid #1c2b47; border-radius: 12px; padding: 10px 12px; min-width: 0; }
.exec-kpi .vals { position: relative; height: 22px; font-family: var(--mono); font-weight: 800; font-size: 17px; color: #d4e5f0; }
.exec-kpi .vals span { position: absolute; left: 0; top: 0; opacity: 0; animation: execSwap 14s linear infinite; animation-delay: calc(var(--s) * 4.55s); white-space: nowrap; }
@keyframes execSwap { 0% { opacity: 0; transform: translateY(6px); } 3% { opacity: 1; transform: none; } 30% { opacity: 1; } 34%, 100% { opacity: 0; } }
.exec-kpi label { font-family: var(--mono); font-size: 8.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #5f7191; display: block; margin-top: 4px; }
.exec-spark { background: #121f36; border: 1px solid #1c2b47; border-radius: 12px; padding: 12px; }
.exec-spark svg { display: block; width: 100%; }
.exec-spark .l { fill: none; stroke: oklch(70% 0.13 195); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 340; stroke-dashoffset: 340; animation: execDraw 14s linear infinite; }
@keyframes execDraw { 0% { stroke-dashoffset: 340; } 30%, 100% { stroke-dashoffset: 0; } }
.exec-notes { position: relative; height: 18px; font-family: var(--mono); font-size: 11px; color: #8fa4c0; }
.exec-notes span { position: absolute; inset: 0; opacity: 0; animation: execSwap 14s linear infinite; animation-delay: calc(var(--s) * 4.55s); white-space: nowrap; overflow: hidden; }
.exec-notes span::after { content: '\\258C'; color: oklch(70% 0.13 195); animation: execBlink 1s steps(2, start) infinite; }

/* ── audit console (terminal + checks + gauge) ── */
.exec-audit { display: grid; grid-template-columns: 1.1fr 0.9fr; min-height: 300px; }
.exec-term { padding: 16px; border-right: 1px solid #1c2b47; font-family: var(--mono); font-size: 11px; line-height: 2; color: #8fa4c0; overflow: hidden; min-width: 0; }
.exec-line { opacity: 0; animation: execLine 14s linear infinite; animation-delay: calc(var(--i) * 1.35s); display: flex; gap: 8px; white-space: nowrap; overflow: hidden; }
@keyframes execLine { 0% { opacity: 0; transform: translateY(4px); } 2.5% { opacity: 1; transform: none; } 96% { opacity: 1; } 100% { opacity: 0; } }
.exec-line i { font-style: normal; flex-shrink: 0; }
.exec-line.p i { color: oklch(70% 0.13 195); }
.exec-line.ok i { color: #3ddc97; }
.exec-line.warn i { color: #ffbd2e; }
.exec-checkside { padding: 18px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.exec-gauge { display: flex; align-items: center; gap: 14px; background: #121f36; border: 1px solid #1c2b47; border-radius: 12px; padding: 12px 14px; }
.exec-gauge svg { flex-shrink: 0; }
.exec-gauge .gbg { fill: none; stroke: #1c2b47; stroke-width: 6; }
.exec-gauge .gfg { fill: none; stroke: oklch(70% 0.13 195); stroke-width: 6; stroke-linecap: round; stroke-dasharray: 163.36; stroke-dashoffset: var(--o); animation: execGauge 14s linear infinite backwards; animation-delay: 0.6s; }
@keyframes execGauge { 0% { stroke-dashoffset: 163.36; } 35%, 100% { stroke-dashoffset: var(--o); } }
.exec-gauge b { font-family: var(--mono); font-size: 22px; font-weight: 800; color: #d4e5f0; display: block; line-height: 1.1; }
.exec-gauge small { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: #5f7191; }
.exec-check { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11px; color: #aebfd6; padding: 8px 10px; background: #121f36; border: 1px solid #1c2b47; border-radius: 10px; }
.exec-check .st { position: relative; width: 78px; height: 15px; flex-shrink: 0; }
.exec-check .st span { position: absolute; right: 0; top: 0; font-size: 8.5px; font-weight: 700; letter-spacing: 0.06em; padding: 2px 7px; border-radius: 999px; }
.exec-check .pend { color: #8fa4c0; background: rgba(143, 164, 192, 0.12); animation: execHide 14s linear infinite; animation-delay: calc(var(--i) * 1.5s + 3.5s); }
@keyframes execHide { 0%, 2% { opacity: 1; } 6%, 94% { opacity: 0; } 100% { opacity: 1; } }
.exec-check .done { color: #3ddc97; background: rgba(61, 220, 151, 0.12); opacity: 0; animation: execShow 14s linear infinite; animation-delay: calc(var(--i) * 1.5s + 3.5s); }
@keyframes execShow { 0% { opacity: 0; transform: scale(0.88); } 4% { opacity: 1; transform: none; } 96% { opacity: 1; } 100% { opacity: 0; } }

/* ── flow console (pipeline + live event log) ── */
.exec-flowwrap { padding: 24px 18px 6px; }
.exec-flow { position: relative; display: flex; align-items: stretch; }
.exec-node { flex: 1; min-width: 0; background: #121f36; border: 1px solid oklch(55% 0.11 195 / 0.35); border-radius: 12px; padding: 11px 8px; text-align: center; opacity: 0; animation: execShow 12s linear infinite; animation-delay: calc(var(--i) * 0.9s); }
.exec-node b { display: block; font-family: var(--mono); font-size: 10.5px; color: #d4e5f0; font-weight: 700; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.exec-node small { display: block; font-family: var(--mono); font-size: 8.5px; color: #5f7191; line-height: 1.4; }
.exec-link { width: 22px; flex: none; align-self: center; height: 2px; background: repeating-linear-gradient(90deg, #2a3d5f 0 5px, transparent 5px 10px); transform: scaleX(0); transform-origin: left; animation: execGrow 12s linear infinite; animation-delay: calc(var(--i) * 0.9s + 0.45s); }
@keyframes execGrow { 0% { transform: scaleX(0); } 3% { transform: scaleX(1); } 96% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
.exec-pulse { position: absolute; top: 50%; left: 2%; width: 8px; height: 8px; margin-top: -4px; border-radius: 50%; background: oklch(72% 0.13 195); box-shadow: 0 0 12px oklch(72% 0.13 195); opacity: 0; animation: execTravel 12s linear infinite; pointer-events: none; }
@keyframes execTravel { 0%, 42% { left: 2%; opacity: 0; } 45% { opacity: 1; } 70% { left: 95%; opacity: 1; } 73%, 100% { left: 95%; opacity: 0; } }
.exec-log { margin: 16px 18px 18px; border-top: 1px solid #1c2b47; padding-top: 12px; display: flex; flex-direction: column; gap: 7px; }
.exec-logrow { display: flex; gap: 12px; font-family: var(--mono); font-size: 10.5px; color: #8fa4c0; opacity: 0; animation: execShow 12s linear infinite; animation-delay: calc(var(--i) * 1.1s + 5.4s); min-width: 0; }
.exec-logrow span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.exec-logrow time { color: oklch(70% 0.13 195); flex-shrink: 0; }

/* ── build console (terminal + lighthouse gauges) ── */
.exec-build { display: grid; grid-template-columns: 1.1fr 0.9fr; min-height: 280px; }
.exec-gauges { padding: 18px; display: flex; flex-direction: column; gap: 10px; justify-content: center; min-width: 0; }
.exec-ok { font-family: var(--mono); font-size: 10.5px; color: #3ddc97; display: flex; align-items: center; gap: 8px; padding: 4px 2px 0; }
.exec-ok i { width: 7px; height: 7px; border-radius: 50%; background: #3ddc97; animation: execPing 2.2s infinite; flex-shrink: 0; }

/* ── responsive ── */
@media (max-width: 760px) {
  .exec-ads, .exec-audit, .exec-build { grid-template-columns: 1fr; }
  .exec-tree, .exec-term { border-right: none; border-bottom: 1px solid #1c2b47; }
  .exec-flow { flex-direction: column; }
  .exec-link { width: 2px; height: 18px; align-self: center; transform-origin: top; background: repeating-linear-gradient(180deg, #2a3d5f 0 5px, transparent 5px 10px); animation-name: execGrowV; }
  @keyframes execGrowV { 0% { transform: scaleY(0); } 3% { transform: scaleY(1); } 96% { transform: scaleY(1); } 100% { transform: scaleY(0); } }
  .exec-pulse { display: none; }
  .exec-kpis { grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .exec-kpi .vals { font-size: 14px; }
}

/* ── reduced motion: show the finished state, no loops ── */
@media (prefers-reduced-motion: reduce) {
  .exec-section [class^="exec"], .exec-section [class*=" exec"],
  .exec-section .exec-gauge .gfg, .exec-section .exec-spark .l { animation: none !important; }
  .exec-line, .exec-node, .exec-logrow, .exec-check .done { opacity: 1 !important; transform: none !important; }
  .exec-link { transform: none !important; }
  .exec-spark .l { stroke-dashoffset: 0 !important; }
  .exec-kpi .vals span, .exec-notes span { opacity: 0; }
  .exec-kpi .vals span:last-child, .exec-notes span:last-child { opacity: 1 !important; position: static; }
  .exec-notes span::after { content: ''; }
  .exec-check .pend { opacity: 0 !important; }
}
`;

  var st = document.createElement('style');
  st.id = 'exec-styles';
  st.textContent = CSS;
  document.head.appendChild(st);

  /* ── demo data per service ──────────────────────────────── */
  var DEMOS = {
    sem: { type: 'ads', tab: 'ads.google.com — account restructure (live)',
      intro: "Below is a silent replay of me working through a real Google Ads account — tightening ad groups by intent, layering negative keywords, and moving bidding onto offline conversions.",
      tree: [
        ['Search — Brand Defense', 'ENABLED', 0, 'ok'],
        ['Search — Non-Brand · tCPA', 'ENABLED', 0, 'ok'],
        ['ad group · emergency intent', null, 1],
        ['ad group · commercial intent', null, 1],
        ['RSA · 12 assets · rated Good', null, 2],
        ['Performance Max · feed-only', 'SCALING', 0, 'warn'],
        ['Shared negatives · 214 terms', 'UPDATED', 1, 'ok'],
        ['Offline conversions · import', 'SYNCED', 0, 'ok']
      ],
      kpis: [ ['Cost / lead', ['$142', '$98', '$72']], ['Quality Score', ['5.1', '6.8', '8.3']], ['Leads / mo', ['41', '63', '83']] ],
      notes: ['Splitting broad ad groups by intent…', 'Layering 60 new negative keywords…', 'Switching to offline-conversion bidding…'],
      spark: 'down' },

    paid: { type: 'ads', tab: 'Meta Ads Manager — creative testing (live)',
      intro: "A silent replay of a live Meta session — killing losing creatives on statistical signal, scaling winners into CBO, and keeping signal clean through CAPI.",
      tree: [
        ['CBO — Prospecting · $1.2K/day', 'ACTIVE', 0, 'ok'],
        ['ad set · broad · Advantage+', null, 1],
        ['UGC hook #14 · 3.1% CTR', 'SCALE', 2, 'ok'],
        ['Static offer v2 · 0.8% CTR', 'KILL', 2, 'bad'],
        ['Founder story · 2.4% CTR', 'ITERATE', 2, 'warn'],
        ['Retargeting — 14d engaged', 'ACTIVE', 0, 'ok'],
        ['CAPI events · deduplicated', 'SYNCED', 1, 'ok']
      ],
      kpis: [ ['Blended ROAS', ['2.1\u00d7', '4.8\u00d7', '6.8\u00d7']], ['CPM', ['$18.40', '$14.20', '$11.90']], ['CTR', ['1.1%', '1.9%', '2.6%']] ],
      notes: ['Killing creatives below 1% CTR…', 'Duplicating winners into scaling CBO…', 'Consolidating audiences · exiting learning…'],
      spark: 'up' },

    seo: { type: 'audit', tab: 'terminal — technical site audit · 1,284 URLs',
      intro: "Me running a full technical audit on a client site — crawl, render checks, Core Web Vitals — and shipping the fixes on the spot.",
      lines: [
        ['p', '$', 'crawl https://client.com --render --mobile'],
        ['ok', '\u2713', '1,284 URLs fetched · 96 warnings'],
        ['p', '$', 'check core-web-vitals --field-data'],
        ['warn', '\u26a0', 'LCP 4.2s on /services — hero image unsized'],
        ['p', '$', 'fix images --webp --lazy --preload-hero'],
        ['ok', '\u2713', 'LCP 1.9s · CLS 0.02 · INP 140ms'],
        ['p', '$', 'generate schema --localbusiness --faq'],
        ['ok', '\u2713', 'deployed · sitemap re-submitted · done']
      ],
      checks: [ ['Indexation & canonicals', 'PASS'], ['Core Web Vitals', 'FIXED'], ['Duplicate titles', 'FIXED'], ['Orphan pages', 'PASS'], ['Structured data', 'ADDED'] ],
      gauge: [92, 'Site health'] },

    content: { type: 'audit', tab: 'terminal — topical map build (live)',
      intro: "Building a topical-authority map in real time — clustering keywords, wiring the internal-link graph, and briefing content with SERP data.",
      lines: [
        ['p', '$', 'cluster keywords --seed "b2b saas onboarding"'],
        ['ok', '\u2713', '412 keywords \u2192 9 clusters'],
        ['p', '$', 'map internal-links --cluster onboarding'],
        ['ok', '\u2713', '36 links added · 4 orphans rescued'],
        ['p', '$', 'brief generate --cluster 3 --serp-gap'],
        ['ok', '\u2713', 'brief: 2,100 words · 14 entities'],
        ['p', '$', 'publish + request-indexing --api'],
        ['ok', '\u2713', 'indexed in 41 minutes']
      ],
      checks: [ ['Topical map coverage', 'PASS'], ['Internal link graph', 'WIRED'], ['Content briefs', 'DATA-LED'], ['Cannibalization', 'CLEARED'], ['Index coverage', 'PASS'] ],
      gauge: [88, 'Cluster score'] },

    performance: { type: 'flow', tab: 'server-side GTM — tracking pipeline · live events',
      intro: "Setting up the automated tracking backbone every scaling account needs — watch a real event travel from click to CRM to the blended dashboard.",
      nodes: [ ['Website', 'pixel + dataLayer'], ['Server GTM', '1st-party endpoint'], ['GA4 + CAPI', 'deduplicated'], ['CRM', 'offline import'], ['Dashboard', 'blended ROAS'] ],
      log: [
        ['14:02:11', 'purchase · $184.00 · event_id #a91f — deduped \u2713'],
        ['14:02:38', 'lead · form_submit \u2192 CRM stage: MQL'],
        ['14:03:04', 'offline import · 12 closed deals \u2192 Google Ads'],
        ['14:03:29', 'blended ROAS recalculated · 4.8\u00d7 \u2192 5.1\u00d7']
      ] },

    automation: { type: 'flow', tab: 'Make — lead routing scenario · run history',
      intro: "A live automation build running: every lead captured, qualified, routed and answered in under two minutes — with zero manual touches.",
      nodes: [ ['Webhook', 'FB · Google · site'], ['AI qualify', 'intent + budget'], ['Route', 'round-robin'], ['SMS + email', '< 2 min reply'], ['CRM', 'pipeline update'] ],
      log: [
        ['09:14:02', 'lead #2841 captured · facebook · dedupe \u2713'],
        ['09:14:05', 'qualified: budget \u2713 · timeline \u2713 \u2192 score 86'],
        ['09:14:07', 'routed \u2192 rep: Sarah · territory: North'],
        ['09:14:41', 'SMS sent · reply received in 34s \u2713']
      ] },

    email: { type: 'flow', tab: 'Klaviyo — abandoned cart flow · live',
      intro: "Building a lifecycle flow that sells while you sleep — triggers, smart delays, an A/B split, and the attributed revenue ticking in.",
      nodes: [ ['Trigger', 'cart abandoned'], ['Wait 2h', 'exit if purchased'], ['Email 1', 'dynamic cart'], ['A/B split', 'subject test'], ['SMS nudge', 'if unopened 24h'] ],
      log: [
        ['18:20:14', 'flow email delivered · open rate 61% \u2713'],
        ['18:36:50', 'variant B wins · +22% CTR · auto-promoted'],
        ['19:02:31', 'purchase attributed · $86.40 · flow revenue'],
        ['19:15:07', 'list health: 0.02% spam · 44% engaged']
      ] },

    social: { type: 'flow', tab: 'content system — weekly batch · run',
      intro: "The organic system running live — one Sunday batching session becoming a week of platform-native content, posted on schedule and measured.",
      nodes: [ ['Pillars', '4 content lanes'], ['Hooks', 'library of 120+'], ['Batch', 'Sunday · 2h'], ['Schedule', '5\u00d7 / week'], ['Analyze', 'double down'] ],
      log: [
        ['MON 09:00', 'reel posted · hook #41 · reach 24,800'],
        ['TUE 09:00', 'carousel · 312 saves · 96 shares'],
        ['WED 09:12', 'reel · 46% watch-through · +820 follows'],
        ['SUN 20:00', 'weekly review: top hook \u2192 next batch']
      ] },

    scratch: { type: 'flow', tab: 'engagement timeline — zero \u2192 revenue',
      intro: "The whole engine end-to-end — strategy, build, funnel, launch, scale — exactly how an engagement actually runs week by week.",
      nodes: [ ['Plan', 'offer + ICP + GTM'], ['Build', 'site + landing'], ['Connect', 'CRM + automation'], ['Launch', 'ads + tracking QA'], ['Scale', 'budget + CRO'] ],
      log: [
        ['WK 1', 'offer locked · revenue model approved'],
        ['WK 3', 'site live · funnel wired · tracking QA \u2713'],
        ['WK 4', 'ads live · first leads inside 48h'],
        ['WK 8', 'CPL \u221238% · scaling budget 2\u00d7']
      ] },

    webdev: { type: 'build', tab: 'terminal — production build & deploy',
      intro: "Shipping a client build: typed code, clean routes, and Lighthouse numbers that hold up in production — not just on localhost.",
      lines: [
        ['p', '$', 'pnpm build'],
        ['ok', '\u2713', '42 routes · 0 type errors'],
        ['p', '$', 'next-sitemap && og-image gen'],
        ['ok', '\u2713', 'sitemap + social cards ready'],
        ['p', '$', 'lighthouse --prod https://client.com'],
        ['ok', '\u2713', '99 · 100 · 100 — deploy \u2192 edge']
      ],
      gauges: [ [99, 'Performance'], [100, 'Accessibility'], [100, 'SEO'] ] },

    wordpress: { type: 'build', tab: 'wp-admin — performance rescue (live)',
      intro: "A live WordPress rescue — auditing the plugin stack, stripping bloat, and rebuilding the critical rendering path.",
      lines: [
        ['p', '$', 'wp plugin audit --active'],
        ['warn', '\u26a0', '31 active · 9 unused · 3 overlapping'],
        ['p', '$', 'wp plugin delete \u00d79 · replace \u00d73'],
        ['p', '$', 'build critical-css --per-template'],
        ['ok', '\u2713', 'render-blocking cut 82%'],
        ['p', '$', 'cache warm --cloudflare --preload'],
        ['ok', '\u2713', 'TTFB 180ms · fully cached']
      ],
      gauges: [ [96, 'Performance'], [100, 'Best practices'], [100, 'SEO'] ] }
  };

  /* ── builders ───────────────────────────────────────────── */
  function shell(tab, inner) {
    return '<div class="exec-window">' +
      '<div class="exec-bar"><i class="exec-dot" style="background:#ff5f56"></i><i class="exec-dot" style="background:#ffbd2e"></i><i class="exec-dot" style="background:#27c93f"></i>' +
      '<span class="exec-tab">' + tab + '</span><em class="exec-rec">\u25cf REC</em></div>' +
      inner + '</div>';
  }

  function gaugeHtml(score, label) {
    var c = 163.36, o = (c * (1 - score / 100)).toFixed(1);
    return '<div class="exec-gauge"><svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">' +
      '<circle class="gbg" cx="32" cy="32" r="26"></circle>' +
      '<circle class="gfg" cx="32" cy="32" r="26" style="--o:' + o + '" transform="rotate(-90 32 32)"></circle></svg>' +
      '<div><b>' + score + '</b><small>' + label + '</small></div></div>';
  }

  function adsBody(d) {
    var tree = d.tree.map(function (r, i) {
      return '<div class="exec-ti" data-l="' + (r[2] || 0) + '" style="--i:' + i + '"><b>' + r[0] + '</b>' +
        (r[1] ? '<span class="exec-tag ' + (r[3] || 'ok') + '">' + r[1] + '</span>' : '') + '</div>';
    }).join('');
    var kpis = d.kpis.map(function (k) {
      var vals = k[1].map(function (v, s) { return '<span style="--s:' + s + '">' + v + '</span>'; }).join('');
      return '<div class="exec-kpi"><div class="vals">' + vals + '</div><label>' + k[0] + '</label></div>';
    }).join('');
    var path = d.spark === 'up'
      ? 'M6 52 C 40 48, 90 34, 140 22 S 180 12, 196 8'
      : 'M6 12 C 40 16, 90 30, 140 40 S 180 50, 196 52';
    var notes = d.notes.map(function (n, s) { return '<span style="--s:' + s + '">' + n + '</span>'; }).join('');
    return '<div class="exec-ads"><div class="exec-tree">' + tree + '</div>' +
      '<div class="exec-side"><div class="exec-kpis">' + kpis + '</div>' +
      '<div class="exec-spark"><svg viewBox="0 0 200 60" height="60" preserveAspectRatio="none" aria-hidden="true"><path class="l" d="' + path + '"></path></svg></div>' +
      '<div class="exec-notes">' + notes + '</div></div></div>';
  }

  function auditBody(d) {
    var lines = d.lines.map(function (l, i) {
      return '<div class="exec-line ' + l[0] + '" style="--i:' + i + '"><i>' + l[1] + '</i><span>' + l[2] + '</span></div>';
    }).join('');
    var checks = d.checks.map(function (c, i) {
      return '<div class="exec-check"><span>' + c[0] + '</span><span class="st" style="--i:' + i + '">' +
        '<span class="pend" style="--i:' + i + '">SCAN\u2026</span><span class="done" style="--i:' + i + '">\u2713 ' + c[1] + '</span></span></div>';
    }).join('');
    return '<div class="exec-audit"><div class="exec-term">' + lines + '</div>' +
      '<div class="exec-checkside">' + gaugeHtml(d.gauge[0], d.gauge[1]) + checks + '</div></div>';
  }

  function flowBody(d) {
    var parts = [];
    d.nodes.forEach(function (n, i) {
      if (i > 0) parts.push('<i class="exec-link" style="--i:' + (i - 1) + '"></i>');
      parts.push('<div class="exec-node" style="--i:' + i + '"><b>' + n[0] + '</b><small>' + n[1] + '</small></div>');
    });
    var log = d.log.map(function (l, i) {
      return '<div class="exec-logrow" style="--i:' + i + '"><time>' + l[0] + '</time><span>' + l[1] + '</span></div>';
    }).join('');
    return '<div class="exec-flowwrap"><div class="exec-flow">' + parts.join('') + '<i class="exec-pulse"></i></div></div>' +
      '<div class="exec-log">' + log + '</div>';
  }

  function buildBody(d) {
    var lines = d.lines.map(function (l, i) {
      return '<div class="exec-line ' + l[0] + '" style="--i:' + i + '"><i>' + l[1] + '</i><span>' + l[2] + '</span></div>';
    }).join('');
    var gauges = d.gauges.map(function (g) { return gaugeHtml(g[0], g[1]); }).join('');
    return '<div class="exec-build"><div class="exec-term">' + lines + '</div>' +
      '<div class="exec-gauges">' + gauges + '<div class="exec-ok"><i></i> compiled · 0 errors · production</div></div></div>';
  }

  var BUILDERS = { ads: adsBody, audit: auditBody, flow: flowBody, build: buildBody };

  /* ── public API ─────────────────────────────────────────── */
  window.renderExecution = function (key) {
    var d = DEMOS[key];
    if (!d) return '';
    return '<div class="svc-section exec-section">' +
      '<div class="svc-h2-lbl">The Execution</div>' +
      '<h2 class="svc-h2">Watch the work \u2014 not the pitch</h2>' +
      '<p>' + d.intro + ' <em>Silent replay \u00b7 anonymized client data.</em></p>' +
      shell(d.tab, BUILDERS[d.type](d)) +
      '<div class="exec-caption"><i></i> Live replay loops automatically \u2014 the actual day-to-day work, not a mockup.</div>' +
      '</div>';
  };
})();
