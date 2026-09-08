/* ============================================================
   SERVICE PROJECTION ESTIMATORS for wajeeh.dev
   ------------------------------------------------------------
   Adds an interactive "estimate your results" calculator to each
   service page, tuned to that service's KPI:
     • PPC / SEM   → budget + industry + region → leads / CPL / ROAS
     • Paid Social → budget + industry + region → reach / results / ROAS
     • SEO/Content → niche + region + competition → keywords, traffic, ranking time
     • Web / WP    → project scope → timeline + investment
     • Email       → list size + AOV → projected monthly revenue
     • Social      → platforms + cadence → reach + follower growth
   Then a "Book a consultation call" modal (posts to Formspree).

   Loaded by services.html. Reads the global SERVICES object.
   ============================================================ */
(function () {
  'use strict';

  // Which calculator each service uses
  const ESTIMATOR_TYPE = {
    seo: 'traffic', content: 'traffic', wordpress: 'timeline',
    sem: 'ppc', paid: 'meta', social: 'social',
    email: 'email', webdev: 'timeline', automation: 'automation'
  };

  // ── Industry benchmarks (used by PPC + Meta) ───────────────
  // cpc=avg Google CPC, cvr=search conv rate, cpm=Meta CPM,
  // metaCpl=Meta cost-per-lead, roas=blended (ecom), aov=avg order/deal value
  const INDUSTRIES = {
    'E-commerce / Retail':   { mode: 'ecom',    cpc: 1.4, cvr: 0.030, cpm: 11, roas: 3.4, aov: 80 },
    'B2B / SaaS':            { mode: 'leadgen', cpc: 4.5, cvr: 0.040, cpm: 15, metaCpl: 70, aov: 1400 },
    'Legal Services':        { mode: 'leadgen', cpc: 7.8, cvr: 0.045, cpm: 17, metaCpl: 95, aov: 3000 },
    'Home Services':         { mode: 'leadgen', cpc: 5.4, cvr: 0.060, cpm: 12, metaCpl: 42, aov: 650 },
    'Healthcare / Dental':   { mode: 'leadgen', cpc: 3.2, cvr: 0.055, cpm: 13, metaCpl: 38, aov: 500 },
    'Real Estate':           { mode: 'leadgen', cpc: 2.5, cvr: 0.035, cpm: 10, metaCpl: 34, aov: 4500 },
    'Finance / Insurance':   { mode: 'leadgen', cpc: 6.9, cvr: 0.038, cpm: 18, metaCpl: 88, aov: 1600 },
    'Education / Coaching':  { mode: 'ecom',    cpc: 2.6, cvr: 0.050, cpm: 9,  roas: 2.8, aov: 900 },
    'Fitness / Wellness':    { mode: 'ecom',    cpc: 1.9, cvr: 0.045, cpm: 8,  roas: 3.0, aov: 220 },
    'Travel / Hospitality':  { mode: 'ecom',    cpc: 1.6, cvr: 0.032, cpm: 9,  roas: 3.2, aov: 600 }
  };

  // ── Regions: cost (cpc/cpm) multiplier + market-size factor ─
  const REGIONS = {
    'United States':    { cost: 1.00, mkt: 1.00 },
    'Canada':           { cost: 0.85, mkt: 0.42 },
    'United Kingdom':   { cost: 0.88, mkt: 0.55 },
    'Western Europe':   { cost: 0.74, mkt: 0.80 },
    'Australia / NZ':   { cost: 0.82, mkt: 0.34 },
    'UAE / Gulf':       { cost: 0.90, mkt: 0.30 },
    'South Asia':       { cost: 0.32, mkt: 0.75 },
    'Southeast Asia':   { cost: 0.38, mkt: 0.62 },
    'Latin America':    { cost: 0.40, mkt: 0.68 },
    'Global / Mixed':   { cost: 0.62, mkt: 1.30 }
  };

  // ── SEO keyword templates (the niche term gets injected) ───
  const KW_TEMPLATES = [
    { t: n => `best ${n}`,           base: 8200, diff: 'high', ctr: 0.12 },
    { t: n => `${n} near me`,        base: 6600, diff: 'med',  ctr: 0.15 },
    { t: n => `${n} services`,       base: 4400, diff: 'high', ctr: 0.11 },
    { t: n => `affordable ${n}`,     base: 2900, diff: 'low',  ctr: 0.17 },
    { t: n => `${n} reviews`,        base: 3600, diff: 'med',  ctr: 0.13 },
    { t: n => `${n} cost`,           base: 2400, diff: 'low',  ctr: 0.16 },
    { t: n => `top ${n} companies`,  base: 1900, diff: 'med',  ctr: 0.12 },
    { t: n => `how to choose ${n}`,  base: 1300, diff: 'low',  ctr: 0.10 }
  ];

  const COMPETITION = {
    Low:    { ctrMult: 1.25, months: [3, 5],  pos: 'top 3' },
    Medium: { ctrMult: 1.00, months: [5, 8],  pos: 'page 1 (4–6)' },
    High:   { ctrMult: 0.62, months: [8, 12], pos: 'page 1 (6–9)' }
  };

  // ── Automation types: pct = share of the manual work it removes,
  //    weeks = typical build time, stack = tools used ──────────
  const AUTOMATION_TYPES = {
    'AI Chat Agent (website / WhatsApp)':   { pct: 0.70, weeks: [2, 4], stack: 'Claude / GPT + GoHighLevel' },
    'AI Voice Agent (inbound calls)':       { pct: 0.65, weeks: [3, 5], stack: 'Voice AI + GHL calendars' },
    'GoHighLevel Setup (CRM + funnels)':    { pct: 0.60, weeks: [2, 4], stack: 'GoHighLevel snapshots' },
    'Zapier / Make Integrations':           { pct: 0.80, weeks: [1, 3], stack: 'Zapier / Make + webhooks' },
    'CRM & Lead Follow-up Automation':      { pct: 0.75, weeks: [2, 3], stack: 'GHL / HubSpot workflows' },
    'Email / SMS Nurture Sequences':        { pct: 0.70, weeks: [1, 3], stack: 'GHL / Klaviyo flows' },
    'Reporting & Dashboard Automation':     { pct: 0.85, weeks: [1, 2], stack: 'Looker Studio + Zapier' },
    'Custom / Not sure yet':                { pct: 0.65, weeks: [2, 5], stack: 'Scoped on the call' }
  };

  // ── Conversion goals / KPIs the user can target ────────────
  // rate = how frequent this action is vs a standard form lead (the
  // baseline 1.0). Higher rate → cheaper, more numerous action.
  // p = which platforms it applies to: 'both' | 'ppc' | 'meta'.
  const GOALS = {
    'Conversions (any action)':      { rate: 1.00, noun: 'conversions',   short: 'conversion',  p: 'both' },
    'Leads (form fills)':            { rate: 1.00, noun: 'leads',         short: 'lead',        p: 'both' },
    'Cost per Lead (CPL)':           { rate: 1.00, noun: 'leads',         short: 'lead',        p: 'both' },
    'Phone calls':                   { rate: 0.78, noun: 'calls',         short: 'call',        p: 'both' },
    'Booked appointments':           { rate: 0.55, noun: 'appointments',  short: 'appointment', p: 'both' },
    'Purchases / Sales':             { rate: 0.50, noun: 'purchases',     short: 'purchase',    p: 'both', sale: true },
    'Sign-ups / Registrations':      { rate: 1.35, noun: 'sign-ups',      short: 'sign-up',     p: 'both' },
    'App installs':                  { rate: 1.70, noun: 'installs',      short: 'install',     p: 'both' },
    'Free trials / Subscriptions':   { rate: 0.85, noun: 'trials',        short: 'trial',       p: 'both' },
    'Add to cart':                   { rate: 2.40, noun: 'add-to-carts',  short: 'add-to-cart', p: 'both' },
    'Begin checkout':                { rate: 1.30, noun: 'checkouts',     short: 'checkout',    p: 'both' },
    'Quote / Estimate requests':     { rate: 0.88, noun: 'quote requests',short: 'quote',       p: 'both' },
    'Newsletter / Email opt-ins':    { rate: 2.10, noun: 'opt-ins',       short: 'opt-in',      p: 'both' },
    // PPC / Google Ads specific
    'Store visits':                  { rate: 1.20, noun: 'store visits',  short: 'visit',       p: 'ppc' },
    'Call-only ad calls':            { rate: 0.95, noun: 'calls',         short: 'call',        p: 'ppc' },
    // Meta / paid social specific
    'Messaging conversations':       { rate: 1.55, noun: 'conversations', short: 'conversation',p: 'meta' },
    'Landing page views':            { rate: 4.20, noun: 'landing-page views', short: 'LP view', p: 'meta' },
    'ThruPlay video views':          { rate: 9.00, noun: 'ThruPlays',     short: 'ThruPlay',    p: 'meta' },
    'Lead form (Instant Forms)':     { rate: 1.25, noun: 'instant leads', short: 'lead',        p: 'meta' },
    'Event responses':               { rate: 1.80, noun: 'responses',     short: 'response',    p: 'meta' }
  };
  function goalKeys(plat) {
    return Object.keys(GOALS).filter(k => GOALS[k].p === 'both' || GOALS[k].p === plat);
  }
  function getGoal(name) { return GOALS[name] || GOALS['Conversions (any action)']; }

  // ── helpers ────────────────────────────────────────────────
  const fmt = n => n >= 1000 ? Math.round(n).toLocaleString('en-US') : String(Math.round(n));
  // ── currency (USD benchmarks; chosen currency only changes entry/display) ──
  const CURRENCIES = {
    USD: { symbol: '$',    rate: 1,    name: 'US Dollar' },
    EUR: { symbol: '€',    rate: 0.92, name: 'Euro' },
    GBP: { symbol: '£',    rate: 0.79, name: 'British Pound' },
    PKR: { symbol: '₨',    rate: 278,  name: 'Pakistani Rupee' },
    INR: { symbol: '₹',    rate: 83,   name: 'Indian Rupee' },
    AED: { symbol: 'AED',  rate: 3.67, name: 'UAE Dirham' },
    SAR: { symbol: 'SAR',  rate: 3.75, name: 'Saudi Riyal' },
    CAD: { symbol: 'C$',   rate: 1.36, name: 'Canadian Dollar' },
    AUD: { symbol: 'A$',   rate: 1.52, name: 'Australian Dollar' },
    SGD: { symbol: 'S$',   rate: 1.34, name: 'Singapore Dollar' },
    BDT: { symbol: '৳',    rate: 110,  name: 'Bangladeshi Taka' },
    NGN: { symbol: '₦',    rate: 1500, name: 'Nigerian Naira' },
    ZAR: { symbol: 'R',    rate: 18.5, name: 'South African Rand' },
    BRL: { symbol: 'R$',   rate: 5.4,  name: 'Brazilian Real' },
    MXN: { symbol: 'MX$',  rate: 17,   name: 'Mexican Peso' },
    PHP: { symbol: '₱',    rate: 57,   name: 'Philippine Peso' },
    MYR: { symbol: 'RM',   rate: 4.7,  name: 'Malaysian Ringgit' },
    TRY: { symbol: '₺',    rate: 33,   name: 'Turkish Lira' },
    JPY: { symbol: '¥',    rate: 150,  name: 'Japanese Yen' }
  };
  const REGION_CURRENCY = {
    US:'USD', GB:'GBP', PK:'PKR', IN:'INR', AE:'AED', SA:'SAR', CA:'CAD', AU:'AUD', NZ:'AUD',
    SG:'SGD', BD:'BDT', NG:'NGN', ZA:'ZAR', BR:'BRL', MX:'MXN', PH:'PHP', MY:'MYR', TR:'TRY', JP:'JPY',
    IE:'EUR', DE:'EUR', FR:'EUR', ES:'EUR', IT:'EUR', NL:'EUR', BE:'EUR', AT:'EUR', PT:'EUR', FI:'EUR', GR:'EUR'
  };
  function detectCurrency() {
    try { const s = localStorage.getItem('wjh_cur'); if (s && CURRENCIES[s]) return s; } catch (e) {}
    let region = '';
    try { region = new Intl.Locale(navigator.language || 'en-US').maximize().region || ''; } catch (e) {}
    if (!region) region = (navigator.language || '').split('-')[1] || 'US';
    return REGION_CURRENCY[String(region).toUpperCase()] || 'USD';
  }
  let CUR_CODE = detectCurrency();
  let CUR = CURRENCIES[CUR_CODE] || CURRENCIES.USD;
  const toUSD = v => (+v || 0) / CUR.rate;
  const money = n => CUR.symbol + fmt(n * CUR.rate);
  const moneyK = n => { const v = n * CUR.rate; return v >= 1000 ? CUR.symbol + (v / 1000).toFixed(v >= 10000 ? 0 : 1) + 'K' : CUR.symbol + Math.round(v); };
  const M = usd => Math.max(1, Math.round(usd * CUR.rate));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const round10 = n => Math.round(n / 10) * 10;
  // deterministic 0..1 from a string (so a given niche gives stable numbers)
  function seed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ((h >>> 0) % 1000) / 1000;
  }

  function opt(list, sel) {
    return list.map(o => `<option${o === sel ? ' selected' : ''}>${esc(o)}</option>`).join('');
  }
  function field(label, control, hint) {
    return `<div class="est-field"><label class="est-label">${label}</label>${control}${hint ? `<div class="est-hint">${hint}</div>` : ''}</div>`;
  }
  // Currency picker pill (replaces the fixed $) shown inside money inputs.
  function curSelect() {
    return `<select class="est-cur-select" data-k="currency" aria-label="Currency">${
      Object.keys(CURRENCIES).map(c => {
        const sym = (CURRENCIES[c].symbol || '').trim();
        const label = (sym && sym !== c) ? sym + ' ' + c : c;
        return `<option value="${c}"${c === CUR_CODE ? ' selected' : ''}>${esc(label)}</option>`;
      }).join('')
    }</select>`;
  }

  // ── form markup per type ───────────────────────────────────
  function formFor(type) {
    const regionSel = `<select class="est-input" data-k="region">${opt(Object.keys(REGIONS), 'United States')}</select>`;
    const indSel = `<select class="est-input" data-k="industry">${opt(Object.keys(INDUSTRIES), 'Home Services')}</select>`;

    if (type === 'ppc' || type === 'meta') {
      const noun = type === 'ppc' ? 'Google Ads' : 'Meta / paid social';
      const goalSel = `<select class="est-input" data-k="goal">${opt(goalKeys(type), 'Conversions (any action)')}</select>`;
      return field('Monthly ad budget',
        `<div class="est-budget">${curSelect()}<input class="est-input" type="number" data-k="budget" data-money value="${M(3000)}" min="${M(300)}" step="${M(100)}"/></div>`,
        `Your planned monthly spend on ${noun}. Pick your currency on the left — figures use approximate exchange rates.`)
        + field('Conversion goal / KPI', goalSel,
          `The action you want to optimize for — sets your <strong>cost-per-${type === 'ppc' ? 'conversion' : 'result'}</strong> and projected volume.`)
        + field('Industry', indSel, 'Sets realistic CPC / CPM &amp; conversion benchmarks.')
        + field('Target market / demographic', regionSel, 'Where your audience is — affects cost &amp; reach.');
    }
    if (type === 'traffic') {
      return field('Your niche / topic',
        `<input class="est-input" type="text" data-k="niche" value="dental implants" placeholder="e.g. personal injury lawyer, vegan protein"/>`,
        'The product, service, or topic you want to rank for.')
        + field('Target market / demographic', regionSel, 'Localizes the search-volume estimate.')
        + field('Competition level',
          `<select class="est-input" data-k="competition">${opt(['Low', 'Medium', 'High'], 'Medium')}</select>`,
          'How saturated your niche is — drives ranking time.');
    }
    if (type === 'timeline') {
      const types = ['Landing page', 'Marketing website', 'Blog / CMS site', 'E-commerce store', 'Web app / SaaS'];
      return field('Project type', `<select class="est-input" data-k="ptype">${opt(types, 'Marketing website')}</select>`)
        + field('Approx. number of pages',
          `<div class="est-rangewrap"><input class="est-range" type="range" data-k="pages" min="1" max="50" value="8"/><span class="est-rangeval" data-for="pages">8</span></div>`)
        + field('Features needed',
          `<div class="est-checks">${['CMS / editable content', 'Custom design', 'Animations / motion', 'E-commerce / checkout', '3rd-party integrations', 'Multilingual'].map((f, i) =>
            `<label class="est-check"><input type="checkbox" data-feat="${esc(f)}"${i === 0 || i === 1 ? ' checked' : ''}/><span>${f}</span></label>`).join('')}</div>`);
    }
    if (type === 'email') {
      return field('Email list size',
        `<input class="est-input" type="number" data-k="list" value="15000" min="200" step="100"/>`, 'Active, opted-in subscribers.')
        + field('Average order / deal value',
          `<div class="est-budget">${curSelect()}<input class="est-input" type="number" data-k="aov" data-money value="${M(85)}" min="${M(5)}" step="${M(5)}"/></div>`)
        + field('Broadcast campaigns / month',
          `<div class="est-rangewrap"><input class="est-range" type="range" data-k="sends" min="1" max="16" value="4"/><span class="est-rangeval" data-for="sends">4</span></div>`);
    }
    if (type === 'automation') {
      return field('Type of automation',
        `<input class="est-input" type="text" data-k="atype" list="est-atype-list" value="AI Chat Agent (website / WhatsApp)" placeholder="Pick from the list or type your own…" autocomplete="off"/>
         <datalist id="est-atype-list">${Object.keys(AUTOMATION_TYPES).map(k => `<option value="${esc(k)}"></option>`).join('')}</datalist>`,
        'Pick a common build from the list — or type your own: AI agents, GoHighLevel, Zapier / Make, anything.')
        + field('What do you want to automate?',
          `<textarea class="est-input" data-k="describe" rows="2" placeholder="e.g. Facebook leads → GHL → instant SMS follow-up + booking"></textarea>`,
          'Type it in your own words — it goes straight into your consultation summary.')
        + field('Hours / week spent on this manually',
          `<div class="est-rangewrap"><input class="est-range" type="range" data-k="hours" min="1" max="60" value="10"/><span class="est-rangeval" data-for="hours">10</span></div>`,
          'Across everyone who touches this workflow today.')
        + field('What that time costs (per hour)',
          `<div class="est-budget">${curSelect()}<input class="est-input" type="number" data-k="rate" data-money value="${M(25)}" min="${M(5)}" step="${M(5)}"/></div>`,
          'Blended hourly cost of the people doing it manually.');
    }
    if (type === 'social') {
      return field('Platforms',
        `<div class="est-checks">${['Instagram', 'TikTok', 'LinkedIn', 'YouTube Shorts', 'Facebook', 'X / Twitter'].map((p, i) =>
          `<label class="est-check"><input type="checkbox" data-plat="${esc(p)}"${i < 2 ? ' checked' : ''}/><span>${p}</span></label>`).join('')}</div>`)
        + field('Posts per week (per platform)',
          `<div class="est-rangewrap"><input class="est-range" type="range" data-k="cadence" min="1" max="14" value="5"/><span class="est-rangeval" data-for="cadence">5</span></div>`)
        + field('Current total following',
          `<input class="est-input" type="number" data-k="followers" value="2500" min="0" step="100"/>`);
    }
    return '';
  }

  // ── calculators: return { headline:[{num,lbl,sub}], extra:html, summary:string } ──
  function calc(type, v) {
    if (type === 'ppc') return calcPpc(v);
    if (type === 'meta') return calcMeta(v);
    if (type === 'traffic') return calcTraffic(v);
    if (type === 'timeline') return calcTimeline(v);
    if (type === 'email') return calcEmail(v);
    if (type === 'social') return calcSocial(v);
    if (type === 'automation') return calcAutomation(v);
    return null;
  }

  function calcPpc(v) {
    const ind = INDUSTRIES[v.industry], reg = REGIONS[v.region];
    const budget = Math.max(300, toUSD(v.budget));
    const cpc = ind.cpc * reg.cost;
    const clicks = budget / cpc;
    const goal = getGoal(v.goal);
    const effRate = ind.cvr * goal.rate;           // click → chosen action rate
    const actions = clicks * effRate;
    const cpa = budget / actions;
    const stats = [
      { num: fmt(actions), lbl: 'Projected ' + goal.noun + ' / month', sub: 'at a ' + (effRate * 100).toFixed(1) + '% conversion rate' },
      { num: money(cpa), lbl: 'Cost per ' + goal.short, sub: fmt(actions * 12) + ' ' + goal.noun + ' / yr' }
    ];
    if (goal.sale && ind.aov) {
      const revenue = actions * ind.aov;
      stats.push({ num: (revenue / budget).toFixed(1) + '×', lbl: 'Projected ROAS', sub: moneyK(revenue) + ' revenue' });
    } else {
      stats.push({ num: fmt(clicks), lbl: 'Clicks / month', sub: '~' + money(cpc) + ' avg CPC' });
    }
    const summary = `PPC · ${moneyK(budget)}/mo · ${v.industry} · ${v.region} · goal: ${goal.noun} → ~${fmt(actions)} ${goal.noun}/mo at ${money(cpa)} each`;
    return { stats, extra: rangeNote(actions, goal.noun), summary };
  }

  function calcMeta(v) {
    const ind = INDUSTRIES[v.industry], reg = REGIONS[v.region];
    const budget = Math.max(300, toUSD(v.budget));
    const cpm = ind.cpm * reg.cost;
    const impressions = budget / cpm * 1000;
    const reach = impressions / 1.9;
    const goal = getGoal(v.goal);
    // Cost of one standard form lead on Meta for this industry. Lead-gen
    // industries carry metaCpl; ecom industries derive it from AOV / ROAS.
    const baseLeadCost = (ind.metaCpl ? ind.metaCpl : (ind.aov / ind.roas) * 0.5) * reg.cost;
    const baseLeads = budget / baseLeadCost;
    const actions = baseLeads * goal.rate;
    const cpa = budget / actions;
    const stats = [
      { num: fmt(actions), lbl: 'Projected ' + goal.noun + ' / month', sub: money(cpa) + ' cost per ' + goal.short },
      { num: fmt(reach), lbl: 'People reached / mo', sub: fmt(impressions) + ' impressions' }
    ];
    if (goal.sale && ind.aov) {
      const revenue = actions * ind.aov;
      stats.push({ num: (revenue / budget).toFixed(1) + '×', lbl: 'Projected ROAS', sub: moneyK(revenue) + ' revenue' });
    } else {
      stats.push({ num: fmt(actions * 12), lbl: goal.noun.charAt(0).toUpperCase() + goal.noun.slice(1) + ' / year', sub: 'at steady spend' });
    }
    const summary = `Meta · ${moneyK(budget)}/mo · ${v.industry} · ${v.region} · goal: ${goal.noun} → ~${fmt(actions)} ${goal.noun}/mo at ${money(cpa)} each`;
    return { stats, extra: rangeNote(actions, goal.noun), summary };
  }

  function calcTraffic(v) {
    const niche = (v.niche || '').trim().toLowerCase() || 'your niche';
    const reg = REGIONS[v.region], comp = COMPETITION[v.competition] || COMPETITION.Medium;
    const s0 = seed(niche);
    const rows = KW_TEMPLATES.slice(0, 6).map((tpl, i) => {
      const f = 0.7 + seed(niche + i) * 0.7;            // 0.7–1.4 deterministic
      const vol = round10(tpl.base * f * reg.mkt);
      const visits = Math.round(vol * tpl.ctr * comp.ctrMult);
      return { kw: tpl.t(niche), vol, diff: tpl.diff, visits };
    });
    const totalVisits = rows.reduce((a, r) => a + r.visits, 0);
    const totalVol = rows.reduce((a, r) => a + r.vol, 0);
    const months = comp.months;
    const stats = [
      { num: fmt(totalVisits), lbl: 'Organic visits / mo', sub: 'at maturity, ' + comp.pos },
      { num: months[0] + '–' + months[1], lbl: 'Months to rank', sub: v.competition + ' competition' },
      { num: fmt(totalVol), lbl: 'Total search demand', sub: rows.length + ' core keywords' }
    ];
    const table = `
      <div class="est-kw">
        <div class="est-kw-head"><span>Keyword</span><span>Volume</span><span>Diff.</span><span>Est. visits</span></div>
        ${rows.map(r => `<div class="est-kw-row">
          <span class="est-kw-term">${esc(r.kw)}</span>
          <span class="est-kw-vol">${fmt(r.vol)}</span>
          <span class="est-kw-diff ${r.diff}">${r.diff}</span>
          <span class="est-kw-visits">+${fmt(r.visits)}</span>
        </div>`).join('')}
      </div>
      ${rampChart(totalVisits, months[1])}`;
    const summary = `SEO · "${niche}" · ${v.region} · ${v.competition} comp → ~${fmt(totalVisits)} visits/mo, ranking in ${months[0]}–${months[1]} mo`;
    return { stats, extra: table, summary };
  }

  function calcTimeline(v) {
    // Days-based build model — fast modern stack, not agency-padded weeks.
    const base = { 'Landing page': 3, 'Marketing website': 6, 'Blog / CMS site': 8, 'E-commerce store': 12, 'Web app / SaaS': 18 }[v.ptype] || 6;
    const pages = Math.max(1, +v.pages || 1);
    const featD = { 'CMS / editable content': 1.5, 'Custom design': 2, 'Animations / motion': 1.5, 'E-commerce / checkout': 3, '3rd-party integrations': 2, 'Multilingual': 1.5 };
    let days = base + Math.min(10, pages * 0.5);
    (v.features || []).forEach(f => { days += featD[f] || 0; });
    const lo = Math.max(2, Math.round(days * 0.85)), hi = Math.round(days * 1.15);
    // Concrete target launch date (rough calendar conversion from business days).
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + Math.ceil(hi / 5 * 7) + 2);
    const launch = launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const featCount = (v.features || []).length;
    const phases = [['Discovery & scope', 0.15], ['Design', 0.25], ['Build', 0.4], ['QA & launch', 0.2]];
    const stats = [
      { num: lo + '–' + hi, lbl: 'Business days to launch', sub: v.ptype },
      { num: launch, lbl: 'Target launch date', sub: 'if we kick off this week' },
      { num: String(pages), lbl: pages === 1 ? 'Page' : 'Pages', sub: featCount + (featCount === 1 ? ' add-on feature' : ' add-on features') }
    ];
    const extra = `
      <div class="est-phases">
        ${phases.map(([name, pct]) => `<div class="est-phase">
          <div class="est-phase-top"><span>${name}</span><span>${Math.max(1, Math.round(hi * pct))} days</span></div>
          <div class="est-phase-bar"><i style="width:${pct * 100}%"></i></div>
        </div>`).join('')}
      </div>
      <p class="est-note">Estimate assumes timely feedback &amp; content. Final scope and a fixed price are locked in the consultation call.</p>`;
    const summary = `Web build · ${v.ptype} · ${pages} pages · ${featCount} features → ${lo}–${hi} business days (live by ~${launch})`;
    return { stats, extra, summary };
  }

  function calcEmail(v) {
    const list = Math.max(200, +v.list || 0);
    const aov = Math.max(5, toUSD(v.aov));
    const sends = Math.max(1, +v.sends || 1);
    const rprCampaign = aov * 0.0018;                  // revenue per recipient per campaign
    const campaignRev = list * rprCampaign * sends;
    const flowRev = campaignRev * 0.85;                // automated flows ≈ 45% of email revenue
    const total = campaignRev + flowRev;
    const stats = [
      { num: moneyK(total), lbl: 'Email revenue / mo', sub: moneyK(total * 12) + ' / year' },
      { num: '$' + (total / list).toFixed(2), lbl: 'Revenue / subscriber', sub: 'blended RPS' },
      { num: fmt(total / aov), lbl: 'Orders / month', sub: 'from email alone' }
    ];
    const extra = `
      <div class="est-split">
        <div class="est-split-row"><span>Automated flows</span><b>${moneyK(flowRev)}</b></div>
        <div class="est-split-bar"><i style="width:${flowRev / total * 100}%"></i></div>
        <div class="est-split-row"><span>Broadcast campaigns</span><b>${moneyK(campaignRev)}</b></div>
        <div class="est-split-bar amber"><i style="width:${campaignRev / total * 100}%"></i></div>
      </div>
      <p class="est-note">Based on DTC benchmarks of ~$0.10–0.20 revenue per recipient. Flows compound as your list grows.</p>`;
    const summary = `Email · ${fmt(list)} subs · ${money(aov)} AOV · ${sends} campaigns/mo → ~${moneyK(total)}/mo`;
    return { stats, extra, summary };
  }

  function calcSocial(v) {
    const plats = v.platforms || [];
    const cadence = Math.max(1, +v.cadence || 1);
    const followers = Math.max(0, +v.followers || 0);
    const reachPerPost = { Instagram: 380, TikTok: 1100, LinkedIn: 520, 'YouTube Shorts': 900, Facebook: 300, 'X / Twitter': 260 };
    let monthlyReach = 0;
    plats.forEach(p => { monthlyReach += (reachPerPost[p] || 300) * cadence * 4.3; });
    // small follower-base amplifier
    monthlyReach *= (1 + Math.min(1.5, followers / 20000));
    const newFollowers = monthlyReach * 0.012;
    const sixMo = followers + newFollowers * 6 * 1.15;
    const stats = [
      { num: fmt(monthlyReach), lbl: 'Reach / month', sub: plats.length + ' platform' + (plats.length === 1 ? '' : 's') },
      { num: '+' + fmt(newFollowers), lbl: 'New followers / mo', sub: '~1.2% follow rate' },
      { num: fmt(sixMo), lbl: 'Following in 6 mo', sub: 'from ' + fmt(followers) + ' today' }
    ];
    const extra = `<p class="est-note">${plats.length ? 'Projection assumes consistent posting at the chosen cadence with on-brand, platform-native creative.' : 'Pick at least one platform to see a projection.'}</p>`;
    const summary = `Social · ${plats.join(', ') || '—'} · ${cadence}/wk → ~${fmt(monthlyReach)} reach, +${fmt(newFollowers)} followers/mo`;
    return { stats, extra, summary };
  }

  // Map a typed-in automation type onto the closest known benchmark
  function matchAutomationType(raw) {
    if (AUTOMATION_TYPES[raw]) return AUTOMATION_TYPES[raw];
    const s = String(raw || '').toLowerCase();
    const rules = [
      [/voice|call|phone|recept/, 'AI Voice Agent (inbound calls)'],
      [/chat|whatsapp|messenger|bot|agent|\bai\b|gpt|claude/, 'AI Chat Agent (website / WhatsApp)'],
      [/ghl|go ?high ?level|high ?level|funnel|snapshot/, 'GoHighLevel Setup (CRM + funnels)'],
      [/zapier|make\.com|\bmake\b|integromat|\bn8n\b|integrat|webhook|\bapi\b/, 'Zapier / Make Integrations'],
      [/crm|lead|follow|pipeline|hubspot/, 'CRM & Lead Follow-up Automation'],
      [/email|sms|nurture|sequence|drip|klaviyo/, 'Email / SMS Nurture Sequences'],
      [/report|dashboard|sheet|looker|kpi/, 'Reporting & Dashboard Automation']
    ];
    for (let i = 0; i < rules.length; i++) {
      if (rules[i][0].test(s)) return AUTOMATION_TYPES[rules[i][1]];
    }
    return AUTOMATION_TYPES['Custom / Not sure yet'];
  }

  function calcAutomation(v) {
    const typed = String(v.atype || '').trim();
    const t = matchAutomationType(typed);
    const hrs = Math.max(1, +v.hours || 1);
    const rate = Math.max(5, toUSD(v.rate) || 5);
    const desc = (v.describe || '').trim();
    const savedWk = hrs * t.pct;
    const savedMo = savedWk * 4.3;
    const valueYr = savedMo * rate * 12;
    const leftWk = hrs - savedWk;
    const stats = [
      { num: fmt(savedMo) + ' hrs', lbl: 'Time handed back / month', sub: '~' + savedWk.toFixed(1) + ' hrs/week, every week' },
      { num: moneyK(valueYr), lbl: 'Value of time / year', sub: 'at ' + money(rate) + '/hr blended cost' },
      { num: t.weeks[0] + '–' + t.weeks[1] + ' wk', lbl: 'Build & launch time', sub: t.stack }
    ];
    const extra = `
      <div class="est-split">
        <div class="est-split-row"><span>Automated away</span><b>${savedWk.toFixed(1)} hrs/wk</b></div>
        <div class="est-split-bar"><i style="width:${t.pct * 100}%"></i></div>
        <div class="est-split-row"><span>Still needs a human</span><b>${leftWk.toFixed(1)} hrs/wk</b></div>
        <div class="est-split-bar amber"><i style="width:${(1 - t.pct) * 100}%"></i></div>
      </div>
      <p class="est-note">Assumes the system handles ~${Math.round(t.pct * 100)}% of this workflow once live — with human-handoff rules for the rest. Doesn't count the leads saved by replying in minutes instead of hours.</p>`;
    const summary = `Automation · ${typed || 'Custom / Not sure yet'} · ${hrs} hrs/wk @ ${money(rate)}/hr → ~${fmt(savedMo)} hrs/mo saved (~${moneyK(valueYr)}/yr)`
      + (desc ? ` · Goal: “${desc.slice(0, 120)}${desc.length > 120 ? '…' : ''}”` : '');
    return { stats, extra, summary };
  }

  // ── shared result fragments ────────────────────────────────
  function rangeNote(mid, noun) {
    const lo = Math.round(mid * 0.8), hi = Math.round(mid * 1.25);
    return `<div class="est-range-band">
      <div class="est-range-track"><span class="est-range-fill"></span><span class="est-range-dot"></span></div>
      <div class="est-range-lbls"><span>Conservative · ${fmt(lo)}</span><span>Stretch · ${fmt(hi)}</span></div>
      <p class="est-note">A realistic month-3+ range for ${noun}, once campaigns exit the learning phase.</p>
    </div>`;
  }
  function rampChart(target, months) {
    const pts = [];
    for (let m = 1; m <= 6; m++) {
      const t = m / 6;
      const ease = t * t * (3 - 2 * t);        // smoothstep S-curve
      pts.push(Math.round(target * ease));
    }
    const max = pts[pts.length - 1] || 1;
    return `<div class="est-ramp">
      <div class="est-ramp-lbl">Projected organic traffic ramp</div>
      <div class="est-ramp-bars">
        ${pts.map((p, i) => `<div class="est-ramp-col"><i style="height:${Math.max(6, p / max * 100)}%"></i><small>M${i + 1}</small></div>`).join('')}
      </div>
    </div>`;
  }

  // ── read form values ───────────────────────────────────────
  function readForm(root) {
    const v = {};
    root.querySelectorAll('[data-k]').forEach(el => { v[el.dataset.k] = el.value; });
    const feats = [...root.querySelectorAll('[data-feat]:checked')].map(c => c.dataset.feat);
    if (feats.length || root.querySelector('[data-feat]')) v.features = feats;
    const plats = [...root.querySelectorAll('[data-plat]:checked')].map(c => c.dataset.plat);
    if (plats.length || root.querySelector('[data-plat]')) v.platforms = plats;
    return v;
  }

  // animate numbers
  function countUp(el, finalStr) {
    const m = String(finalStr).match(/^([^\d-]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!m) { el.textContent = finalStr; return; }
    const pre = m[1], target = parseFloat(m[2].replace(/,/g, '')), post = m[3];
    const dec = (m[2].split('.')[1] || '').length;
    const dur = 650, t0 = performance.now();
    let done = false;
    function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const val = target * e;
      const shown = dec ? val.toFixed(dec) : Math.round(val).toLocaleString('en-US');
      el.textContent = pre + shown + post;
      if (p < 1) requestAnimationFrame(step);
      else { done = true; el.textContent = finalStr; }
    }
    requestAnimationFrame(step);
    // Safety net: if rAF is throttled (e.g. background tab), still show the result.
    setTimeout(() => { if (!done) el.textContent = finalStr; }, dur + 120);
  }

  /* ─── LEAD MAGNET GATE ─────────────────────────────────────
     The projection is gated behind a name + email capture. Once a
     visitor unlocks it we remember it for the session so they're
     not asked again. Captured leads are stored locally (so they
     work in preview) AND POSTed to the Netlify `leads` function so
     they show up in the dashboard's "Collected emails" tab. */
  const LEADS_KEY = 'wjh_leads';
  const UNLOCK_KEY = 'wjh_lead_ok';
  const LEADS_API = '/.netlify/functions/leads';
  const SERVICE_NAMES = {
    seo: 'SEO projection', content: 'content projection', sem: 'Google Ads projection',
    paid: 'paid social projection', social: 'social growth projection', email: 'email revenue projection',
    webdev: 'web build estimate', wordpress: 'web build estimate', automation: 'automation ROI projection'
  };

  /* The unlock is remembered for the current browser SESSION only, so the
     name + email gate reliably appears for each new visit (new visitors and
     returning visitors in a fresh session always enter details before the
     projection is revealed). Within one session, unlocking once applies to
     every projection so visitors aren't nagged repeatedly. */
  function leadUnlocked() {
    try { return !!sessionStorage.getItem(UNLOCK_KEY); } catch (e) { return false; }
  }
  function setUnlocked(name, email) {
    try { sessionStorage.setItem(UNLOCK_KEY, JSON.stringify({ name: name, email: email, ts: Date.now() })); } catch (e) {}
  }
  function recordLead(lead) {
    const entry = {
      name: lead.name, email: lead.email,
      service: lead.service || '', type: lead.type || '',
      summary: lead.summary || '',
      page: location.pathname + location.search,
      ts: new Date().toISOString()
    };
    // 1) Always persist locally (works in preview + offline).
    try {
      const arr = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
      arr.push(entry);
      localStorage.setItem(LEADS_KEY, JSON.stringify(arr));
    } catch (e) {}
    // 2) Best-effort push to the shared store so it lands in the dashboard.
    try {
      fetch(LEADS_API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(entry),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  function injectGateStyles() {
    if (document.getElementById('est-gate-styles')) return;
    const st = document.createElement('style');
    st.id = 'est-gate-styles';
    st.textContent =
      '.est-gate{text-align:center;padding:6px 4px;animation:fadeUp .4s ease;}' +
      '.est-gate-ico{font-size:30px;line-height:1;margin-bottom:10px;}' +
      '.est-gate-title{font-family:var(--mono);font-size:16px;font-weight:700;color:var(--fg);letter-spacing:-0.01em;}' +
      '.est-gate-sub{font-size:13px;line-height:1.6;color:var(--fg2);margin:8px auto 16px;max-width:330px;}' +
      '.est-gate-teaser{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}' +
      '.est-gate-blur{background:var(--teal-light);border:1px solid var(--border);border-radius:12px;padding:12px;}' +
      '.est-gate-blur span{display:block;font-family:var(--mono);font-size:9.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg3);margin-bottom:4px;}' +
      '.est-gate-blur b{font-size:20px;font-weight:800;color:var(--teal);filter:blur(7px);user-select:none;}' +
      '.est-gate-form{display:flex;flex-direction:column;gap:10px;text-align:left;}' +
      '.est-gate-input{width:100%;font-family:inherit;font-size:14px;padding:11px 13px;border:1.5px solid var(--border);border-radius:10px;background:#fff;color:var(--fg);}' +
      'body.dark .est-gate-input{background:oklch(16% 0.015 240);}' +
      '.est-gate-input:focus{outline:none;border-color:var(--teal);box-shadow:0 0 0 3px var(--teal-light);}' +
      '.est-gate-btn{width:100%;font-family:var(--mono);font-size:13px;font-weight:700;letter-spacing:.02em;background:var(--teal);color:#fff;border:none;border-radius:10px;padding:12px;cursor:pointer;transition:.15s;}' +
      '.est-gate-btn:hover{background:oklch(46% 0.14 195);}' +
      '.est-gate-btn:disabled{opacity:.6;cursor:default;}' +
      '.est-gate-err{color:#c0392b;font-size:12px;min-height:14px;}' +
      '.est-gate-note{font-size:10.5px;color:var(--fg3);line-height:1.5;text-align:center;}';
    document.head.appendChild(st);
  }

  function renderGate(panel, res, key) {
    injectGateStyles();
    panel.classList.remove('empty');
    panel.classList.add('filled');
    const niceName = SERVICE_NAMES[key] || 'projection';
    panel.innerHTML =
      '<div class="est-gate">' +
        '<div class="est-gate-ico">\uD83D\uDCC8</div>' +
        '<div class="est-gate-title">Your projection is ready</div>' +
        '<p class="est-gate-sub">Enter your name &amp; email to unlock your tailored ' + esc(niceName) + ' \u2014 I\u2019ll also send you a copy to keep.</p>' +
        '<div class="est-gate-teaser" aria-hidden="true">' +
          res.stats.slice(0, 2).map(function (s) { return '<div class="est-gate-blur"><span>' + esc(s.lbl) + '</span><b>' + esc(s.num) + '</b></div>'; }).join('') +
        '</div>' +
        '<form class="est-gate-form" novalidate>' +
          '<input class="est-gate-input" name="name" type="text" required placeholder="Your name" autocomplete="name"/>' +
          '<input class="est-gate-input" name="email" type="email" required placeholder="you@company.com" autocomplete="email"/>' +
          '<button class="est-gate-btn" type="submit">Unlock my projection \u2192</button>' +
          '<div class="est-gate-err" role="alert"></div>' +
          '<div class="est-gate-note">No spam \u2014 just your projection and the occasional growth tip. Unsubscribe anytime.</div>' +
        '</form>' +
      '</div>';
    const form = panel.querySelector('.est-gate-form');
    const errEl = form.querySelector('.est-gate-err');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      if (name.length < 2) { errEl.textContent = 'Please enter your name.'; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { errEl.textContent = 'Please enter a valid email address.'; return; }
      const btn = form.querySelector('.est-gate-btn');
      btn.disabled = true; btn.textContent = 'Unlocking\u2026';
      const card = panel.closest('.est-card');
      recordLead({ name: name, email: email, service: key, type: card ? card.dataset.type : '', summary: res.summary });
      setUnlocked(name, email);
      renderResult(panel, res);
    });
  }

  function renderResult(panel, res) {
    panel.classList.remove('empty');
    panel.classList.add('filled');
    panel.innerHTML = `
      <div class="est-result-head"><span class="est-result-title">Your projection</span><span class="est-pill"><i></i>Live estimate</span></div>
      <div class="est-stats">
        ${res.stats.map((s, i) => `<div class="est-stat${i === 0 ? ' lead' : ''}">
          <div class="est-stat-lbl">${esc(s.lbl)}</div>
          <div class="est-stat-num" data-final="${esc(s.num)}">0</div>
          ${s.sub ? `<div class="est-stat-sub">${esc(s.sub)}</div>` : ''}
        </div>`).join('')}
      </div>
      ${res.extra || ''}
      <button class="est-book" type="button">Book a free consultation call <span aria-hidden="true">→</span></button>
      <div class="est-disclaimer">Estimates use industry benchmarks for guidance only — actual results vary with offer, creative &amp; market. Let's pressure-test them together.</div>`;
    panel.querySelectorAll('.est-stat-num').forEach(el => countUp(el, el.dataset.final));
    panel.querySelector('.est-book').addEventListener('click', () => openConsult(res.summary));
  }

  // ── public: build the estimator section for a service ──────
  window.renderEstimator = function (key) {
    const type = ESTIMATOR_TYPE[key];
    if (!type) return '';
    const s = (window.SERVICES && window.SERVICES[key]) || { short: 'this service' };
    // [headline, intro, value-prop kicker, button label]
    const titles = {
      ppc: ['Google Ads Lead & Cost Estimator', "Tell me your budget and market — I'll estimate the clicks, leads, and cost-per-lead you can expect.", 'Stop guessing your ad spend', 'Get my free projection'],
      meta: ['Paid Social Reach & Results Estimator', "Plug in your budget and industry to project reach, results, and ROAS from paid social.", 'Know your numbers first', 'Get my free projection'],
      traffic: ['SEO Traffic & Ranking Estimator', "Enter your niche to see target keywords, estimated monthly traffic, and how long ranking takes.", 'See the traffic before you commit', 'Get my free projection'],
      timeline: ['Web Build Timeline Estimator', 'Scope your build to see how many days to launch — and your target go-live date.', 'Scope it before you build', 'Get my free estimate'],
      email: ['Email Revenue Estimator', 'Estimate the monthly revenue a lifecycle email program could add.', 'Revenue hiding in your list', 'Get my free projection'],
      social: ['Social Growth Estimator', 'Project your monthly reach and follower growth from a consistent organic system.', 'Grow with a system, not luck', 'Get my free projection'],
      automation: ['Automation Time & ROI Estimator', "Tell me what you do manually today — and what you'd like automated — I'll estimate the hours and dollars an AI agent or GHL / Zapier build hands back.", 'Get your hours back', 'Get my free projection']
    };
    const [h, intro, kicker, runLabel] = titles[type];
    return `
      <div class="svc-section est-section">
        <div class="svc-h2-lbl">${kicker}</div>
        <h2 class="svc-h2">${h}</h2>
        <p>${intro} <strong>Free — takes 20 seconds. Unlocks with your name &amp; email so I can send you a copy.</strong></p>
        <div class="est-card" data-type="${type}">
          <form class="est-form" onsubmit="return false">
            ${formFor(type)}
            <button class="est-run" type="button">${runLabel} →</button>
          </form>
          <div class="est-result empty">
            <div class="est-ghost" aria-hidden="true">
              <div class="est-ghost-head"><span class="est-ghost-pill"></span><span class="est-ghost-tag"></span></div>
              <div class="est-ghost-stats">
                <div class="est-ghost-stat lead"><span></span><b></b></div>
                <div class="est-ghost-stat"><span></span><b></b></div>
                <div class="est-ghost-stat"><span></span><b></b></div>
              </div>
              <div class="est-ghost-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div class="est-empty">
              <div class="est-empty-lock" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <p><strong>Your projection appears here.</strong><br/>Fill in the form and hit <strong>${esc(runLabel)}</strong> to reveal your tailored numbers.</p>
            </div>
          </div>
        </div>
      </div>`;
  };

  // ── public: wire up the estimator after it's in the DOM ────
  window.attachEstimator = function (key) {
    const card = document.querySelector('.est-card');
    if (!card) return;
    const type = card.dataset.type;
    const form = card.querySelector('.est-form');
    const panel = card.querySelector('.est-result');

    form.querySelectorAll('.est-range').forEach(r => {
      const out = form.querySelector(`.est-rangeval[data-for="${r.dataset.k}"]`);
      const sync = () => { if (out) out.textContent = r.value; };
      r.addEventListener('input', sync); sync();
    });

    injectCurrencyStyles();
    function runEstimator(scroll) {
      const res = calc(type, readForm(form));
      if (!res) return;
      if (leadUnlocked()) renderResult(panel, res);
      else renderGate(panel, res, key);
      if (scroll && window.matchMedia('(max-width: 880px)').matches) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    form.querySelector('.est-run').addEventListener('click', () => runEstimator(true));

    // Currency picker: rescale money inputs, sync every picker, re-run if shown.
    form.querySelectorAll('.est-cur-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const next = CURRENCIES[sel.value] || CUR;
        const factor = next.rate / CUR.rate;
        form.querySelectorAll('[data-money]').forEach(inp => {
          inp.value = Math.max(1, Math.round((+inp.value || 0) * factor));
        });
        CUR_CODE = sel.value; CUR = next;
        try { localStorage.setItem('wjh_cur', CUR_CODE); } catch (e) {}
        form.querySelectorAll('.est-cur-select').forEach(s => { s.value = CUR_CODE; });
        if (!panel.classList.contains('empty')) runEstimator(false);
      });
    });
  };

  function injectCurrencyStyles() {
    if (document.getElementById('est-cur-styles')) return;
    const st = document.createElement('style');
    st.id = 'est-cur-styles';
    st.textContent =
      ".est-budget .est-cur-select{appearance:none;-webkit-appearance:none;border:none;background:var(--bg2);color:var(--fg2);font-family:var(--mono);font-weight:700;font-size:13px;padding:0 22px 0 12px;border-right:1.5px solid var(--border);cursor:pointer;align-self:stretch;border-radius:0;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cpath d='M1 1l3 3 3-3' stroke='%2390a0b5' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 7px center;}" +
      ".est-budget:focus-within .est-cur-select{color:var(--teal);border-right-color:var(--teal);}" +
      ".est-budget .est-cur-select:focus{outline:none;}";
    document.head.appendChild(st);
  }

  // ── consultation modal ─────────────────────────────────────
  function ensureModal() {
    if (document.getElementById('consult-overlay')) return;
    const div = document.createElement('div');
    div.id = 'consult-overlay';
    div.className = 'consult-overlay';
    div.innerHTML = `
      <div class="consult-modal" role="dialog" aria-modal="true" aria-labelledby="consult-title">
        <button class="consult-close" aria-label="Close" onclick="closeConsult()">✕</button>
        <div class="consult-body">
          <div class="consult-eyebrow">Free 30-min consultation</div>
          <h3 id="consult-title">Let's turn this projection into a plan</h3>
          <p class="consult-lead">No pitch deck — a working session on your specific numbers. I'll reply within 24 hours to lock a time.</p>
          <div class="consult-summary" id="consult-summary"></div>
          <form id="consult-form" action="https://formspree.io/f/xykowgyw" method="POST">
            <input type="hidden" name="_subject" value="New consultation request from wajeeh.dev"/>
            <input type="hidden" name="Projection" id="consult-proj-field" value=""/>
            <div class="consult-row">
              <div class="consult-fg"><label>Name</label><input name="Name" required placeholder="Your name"/></div>
              <div class="consult-fg"><label>Email</label><input type="email" name="Email" required placeholder="you@company.com"/></div>
            </div>
            <div class="consult-row">
              <div class="consult-fg"><label>Company / website</label><input name="Company" placeholder="company.com"/></div>
              <div class="consult-fg"><label>Preferred time</label><input name="Preferred time" placeholder="e.g. weekday mornings PKT"/></div>
            </div>
            <div class="consult-fg"><label>Anything else?</label><textarea name="Message" rows="3" placeholder="A sentence about your goal or current setup…"></textarea></div>
            <button type="submit" class="consult-submit">Request my consultation →</button>
            <div class="consult-alt">Prefer email? <a href="contact.html">Use the contact form</a> instead.</div>
          </form>
          <div class="consult-success" id="consult-success">
            <div class="consult-success-ico">✓</div>
            <h3>Request sent!</h3>
            <p>Thanks — I've got your projection and details. Expect a reply within 24 hours (Mon–Sat, PKT) to lock in a time.</p>
            <button class="consult-submit" onclick="closeConsult()">Done</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(div);
    div.addEventListener('click', e => { if (e.target === div) closeConsult(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeConsult(); });

    const form = div.querySelector('#consult-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.consult-submit');
      btn.textContent = 'Sending…'; btn.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(r => {
          if (r.ok) { showConsultSuccess(); }
          else { btn.textContent = 'Request my consultation →'; btn.disabled = false; alert('Something went wrong — please use the contact form.'); }
        })
        .catch(() => { btn.textContent = 'Request my consultation →'; btn.disabled = false; alert('Network error — please use the contact form.'); });
    });
  }
  function showConsultSuccess() {
    const o = document.getElementById('consult-overlay');
    o.querySelector('#consult-form').style.display = 'none';
    o.querySelector('.consult-summary').style.display = 'none';
    o.querySelector('#consult-success').classList.add('show');
  }

  window.openConsult = function (summary) {
    ensureModal();
    const o = document.getElementById('consult-overlay');
    o.querySelector('#consult-form').style.display = '';
    o.querySelector('.consult-summary').style.display = '';
    o.querySelector('#consult-success').classList.remove('show');
    const sumEl = o.querySelector('#consult-summary');
    if (summary) {
      sumEl.innerHTML = `<span class="consult-summary-lbl">Your estimate</span>${esc(summary)}`;
      sumEl.style.display = '';
      o.querySelector('#consult-proj-field').value = summary;
    } else { sumEl.style.display = 'none'; }
    o.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const f = o.querySelector('input[name="Name"]'); if (f) f.focus(); }, 60);
  };
  window.closeConsult = function () {
    const o = document.getElementById('consult-overlay');
    if (o) o.classList.remove('open');
    document.body.style.overflow = '';
  };
})();
