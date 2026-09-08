/* ============================================================
   SHARED BLOG THUMBNAILS for wajeeh.dev
   ------------------------------------------------------------
   SVG data-URI thumbnails (extracted from blog.html) exposed as
   window.WJH_THUMBS so the homepage teaser (and any other page)
   can render the same artwork. forPost(p) resolves a thumbnail:
   explicit p.img → seed-post id → category fallback.
   ============================================================ */
(function () {
const THUMB_SEO = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#0d3b36"/>
  <rect width="400" height="220" fill="url(#g1)"/>
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a4f47"/>
      <stop offset="100%" stop-color="#061f1c"/>
    </linearGradient>
  </defs>
  <!-- Grid lines -->
  <line x1="0" y1="55" x2="400" y2="55" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="0" y1="110" x2="400" y2="110" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="0" y1="165" x2="400" y2="165" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="100" y1="0" x2="100" y2="220" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="200" y1="0" x2="200" y2="220" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="300" y1="0" x2="300" y2="220" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
  <!-- Bar chart -->
  <rect x="40" y="140" width="36" height="50" rx="4" fill="#1a9e8f" opacity="0.5"/>
  <rect x="90" y="110" width="36" height="80" rx="4" fill="#1a9e8f" opacity="0.65"/>
  <rect x="140" y="80" width="36" height="110" rx="4" fill="#1a9e8f" opacity="0.8"/>
  <rect x="190" y="50" width="36" height="140" rx="4" fill="#1a9e8f"/>
  <rect x="240" y="70" width="36" height="120" rx="4" fill="#1a9e8f" opacity="0.85"/>
  <!-- Arrow up -->
  <polyline points="50,160 120,100 200,60 290,40" fill="none" stroke="#4ecdc4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="290" cy="40" r="5" fill="#4ecdc4"/>
  <!-- Label -->
  <rect x="28" y="12" width="80" height="22" rx="4" fill="#1a9e8f" opacity="0.3"/>
  <text x="40" y="27" font-family="monospace" font-size="10" fill="#4ecdc4" font-weight="bold">SEO GROWTH</text>
  <!-- Google icon hint -->
  <text x="310" y="195" font-family="monospace" font-size="28" fill="#ffffff" opacity="0.08" font-weight="bold">G</text>
</svg>`)}`;

const THUMB_DM = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#1a1a2e"/>
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a3e"/>
      <stop offset="100%" stop-color="#0f0f1a"/>
    </linearGradient>
  </defs>
  <rect width="400" height="220" fill="url(#g2)"/>
  <!-- Organic side -->
  <rect x="20" y="30" width="170" height="160" rx="10" fill="#1a9e8f" opacity="0.12"/>
  <text x="105" y="60" font-family="monospace" font-size="10" fill="#1a9e8f" text-anchor="middle" font-weight="bold">ORGANIC</text>
  <path d="M 40 170 Q 60 80 105 70 Q 150 60 165 170 Z" fill="#1a9e8f" opacity="0.25"/>
  <path d="M 40 170 Q 60 80 105 70 Q 150 60 165 170 Z" fill="none" stroke="#1a9e8f" stroke-width="1.5"/>
  <!-- Paid side -->
  <rect x="210" y="30" width="170" height="160" rx="10" fill="#c97a2a" opacity="0.12"/>
  <text x="295" y="60" font-family="monospace" font-size="10" fill="#c97a2a" text-anchor="middle" font-weight="bold">PAID</text>
  <rect x="230" y="90" width="30" height="80" rx="3" fill="#c97a2a" opacity="0.7"/>
  <rect x="268" y="70" width="30" height="100" rx="3" fill="#c97a2a" opacity="0.85"/>
  <rect x="306" y="110" width="30" height="60" rx="3" fill="#c97a2a" opacity="0.6"/>
  <!-- VS divider -->
  <line x1="200" y1="20" x2="200" y2="200" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" stroke-dasharray="4,4"/>
  <circle cx="200" cy="110" r="16" fill="#1a1a2e" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"/>
  <text x="200" y="115" font-family="monospace" font-size="10" fill="#ffffff" opacity="0.5" text-anchor="middle" font-weight="bold">VS</text>
</svg>`)}`;

const THUMB_AI = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#0d0d1a"/>
  <defs>
    <radialGradient id="g3" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1a9e8f" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0d0d1a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="220" fill="url(#g3)"/>
  <!-- Network nodes -->
  <circle cx="200" cy="110" r="22" fill="#1a9e8f" opacity="0.9"/>
  <text x="200" y="115" font-family="monospace" font-size="9" fill="white" text-anchor="middle" font-weight="bold">AI</text>
  <!-- Satellite nodes -->
  <circle cx="90" cy="60" r="12" fill="#1a9e8f" opacity="0.5"/>
  <text x="90" y="64" font-family="monospace" font-size="7" fill="white" text-anchor="middle">GPT</text>
  <circle cx="310" cy="60" r="12" fill="#1a9e8f" opacity="0.5"/>
  <text x="310" y="64" font-family="monospace" font-size="7" fill="white" text-anchor="middle">GEM</text>
  <circle cx="70" cy="160" r="12" fill="#c97a2a" opacity="0.6"/>
  <text x="70" y="164" font-family="monospace" font-size="7" fill="white" text-anchor="middle">PPX</text>
  <circle cx="330" cy="160" r="12" fill="#c97a2a" opacity="0.6"/>
  <text x="330" y="164" font-family="monospace" font-size="7" fill="white" text-anchor="middle">BING</text>
  <circle cx="200" cy="185" r="10" fill="#1a9e8f" opacity="0.4"/>
  <text x="200" y="189" font-family="monospace" font-size="7" fill="white" text-anchor="middle">YOU</text>
  <!-- Connection lines -->
  <line x1="200" y1="110" x2="90" y2="60" stroke="#1a9e8f" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="200" y1="110" x2="310" y2="60" stroke="#1a9e8f" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="200" y1="110" x2="70" y2="160" stroke="#c97a2a" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="200" y1="110" x2="330" y2="160" stroke="#c97a2a" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="200" y1="110" x2="200" y2="185" stroke="#1a9e8f" stroke-width="1" stroke-opacity="0.4"/>
  <!-- Label -->
  <rect x="130" y="12" width="140" height="22" rx="4" fill="#1a9e8f" opacity="0.2"/>
  <text x="200" y="27" font-family="monospace" font-size="9" fill="#4ecdc4" text-anchor="middle" font-weight="bold">SEARCH EVERYWHERE</text>
</svg>`)}`;

const THUMB_NEARME = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="nmBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e3eef0"/><stop offset="100%" stop-color="#cdd9dc"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#nmBg)"/>
  <!-- Map roads -->
  <g stroke="#b0c2c6" stroke-width="6" fill="none" stroke-linecap="round">
    <path d="M 0 60 L 400 80"/>
    <path d="M 0 160 L 400 140"/>
    <path d="M 80 0 L 110 220"/>
    <path d="M 280 0 L 310 220"/>
  </g>
  <g stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M 0 60 L 400 80"/>
    <path d="M 0 160 L 400 140"/>
    <path d="M 80 0 L 110 220"/>
    <path d="M 280 0 L 310 220"/>
  </g>
  <!-- Park / district shapes -->
  <rect x="130" y="92" width="120" height="58" rx="6" fill="#c5deb8" opacity="0.7"/>
  <text x="190" y="124" font-family="Arial, sans-serif" font-size="8" fill="#6a8c5a" text-anchor="middle" font-weight="600">Central District</text>
  <rect x="30" y="92" width="80" height="58" rx="4" fill="#d8e8ea" opacity="0.6"/>
  <rect x="310" y="92" width="60" height="58" rx="4" fill="#d8e8ea" opacity="0.6"/>
  <!-- Secondary pins -->
  <g>
    <circle cx="70" cy="56" r="6" fill="#1a73e8" stroke="#fff" stroke-width="1.5"/>
    <circle cx="340" cy="62" r="6" fill="#1a73e8" stroke="#fff" stroke-width="1.5"/>
    <circle cx="92" cy="178" r="6" fill="#1a73e8" stroke="#fff" stroke-width="1.5"/>
    <circle cx="312" cy="174" r="6" fill="#1a73e8" stroke="#fff" stroke-width="1.5"/>
  </g>
  <!-- Big "You are here" pin in center -->
  <ellipse cx="200" cy="148" rx="22" ry="5" fill="#000" opacity="0.18"/>
  <path d="M 200 60 C 218 60 230 75 230 92 C 230 112 200 145 200 145 C 200 145 170 112 170 92 C 170 75 182 60 200 60 Z" fill="#ea4335" stroke="#fff" stroke-width="2.5"/>
  <circle cx="200" cy="90" r="9" fill="#fff"/>
  <circle cx="200" cy="90" r="4" fill="#ea4335"/>
  <!-- Label -->
  <rect x="142" y="14" width="116" height="22" rx="11" fill="#fff" stroke="#dadce0"/>
  <text x="200" y="29" font-family="Arial, sans-serif" font-size="10" fill="#202124" text-anchor="middle" font-weight="700">★ "near me"</text>
  <!-- Bottom search bar -->
  <rect x="14" y="190" width="372" height="22" rx="11" fill="#fff" stroke="#dadce0"/>
  <circle cx="28" cy="201" r="5" fill="none" stroke="#5f6368" stroke-width="1.3"/>
  <line x1="32" y1="205" x2="36" y2="209" stroke="#5f6368" stroke-width="1.3"/>
  <text x="44" y="205" font-family="Arial, sans-serif" font-size="9" fill="#5f6368">best coffee near me</text>
</svg>`)}`;

const THUMB_PERFKPI = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="pkBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c1320"/><stop offset="100%" stop-color="#1a2235"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#pkBg)"/>
  <rect x="14" y="14" width="110" height="20" rx="10" fill="#1a9e8f" opacity="0.18"/>
  <text x="24" y="28" font-family="monospace" font-size="9" fill="#4fdfb5" font-weight="700" letter-spacing="1.5">PERFORMANCE KPI</text>
  <!-- 4 metric cards -->
  <g>
    <rect x="14" y="44" width="88" height="46" rx="6" fill="#1a2235" stroke="#2c3a55"/>
    <text x="22" y="58" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="0.5">CAC</text>
    <text x="22" y="76" font-family="monospace" font-size="14" font-weight="700" fill="#fff">$38.20</text>
    <text x="22" y="85" font-family="monospace" font-size="6" fill="#4fdfb5">▼ 24%</text>
    <rect x="108" y="44" width="88" height="46" rx="6" fill="#1a2235" stroke="#2c3a55"/>
    <text x="116" y="58" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="0.5">LTV : CAC</text>
    <text x="116" y="76" font-family="monospace" font-size="14" font-weight="700" fill="#fff">4.8 : 1</text>
    <text x="116" y="85" font-family="monospace" font-size="6" fill="#4fdfb5">▲ healthy</text>
    <rect x="202" y="44" width="88" height="46" rx="6" fill="#1a2235" stroke="#2c3a55"/>
    <text x="210" y="58" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="0.5">MER</text>
    <text x="210" y="76" font-family="monospace" font-size="14" font-weight="700" fill="#4fdfb5">3.42×</text>
    <text x="210" y="85" font-family="monospace" font-size="6" fill="#4fdfb5">▲ 0.42</text>
    <rect x="296" y="44" width="90" height="46" rx="6" fill="#1a2235" stroke="#2c3a55"/>
    <text x="304" y="58" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="0.5">PAYBACK · DAYS</text>
    <text x="304" y="76" font-family="monospace" font-size="14" font-weight="700" fill="#fff">38d</text>
    <text x="304" y="85" font-family="monospace" font-size="6" fill="#4fdfb5">▼ 12d</text>
  </g>
  <!-- Funnel -->
  <g transform="translate(14,100)">
    <rect x="0" y="0" width="372" height="108" rx="6" fill="#141b29" stroke="#2c3a55"/>
    <text x="12" y="16" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="1">FUNNEL · 30D</text>
    <!-- bars descending -->
    <rect x="12" y="26" width="348" height="14" rx="2" fill="#4fdfb5" opacity="0.85"/>
    <text x="20" y="36" font-family="monospace" font-size="7.5" font-weight="700" fill="#0a0a0f">IMPR · 2.4M</text>
    <rect x="12" y="44" width="240" height="14" rx="2" fill="#4fdfb5" opacity="0.65"/>
    <text x="20" y="54" font-family="monospace" font-size="7.5" font-weight="700" fill="#0a0a0f">CLICKS · 184K</text>
    <rect x="12" y="62" width="150" height="14" rx="2" fill="#4fdfb5" opacity="0.5"/>
    <text x="20" y="72" font-family="monospace" font-size="7.5" font-weight="700" fill="#0a0a0f">LEADS · 12.4K</text>
    <rect x="12" y="80" width="68" height="14" rx="2" fill="#f5b942" opacity="0.85"/>
    <text x="20" y="90" font-family="monospace" font-size="7.5" font-weight="700" fill="#1a1a2e">CUSTOMERS · 1,840</text>
  </g>
</svg>`)}`;

const THUMB_GBP = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#f8f9fa"/>
  <!-- Google logo small -->
  <text x="18" y="28" font-family="Arial, sans-serif" font-size="13" font-weight="700">
    <tspan fill="#4285f4">G</tspan><tspan fill="#ea4335">o</tspan><tspan fill="#fbbc04">o</tspan><tspan fill="#4285f4">g</tspan><tspan fill="#34a853">l</tspan><tspan fill="#ea4335">e</tspan>
  </text>
  <text x="60" y="28" font-family="Arial, sans-serif" font-size="9" fill="#5f6368">Business Profile</text>
  <!-- Big card -->
  <rect x="14" y="40" width="372" height="170" rx="8" fill="#fff" stroke="#dadce0"/>
  <!-- Cover image area -->
  <rect x="14" y="40" width="372" height="60" rx="8" fill="#1a9e8f" opacity="0.18"/>
  <g fill="#1a9e8f" opacity="0.35">
    <circle cx="60" cy="68" r="14"/>
    <rect x="84" y="56" width="38" height="6" rx="3"/>
    <rect x="84" y="68" width="28" height="4" rx="2"/>
    <rect x="84" y="78" width="44" height="4" rx="2"/>
  </g>
  <text x="370" y="60" font-family="Arial, sans-serif" font-size="8" fill="#1a9e8f" text-anchor="end" font-weight="700">▲ VERIFIED</text>
  <!-- Business name -->
  <text x="26" y="124" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#202124">Smith &amp; Co. Roofing — Bay Area</text>
  <!-- Rating row -->
  <text x="26" y="142" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#fbbc04">★★★★★ 4.9</text>
  <text x="84" y="142" font-family="Arial, sans-serif" font-size="9" fill="#5f6368">(312 reviews) · Roofing contractor</text>
  <!-- Hours / Open -->
  <text x="26" y="158" font-family="Arial, sans-serif" font-size="9" fill="#137333" font-weight="600">Open · Closes 6 PM</text>
  <text x="115" y="158" font-family="Arial, sans-serif" font-size="9" fill="#5f6368">· (415) 555-0184 · smithroofing.com</text>
  <!-- Action buttons -->
  <g>
    <rect x="26" y="172" width="66" height="26" rx="13" fill="#1a73e8"/>
    <text x="59" y="188" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#fff" text-anchor="middle">Directions</text>
    <rect x="100" y="172" width="58" height="26" rx="13" fill="#fff" stroke="#1a73e8"/>
    <text x="129" y="188" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#1a73e8" text-anchor="middle">Call</text>
    <rect x="166" y="172" width="74" height="26" rx="13" fill="#fff" stroke="#1a73e8"/>
    <text x="203" y="188" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#1a73e8" text-anchor="middle">Website</text>
    <rect x="248" y="172" width="86" height="26" rx="13" fill="#fff" stroke="#1a73e8"/>
    <text x="291" y="188" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#1a73e8" text-anchor="middle">Save listing</text>
  </g>
  <!-- Audit checkmarks top right -->
  <g transform="translate(290,116)">
    <text x="0" y="0" font-family="monospace" font-size="7" fill="#5f6368" letter-spacing="0.5">9-POINT AUDIT</text>
    <circle cx="4" cy="10" r="3" fill="#34a853"/>
    <text x="12" y="12.5" font-family="monospace" font-size="7" fill="#202124">Categories</text>
    <circle cx="4" cy="22" r="3" fill="#34a853"/>
    <text x="12" y="24.5" font-family="monospace" font-size="7" fill="#202124">Service Areas</text>
    <circle cx="4" cy="34" r="3" fill="#34a853"/>
    <text x="12" y="36.5" font-family="monospace" font-size="7" fill="#202124">Posts &amp; Photos</text>
  </g>
</svg>`)}`;

const THUMB_VBB = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="vbBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2235"/><stop offset="100%" stop-color="#0a1020"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#vbBg)"/>
  <rect x="14" y="14" width="160" height="20" rx="10" fill="#f5b942" opacity="0.2"/>
  <text x="24" y="28" font-family="monospace" font-size="9" fill="#f5b942" font-weight="700" letter-spacing="1.5">VALUE-BASED BIDDING</text>
  <!-- Two columns: CPA vs Value -->
  <text x="100" y="56" font-family="monospace" font-size="8" fill="#7c8aa0" text-anchor="middle" letter-spacing="0.5">CPA TARGET</text>
  <text x="300" y="56" font-family="monospace" font-size="8" fill="#f5b942" text-anchor="middle" letter-spacing="0.5" font-weight="700">VALUE TARGET</text>
  <!-- Left chart - flat -->
  <g transform="translate(14,64)">
    <rect width="172" height="120" rx="6" fill="#141b29" stroke="#2c3a55"/>
    <line x1="0" y1="100" x2="172" y2="100" stroke="#2c3a55" stroke-width="0.5"/>
    <polyline points="10,80 30,82 50,78 70,84 90,80 110,82 130,78 150,84 162,80" fill="none" stroke="#7c8aa0" stroke-width="2"/>
    <text x="86" y="55" font-family="monospace" font-size="18" font-weight="700" fill="#7c8aa0" text-anchor="middle">2.4×</text>
    <text x="86" y="68" font-family="monospace" font-size="7" fill="#7c8aa0" text-anchor="middle">FLAT ROAS</text>
    <text x="86" y="114" font-family="monospace" font-size="6" fill="#7c8aa0" text-anchor="middle">all leads weighted equally</text>
  </g>
  <!-- Right chart - climbing -->
  <g transform="translate(214,64)">
    <rect width="172" height="120" rx="6" fill="#141b29" stroke="#2c3a55"/>
    <line x1="0" y1="100" x2="172" y2="100" stroke="#2c3a55" stroke-width="0.5"/>
    <path d="M 10 95 L 30 88 L 50 82 L 70 70 L 90 62 L 110 50 L 130 38 L 150 28 L 162 22 L 162 100 L 10 100 Z" fill="#f5b942" opacity="0.2"/>
    <polyline points="10,95 30,88 50,82 70,70 90,62 110,50 130,38 150,28 162,22" fill="none" stroke="#f5b942" stroke-width="2.5"/>
    <circle cx="162" cy="22" r="3.5" fill="#f5b942"/>
    <text x="86" y="55" font-family="monospace" font-size="18" font-weight="700" fill="#f5b942" text-anchor="middle">6.1×</text>
    <text x="86" y="68" font-family="monospace" font-size="7" fill="#f5b942" text-anchor="middle">CLIMBING ROAS</text>
  </g>
  <!-- Bottom dollar tags -->
  <g transform="translate(14,194)" font-family="monospace" font-size="8" fill="#4fdfb5" font-weight="700">
    <text x="0" y="0">$80 lead</text>
    <text x="58" y="0">$240 lead</text>
    <text x="124" y="0">$1.2K lead</text>
    <text x="208" y="0">$4.8K lead</text>
    <text x="290" y="0">$12K lead</text>
  </g>
</svg>`)}`;

const THUMB_GA4 = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#f8f9fa"/>
  <!-- Top bar -->
  <rect x="0" y="0" width="400" height="24" fill="#fff" stroke="#dadce0" stroke-width="0.5"/>
  <circle cx="16" cy="12" r="6" fill="#f9ab00"/>
  <text x="16" y="15.5" font-family="Arial" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">A</text>
  <text x="28" y="16" font-family="Arial, sans-serif" font-size="10" font-weight="500" fill="#202124">Google Analytics 4</text>
  <text x="380" y="16" font-family="Arial, sans-serif" font-size="7" fill="#5f6368" text-anchor="end">Last 30 days ▾</text>
  <!-- 3 metric tiles -->
  <rect x="14" y="36" width="118" height="50" rx="6" fill="#fff" stroke="#dadce0"/>
  <text x="22" y="50" font-family="Arial, sans-serif" font-size="7" fill="#5f6368" letter-spacing="0.5">USERS</text>
  <text x="22" y="70" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#202124">142,308</text>
  <text x="22" y="82" font-family="Arial, sans-serif" font-size="7" fill="#137333">▲ 24.2% vs last period</text>
  <rect x="138" y="36" width="118" height="50" rx="6" fill="#fff" stroke="#dadce0"/>
  <text x="146" y="50" font-family="Arial, sans-serif" font-size="7" fill="#5f6368" letter-spacing="0.5">ENGAGED SESSIONS</text>
  <text x="146" y="70" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#202124">98,420</text>
  <text x="146" y="82" font-family="Arial, sans-serif" font-size="7" fill="#137333">▲ 18.6%</text>
  <rect x="262" y="36" width="124" height="50" rx="6" fill="#fff" stroke="#dadce0"/>
  <text x="270" y="50" font-family="Arial, sans-serif" font-size="7" fill="#5f6368" letter-spacing="0.5">KEY EVENTS</text>
  <text x="270" y="70" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#137333">3,842</text>
  <text x="270" y="82" font-family="Arial, sans-serif" font-size="7" fill="#137333">▲ 41.0%</text>
  <!-- Chart area -->
  <rect x="14" y="94" width="372" height="114" rx="6" fill="#fff" stroke="#dadce0"/>
  <text x="22" y="110" font-family="Arial, sans-serif" font-size="9" font-weight="600" fill="#202124">Users by traffic source</text>
  <!-- Gridlines -->
  <g stroke="#e8eaed" stroke-width="0.5">
    <line x1="22" y1="130" x2="378" y2="130"/>
    <line x1="22" y1="150" x2="378" y2="150"/>
    <line x1="22" y1="170" x2="378" y2="170"/>
    <line x1="22" y1="190" x2="378" y2="190"/>
  </g>
  <!-- Lines -->
  <polyline points="22,184 60,176 100,168 140,150 180,148 220,138 260,126 300,120 340,116 378,108" fill="none" stroke="#1a73e8" stroke-width="2"/>
  <polyline points="22,190 60,188 100,184 140,180 180,176 220,170 260,168 300,162 340,158 378,154" fill="none" stroke="#34a853" stroke-width="2"/>
  <polyline points="22,194 60,192 100,190 140,186 180,184 220,182 260,180 300,178 340,174 378,172" fill="none" stroke="#ea4335" stroke-width="2"/>
  <!-- Legend -->
  <g font-family="Arial, sans-serif" font-size="7" fill="#5f6368">
    <circle cx="270" cy="110" r="3" fill="#1a73e8"/>
    <text x="277" y="113">Organic Search</text>
    <circle cx="328" cy="110" r="3" fill="#34a853"/>
    <text x="335" y="113">Direct</text>
    <circle cx="362" cy="110" r="3" fill="#ea4335"/>
    <text x="369" y="113">Paid</text>
  </g>
</svg>`)}`;

const THUMB_AIOVERVIEW = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#f8f9fa"/>
  <defs><linearGradient id="aiSpark" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4285f4"/><stop offset="50%" stop-color="#9b72f2"/><stop offset="100%" stop-color="#d96570"/></linearGradient></defs>
  <!-- search box -->
  <rect x="14" y="14" width="372" height="24" rx="12" fill="#fff" stroke="#dadce0"/>
  <circle cx="30" cy="26" r="5" fill="none" stroke="#5f6368" stroke-width="1.3"/>
  <line x1="34" y1="30" x2="38" y2="34" stroke="#5f6368" stroke-width="1.3"/>
  <text x="46" y="29.5" font-family="Arial, sans-serif" font-size="9" fill="#202124">best crm for early-stage startups</text>
  <!-- AI Overview card -->
  <rect x="14" y="48" width="372" height="158" rx="10" fill="#fff" stroke="#e3e8ee"/>
  <rect x="14" y="48" width="372" height="3" rx="1.5" fill="url(#aiSpark)"/>
  <path d="M 30 70 l 2.4 5.6 l 5.6 2.4 l -5.6 2.4 l -2.4 5.6 l -2.4 -5.6 l -5.6 -2.4 l 5.6 -2.4 Z" fill="url(#aiSpark)"/>
  <text x="46" y="78" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#1f1f1f">AI Overview</text>
  <text x="378" y="78" font-family="Arial, sans-serif" font-size="7.5" fill="#5f6368" text-anchor="end">Generated for you</text>
  <g fill="#3c4043">
    <rect x="30" y="92" width="342" height="6" rx="3" opacity="0.5"/>
    <rect x="30" y="104" width="356" height="6" rx="3" opacity="0.5"/>
    <rect x="30" y="116" width="300" height="6" rx="3" opacity="0.5"/>
  </g>
  <!-- highlighted brand mention -->
  <rect x="30" y="128" width="120" height="6" rx="3" fill="#1a9e8f" opacity="0.85"/>
  <rect x="156" y="128" width="200" height="6" rx="3" fill="#3c4043" opacity="0.5"/>
  <!-- citation chips -->
  <text x="30" y="158" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#5f6368" letter-spacing="0.5">SOURCES</text>
  <g font-family="Arial, sans-serif" font-size="8" font-weight="600">
    <rect x="30" y="166" width="74" height="22" rx="6" fill="#e8f0fe"/>
    <circle cx="42" cy="177" r="5" fill="#1a9e8f"/>
    <text x="52" y="180" fill="#1a73e8">yoursite ↗</text>
    <rect x="112" y="166" width="64" height="22" rx="6" fill="#f1f3f4"/>
    <circle cx="124" cy="177" r="5" fill="#c97a2a"/>
    <text x="134" y="180" fill="#3c4043">g2.com</text>
    <rect x="184" y="166" width="74" height="22" rx="6" fill="#f1f3f4"/>
    <circle cx="196" cy="177" r="5" fill="#ea4335"/>
    <text x="206" y="180" fill="#3c4043">reddit</text>
  </g>
  <rect x="276" y="58" width="100" height="20" rx="10" fill="#1a9e8f" opacity="0.14"/>
  <text x="326" y="71.5" font-family="Arial, sans-serif" font-size="8.5" font-weight="700" fill="#137a6e" text-anchor="middle">GEO · AI SEARCH</text>
</svg>`)}`;

const THUMB_ADVPLUS = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="apBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c2533"/><stop offset="100%" stop-color="#0c1320"/></linearGradient>
  <linearGradient id="apMeta" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0064e0"/><stop offset="100%" stop-color="#9b72f2"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#apBg)"/>
  <rect x="14" y="14" width="372" height="30" rx="8" fill="#141b29" stroke="#2c3a55"/>
  <path d="M 28 29 C 28 26 31 24 33 26 C 35 28 36 30 38 30 C 40 30 41 28 43 26 C 45 24 48 26 48 29 C 48 32 45 34 43 32 C 41 30 40 28 38 28 C 36 28 35 30 33 32 C 31 34 28 32 28 29 Z" fill="url(#apMeta)"/>
  <text x="56" y="33" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#fff">Advantage+ Shopping</text>
  <rect x="320" y="22" width="56" height="15" rx="7.5" fill="#1a9e8f" opacity="0.18"/>
  <text x="348" y="32.5" font-family="monospace" font-size="7.5" font-weight="700" fill="#4fdfb5" text-anchor="middle">AUTO</text>
  <!-- automation toggles -->
  <g font-family="Helvetica, sans-serif" font-size="8.5" fill="#c4cde0">
    <text x="22" y="64">Audience</text><text x="22" y="84">Placements</text><text x="22" y="104">Budget split</text><text x="22" y="124">Creative mix</text>
  </g>
  <g>
    <rect x="120" y="56" width="30" height="12" rx="6" fill="#1a9e8f"/><circle cx="144" cy="62" r="5" fill="#fff"/>
    <rect x="120" y="76" width="30" height="12" rx="6" fill="#1a9e8f"/><circle cx="144" cy="82" r="5" fill="#fff"/>
    <rect x="120" y="96" width="30" height="12" rx="6" fill="#1a9e8f"/><circle cx="144" cy="102" r="5" fill="#fff"/>
    <rect x="120" y="116" width="30" height="12" rx="6" fill="#1a9e8f"/><circle cx="144" cy="122" r="5" fill="#fff"/>
  </g>
  <g font-family="monospace" font-size="7" fill="#7c8aa0"><text x="160" y="65">Meta runs it</text><text x="160" y="85">Meta runs it</text><text x="160" y="105">Meta runs it</text><text x="160" y="125">You feed it</text></g>
  <!-- result panel -->
  <rect x="244" y="52" width="142" height="78" rx="8" fill="#141b29" stroke="#2c3a55"/>
  <text x="256" y="68" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="0.5">BLENDED ROAS</text>
  <text x="256" y="92" font-family="monospace" font-size="22" font-weight="700" fill="#4fdfb5">5.9×</text>
  <text x="316" y="92" font-family="monospace" font-size="8.5" font-weight="700" fill="#4fdfb5">▲ 0.7</text>
  <text x="256" y="112" font-family="monospace" font-size="7" fill="#7c8aa0">Creative = the only lever</text>
  <!-- creative strip -->
  <text x="22" y="150" font-family="monospace" font-size="7.5" fill="#7c8aa0" letter-spacing="0.5">CREATIVE PIPELINE · 48/WK</text>
  <g>
    <rect x="22" y="158" width="42" height="48" rx="5" fill="#243049"/><rect x="28" y="164" width="30" height="22" rx="3" fill="#9b72f2" opacity="0.55"/><rect x="28" y="190" width="22" height="4" rx="2" fill="#4a5878"/><rect x="28" y="198" width="16" height="4" rx="2" fill="#3a4664"/>
    <rect x="72" y="158" width="42" height="48" rx="5" fill="#243049"/><rect x="78" y="164" width="30" height="22" rx="3" fill="#0064e0" opacity="0.55"/><rect x="78" y="190" width="22" height="4" rx="2" fill="#4a5878"/><rect x="78" y="198" width="16" height="4" rx="2" fill="#3a4664"/>
    <rect x="122" y="158" width="42" height="48" rx="5" fill="#243049"/><rect x="128" y="164" width="30" height="22" rx="3" fill="#1a9e8f" opacity="0.55"/><rect x="128" y="190" width="22" height="4" rx="2" fill="#4a5878"/><rect x="128" y="198" width="16" height="4" rx="2" fill="#3a4664"/>
    <rect x="172" y="158" width="42" height="48" rx="5" fill="#243049"/><rect x="178" y="164" width="30" height="22" rx="3" fill="#f5b942" opacity="0.55"/><rect x="178" y="190" width="22" height="4" rx="2" fill="#4a5878"/><rect x="178" y="198" width="16" height="4" rx="2" fill="#3a4664"/>
    <rect x="222" y="158" width="42" height="48" rx="5" fill="#243049"/><rect x="228" y="164" width="30" height="22" rx="3" fill="#9b72f2" opacity="0.4"/><rect x="228" y="190" width="22" height="4" rx="2" fill="#4a5878"/><rect x="228" y="198" width="16" height="4" rx="2" fill="#3a4664"/>
    <rect x="272" y="158" width="114" height="48" rx="5" fill="#1a9e8f" opacity="0.12"/>
    <text x="329" y="180" font-family="monospace" font-size="9" font-weight="700" fill="#4fdfb5" text-anchor="middle">WINNER</text>
    <text x="329" y="194" font-family="monospace" font-size="7" fill="#7c8aa0" text-anchor="middle">scaled 3×</text>
  </g>
</svg>`)}`;

const THUMB_AIMAX = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#f8f9fa"/>
  <rect x="0" y="0" width="400" height="28" fill="#fff" stroke="#dadce0" stroke-width="0.5"/>
  <g transform="translate(14,8)">
    <polygon points="0,12 7,0 14,12" fill="#fbbc04"/><polygon points="3,12 10,0 17,12 10,12" fill="#34a853"/><polygon points="6,12 13,0 20,12" fill="#4285f4"/>
  </g>
  <text x="42" y="18" font-family="Arial, sans-serif" font-size="10" font-weight="500" fill="#202124">Google Ads</text>
  <rect x="116" y="6" width="58" height="15" rx="7.5" fill="#e8f0fe"/>
  <path d="M 126 13.5 l 1.6 3.6 l 3.6 1.6 l -3.6 1.6 l -1.6 3.6 l -1.6 -3.6 l -3.6 -1.6 l 3.6 -1.6 Z" fill="#9b72f2"/>
  <text x="150" y="17" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#1a73e8" text-anchor="middle">AI Max</text>
  <text x="386" y="18" font-family="Arial, sans-serif" font-size="7" fill="#5f6368" text-anchor="end">Search campaign ▾</text>
  <text x="14" y="48" font-family="Arial, sans-serif" font-size="10.5" font-weight="700" fill="#202124">AI Max for Search — ON</text>
  <rect x="190" y="38" width="78" height="14" rx="7" fill="#e6f4ea"/><circle cx="200" cy="45" r="3" fill="#34a853"/>
  <text x="208" y="48" font-family="Arial, sans-serif" font-size="7.5" font-weight="600" fill="#137333">Keywordless</text>
  <!-- query expansion flow -->
  <rect x="14" y="60" width="150" height="20" rx="6" fill="#fff" stroke="#dadce0"/>
  <text x="22" y="73.5" font-family="Arial, sans-serif" font-size="8" fill="#3c4043">"crm software"</text>
  <path d="M 168 70 L 188 70" stroke="#9b72f2" stroke-width="1.5" marker-end="url(#ar)"/>
  <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9b72f2"/></marker></defs>
  <g font-family="Arial, sans-serif" font-size="7.5">
    <rect x="194" y="56" width="92" height="14" rx="7" fill="#f3e8fd"/><text x="202" y="66" fill="#7b3ff2">best crm for agencies</text>
    <rect x="194" y="73" width="108" height="14" rx="7" fill="#f3e8fd"/><text x="202" y="83" fill="#7b3ff2">crm with email automation</text>
  </g>
  <!-- performance chart -->
  <line x1="14" y1="170" x2="240" y2="170" stroke="#dadce0" stroke-width="0.5"/>
  <path d="M 14 158 L 45 152 L 76 154 L 107 146 L 138 140 L 169 132 L 200 120 L 230 108 L 240 104 L 240 170 L 14 170 Z" fill="#9b72f2" opacity="0.14"/>
  <polyline points="14,158 45,152 76,154 107,146 138,140 169,132 200,120 230,108 240,104" fill="none" stroke="#7b3ff2" stroke-width="1.6"/>
  <circle cx="240" cy="104" r="3" fill="#7b3ff2" stroke="#fff" stroke-width="1.5"/>
  <text x="14" y="98" font-family="Arial, sans-serif" font-size="6.5" fill="#5f6368" letter-spacing="0.5">CONVERSIONS · BROAD + SMART BIDDING</text>
  <text x="14" y="118" font-family="Arial, sans-serif" font-size="18" font-weight="500" fill="#202124">+27%</text>
  <text x="62" y="118" font-family="Arial, sans-serif" font-size="8" fill="#137333">▲ vs exact</text>
  <!-- right metrics -->
  <rect x="258" y="96" width="128" height="100" rx="8" fill="#fff" stroke="#e3e8ee"/>
  <text x="270" y="114" font-family="Arial, sans-serif" font-size="7" fill="#5f6368">CPA</text><text x="270" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#202124">$22.40</text>
  <text x="270" y="150" font-family="Arial, sans-serif" font-size="7" fill="#5f6368">Brand controls</text><text x="270" y="166" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#ea4335">REQUIRED</text>
  <text x="270" y="186" font-family="Arial, sans-serif" font-size="7" fill="#5f6368">Search term report = your map</text>
</svg>`)}`;

const THUMB_COOKIELESS = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="ckBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c1320"/><stop offset="100%" stop-color="#1a2235"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#ckBg)"/>
  <rect x="14" y="14" width="150" height="20" rx="10" fill="#c97a2a" opacity="0.18"/>
  <text x="24" y="28" font-family="monospace" font-size="9" fill="#f5b942" font-weight="700" letter-spacing="1.2">COOKIELESS · 2026</text>
  <!-- crumbling cookie -->
  <circle cx="70" cy="92" r="30" fill="#c97a2a" opacity="0.85"/>
  <circle cx="62" cy="84" r="4" fill="#7a4a18"/><circle cx="80" cy="90" r="3.5" fill="#7a4a18"/><circle cx="68" cy="102" r="3" fill="#7a4a18"/><circle cx="82" cy="78" r="2.5" fill="#7a4a18"/>
  <path d="M 92 80 l 8 -5 M 96 92 l 9 1 M 90 104 l 7 6" stroke="#1a2235" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="100,74 108,70 104,80" fill="#c97a2a" opacity="0.5"/><polygon points="106,92 116,93 107,98" fill="#c97a2a" opacity="0.4"/>
  <text x="70" y="138" font-family="monospace" font-size="7.5" fill="#7c8aa0" text-anchor="middle">3rd-party signal ↓</text>
  <!-- arrow to server -->
  <path d="M 116 92 L 150 92" stroke="#4fdfb5" stroke-width="1.5" stroke-dasharray="3,3"/>
  <!-- server-side stack -->
  <g>
    <rect x="158" y="60" width="92" height="20" rx="4" fill="#141b29" stroke="#2c3a55"/><circle cx="170" cy="70" r="3.5" fill="#4fdfb5"/><text x="180" y="73" font-family="monospace" font-size="7.5" fill="#c4cde0">Consent Mode v2</text>
    <rect x="158" y="84" width="92" height="20" rx="4" fill="#141b29" stroke="#2c3a55"/><circle cx="170" cy="94" r="3.5" fill="#4fdfb5"/><text x="180" y="97" font-family="monospace" font-size="7.5" fill="#c4cde0">Server-side GTM</text>
    <rect x="158" y="108" width="92" height="20" rx="4" fill="#141b29" stroke="#2c3a55"/><circle cx="170" cy="118" r="3.5" fill="#f5b942"/><text x="180" y="121" font-family="monospace" font-size="7.5" fill="#c4cde0">First-party CDP</text>
  </g>
  <path d="M 250 94 L 280 94" stroke="#4fdfb5" stroke-width="1.5" stroke-dasharray="3,3"/>
  <!-- modeled conversions panel -->
  <rect x="286" y="56" width="100" height="78" rx="8" fill="#141b29" stroke="#2c3a55"/>
  <text x="296" y="72" font-family="monospace" font-size="7" fill="#7c8aa0" letter-spacing="0.5">MODELED CONV.</text>
  <text x="296" y="96" font-family="monospace" font-size="20" font-weight="700" fill="#4fdfb5">+34%</text>
  <text x="296" y="114" font-family="monospace" font-size="6.5" fill="#7c8aa0">recovered signal</text>
  <text x="296" y="126" font-family="monospace" font-size="6.5" fill="#7c8aa0">fed to bidding</text>
  <!-- consent banner -->
  <rect x="14" y="150" width="372" height="56" rx="8" fill="#141b29" stroke="#2c3a55"/>
  <text x="26" y="170" font-family="monospace" font-size="8" fill="#c4cde0">We value your privacy — manage data consent</text>
  <rect x="26" y="180" width="74" height="18" rx="4" fill="#4fdfb5"/><text x="63" y="192" font-family="monospace" font-size="7.5" font-weight="700" fill="#0a0a0f" text-anchor="middle">Accept all</text>
  <rect x="108" y="180" width="74" height="18" rx="4" fill="none" stroke="#4a5878"/><text x="145" y="192" font-family="monospace" font-size="7.5" fill="#7c8aa0" text-anchor="middle">Reject</text>
  <rect x="190" y="180" width="74" height="18" rx="4" fill="none" stroke="#4a5878"/><text x="227" y="192" font-family="monospace" font-size="7.5" fill="#7c8aa0" text-anchor="middle">Preferences</text>
</svg>`)}`;

const THUMB_UGC = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#f6f7f9"/>
  <rect x="0" y="0" width="400" height="26" fill="#fff" stroke="#e3e8ee" stroke-width="0.5"/>
  <circle cx="18" cy="13" r="8" fill="#ff4500"/>
  <path d="M 18 9.5 a 1.4 1.4 0 1 1 1.3 1.9 M 14 13.5 q 4 3 8 0 M 14.5 12.5 a 1 1 0 1 0 0.01 0 M 21.5 12.5 a 1 1 0 1 0 0.01 0" stroke="#fff" stroke-width="0.9" fill="none"/>
  <text x="32" y="17" font-family="Arial, sans-serif" font-size="9.5" font-weight="700" fill="#1a1a1b">r/marketing</text>
  <text x="386" y="17" font-family="Arial, sans-serif" font-size="7.5" fill="#7a8699" text-anchor="end">ranks #1 + cited by AI</text>
  <!-- thread card -->
  <rect x="14" y="36" width="372" height="170" rx="10" fill="#fff" stroke="#e3e8ee"/>
  <!-- vote column -->
  <rect x="14" y="36" width="34" height="170" rx="10" fill="#f8f9fb"/>
  <path d="M 31 52 l 7 8 l -14 0 Z" fill="#ff4500"/>
  <text x="31" y="78" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#1a1a1b" text-anchor="middle">4.2k</text>
  <path d="M 31 96 l 7 -8 l -14 0 Z" fill="#9aa3b2"/>
  <!-- post -->
  <text x="58" y="56" font-family="Arial, sans-serif" font-size="7.5" fill="#7a8699">Posted by u/growthlead · 8h · 214 comments</text>
  <text x="58" y="74" font-family="Arial, sans-serif" font-size="11.5" font-weight="700" fill="#1a1a1b">What's the best CRM you've actually used in 2026?</text>
  <!-- top comment -->
  <rect x="58" y="86" width="316" height="50" rx="8" fill="#f8f9fb"/>
  <circle cx="72" cy="100" r="6" fill="#1a9e8f"/>
  <text x="84" y="103" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#1a1a1b">u/ops_nerd · ▲ 1.1k</text>
  <g fill="#3c4043"><rect x="84" y="110" width="276" height="5" rx="2.5" opacity="0.4"/><rect x="84" y="120" width="200" height="5" rx="2.5" opacity="0.4"/></g>
  <rect x="84" y="110" width="90" height="5" rx="2.5" fill="#1a9e8f" opacity="0.85"/>
  <!-- brand mention pill -->
  <text x="58" y="156" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#7a8699" letter-spacing="0.5">WHY IT MATTERS</text>
  <g font-family="Arial, sans-serif" font-size="8" font-weight="600">
    <rect x="58" y="164" width="138" height="22" rx="6" fill="#e8f0fe"/>
    <text x="68" y="178" fill="#1a73e8">Surfaced in Google Discussions</text>
    <rect x="204" y="164" width="120" height="22" rx="6" fill="#f3e8fd"/>
    <text x="214" y="178" fill="#7b3ff2">Training data for LLMs</text>
  </g>
</svg>`)}`;

const THUMB_SEM = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#141227"/>
  <defs><linearGradient id="gsem" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#241f45"/><stop offset="100%" stop-color="#0d0b1c"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#gsem)"/>
  <g stroke="#6f5fd4" stroke-opacity="0.45" stroke-width="1.5">
    <line x1="200" y1="112" x2="80" y2="48"/><line x1="200" y1="112" x2="320" y2="48"/>
    <line x1="200" y1="112" x2="60" y2="140"/><line x1="200" y1="112" x2="340" y2="140"/>
    <line x1="200" y1="112" x2="130" y2="190"/><line x1="200" y1="112" x2="270" y2="190"/>
  </g>
  <circle cx="200" cy="112" r="26" fill="#7b6cf6"/>
  <text x="200" y="117" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">YOU</text>
  <g font-family="monospace" font-size="9" font-weight="bold">
    <rect x="46" y="36" width="68" height="24" rx="12" fill="#1f1a3d" stroke="#6f5fd4" stroke-opacity="0.6"/><text x="80" y="52" text-anchor="middle" fill="#c9c2f5">GOOGLE</text>
    <rect x="284" y="36" width="72" height="24" rx="12" fill="#1f1a3d" stroke="#6f5fd4" stroke-opacity="0.6"/><text x="320" y="52" text-anchor="middle" fill="#c9c2f5">CHATGPT</text>
    <rect x="24" y="128" width="72" height="24" rx="12" fill="#1f1a3d" stroke="#6f5fd4" stroke-opacity="0.6"/><text x="60" y="144" text-anchor="middle" fill="#c9c2f5">YOUTUBE</text>
    <rect x="306" y="128" width="66" height="24" rx="12" fill="#1f1a3d" stroke="#6f5fd4" stroke-opacity="0.6"/><text x="339" y="144" text-anchor="middle" fill="#c9c2f5">REDDIT</text>
    <rect x="98" y="178" width="64" height="24" rx="12" fill="#1f1a3d" stroke="#6f5fd4" stroke-opacity="0.6"/><text x="130" y="194" text-anchor="middle" fill="#c9c2f5">TIKTOK</text>
    <rect x="238" y="178" width="64" height="24" rx="12" fill="#1f1a3d" stroke="#6f5fd4" stroke-opacity="0.6"/><text x="270" y="194" text-anchor="middle" fill="#c9c2f5">MAPS</text>
  </g>
  <rect x="12" y="10" width="152" height="20" rx="4" fill="#7b6cf6" opacity="0.25"/>
  <text x="20" y="24" font-family="monospace" font-size="10" fill="#b3a7ff" font-weight="bold">SEARCH EVERYWHERE</text>
</svg>`)}`;

const THUMB_GADS = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="220" fill="#0a1e3d"/>
  <defs><linearGradient id="ggads" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#123063"/><stop offset="100%" stop-color="#06132a"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#ggads)"/>
  <line x1="0" y1="110" x2="400" y2="110" stroke="#ffffff" stroke-opacity="0.05"/>
  <line x1="0" y1="165" x2="400" y2="165" stroke="#ffffff" stroke-opacity="0.05"/>
  <line x1="200" y1="0" x2="200" y2="220" stroke="#ffffff" stroke-opacity="0.05"/>
  <text x="40" y="42" font-family="monospace" font-size="10" fill="#9db8e8" font-weight="bold">MONTHLY BUDGET</text>
  <rect x="40" y="52" width="200" height="6" rx="3" fill="#ffffff" opacity="0.15"/>
  <rect x="40" y="52" width="128" height="6" rx="3" fill="#4d90fe"/>
  <circle cx="168" cy="55" r="9" fill="#ffffff"/>
  <text x="252" y="60" font-family="monospace" font-size="13" fill="#ffffff" font-weight="bold">$4,000</text>
  <polyline points="40,182 100,170 150,152 190,130" fill="none" stroke="#34a853" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="190,130 250,106 310,90 364,80" fill="none" stroke="#34a853" stroke-width="2.5" stroke-dasharray="6 6" stroke-linecap="round"/>
  <circle cx="190" cy="130" r="5" fill="#34a853"/>
  <circle cx="364" cy="80" r="5" fill="#fbbc05"/>
  <g font-family="monospace" font-size="10" font-weight="bold">
    <rect x="248" y="120" width="122" height="24" rx="6" fill="#34a853" opacity="0.18"/><text x="258" y="136" fill="#7ee2a0">LEADS ≈ 96 /mo</text>
    <rect x="248" y="150" width="122" height="24" rx="6" fill="#fbbc05" opacity="0.18"/><text x="258" y="166" fill="#ffd666">CPL ≈ $41</text>
  </g>
  <rect x="12" y="10" width="134" height="20" rx="4" fill="#4d90fe" opacity="0.25"/>
  <text x="20" y="24" font-family="monospace" font-size="10" fill="#9ec2ff" font-weight="bold">ADS PROJECTION</text>
</svg>`)}`;

window.WJH_THUMBS = {
  byId: { 1: THUMB_SEO, 2: THUMB_DM, 3: THUMB_AI, 4: THUMB_NEARME, 5: THUMB_PERFKPI, 6: THUMB_GBP, 7: THUMB_VBB, 8: THUMB_GA4, 9: THUMB_AIOVERVIEW, 10: THUMB_ADVPLUS, 11: THUMB_AIMAX, 12: THUMB_COOKIELESS, 13: THUMB_UGC, 14: THUMB_SEM, 15: THUMB_GADS },
  byCategory: {
    'SEO': THUMB_SEO,
    'Digital Marketing': THUMB_DM,
    'AI & SEO': THUMB_AIOVERVIEW,
    'Local SEO': THUMB_NEARME,
    'Performance Marketing': THUMB_PERFKPI,
    'PPC': THUMB_VBB,
    'Analytics': THUMB_GA4,
    'Social': THUMB_ADVPLUS
  },
  forPost: function (p) {
    if (!p) return THUMB_SEO;
    if (p.img) return p.img;
    if (this.byId[p.id]) return this.byId[p.id];
    if (p.category && this.byCategory[p.category]) return this.byCategory[p.category];
    return THUMB_SEO;
  }
};
})();
