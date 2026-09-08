/* Shared service catalog — extracted from services.html for nav reuse */
const SERVICES = {
  seo: {
    title: 'Search Engine Optimization',
    short: 'SEO',
    icon: '🔍',
    eyebrow: 'Service · Organic Growth',
    lead: "Win the front page of Google with technical SEO, content strategy, and authority-building. I've ranked SaaS, e-commerce, and local businesses for keywords worth real money.",
    whatYouGet: [
      ['01', 'Technical SEO Audit', "Crawl, indexation, Core Web Vitals, schema, log-file analysis — the boring foundational work that makes everything else compound."],
      ['02', 'Keyword & Topic Strategy', "Map keywords to buyer intent and content stage. Build topical authority around clusters that actually drive revenue."],
      ['03', 'On-Page Optimization', "Title tags, meta, internal linking, content rewrites, schema markup — every page tuned for its target query."],
      ['04', 'Content Briefs & Production', "SEO-first content briefs and editorial production for blog, comparison, and pillar pages that rank and convert."],
      ['05', 'Link Building', "Digital PR, HARO, niche edits, broken link reclaim — earning authority signals from sites that move the needle."],
      ['06', 'Reporting & Forecasting', "Monthly performance reports tied to traffic, leads, and revenue — not vanity metrics like keyword counts."]
    ],
    keywords: [
      ['seo consultant', '14.8K', 'high', 'Commercial'],
      ['technical seo audit', '8.1K', 'med', 'Commercial'],
      ['seo services for small business', '6.6K', 'high', 'Commercial'],
      ['enterprise seo agency', '2.4K', 'high', 'Commercial'],
      ['seo for saas companies', '1.9K', 'med', 'Commercial'],
      ['shopify seo expert', '3.6K', 'med', 'Commercial'],
      ['local seo services', '12.1K', 'high', 'Commercial'],
      ['ecommerce seo agency', '4.4K', 'high', 'Commercial']
    ],
    process: {"title":"How I do SEO","intro":"SEO is a compounding system, not a checklist. Here is the repeatable process I run for every SEO engagement, tuned to your domain authority, niche, and content gaps.","steps":[["Technical Audit & Crawl","I run a deep crawl (Screaming Frog + Sitebulb), pull Search Console data, and analyze log files. The output is a prioritized fix-list — crawl traps, index bloat, broken canonicals, Core Web Vitals — sorted by impact, not by tool severity.",["Screaming Frog","Sitebulb","Search Console","Log files"]],["Keyword & Topic Research","Pull seed keywords from your CRM, sales calls, and competitors. Expand to 1–2K candidates, then SERP-cluster them so one page targets one cluster — avoiding the cannibalization that kills most SEO programs.",["Ahrefs","Semrush","Keyword Insights","AlsoAsked"]],["Intent & Funnel Mapping","Every cluster gets tagged Informational / Commercial / Transactional and mapped to a funnel stage. The 50K-volume terms that do not convert get cut. The 600-volume bottom-funnel queries get prioritized.",["SERP analysis","Intent modifiers","Funnel mapping"]],["On-Page & Schema","Title + meta rewrites, schema markup (Article, FAQ, Product, Local), internal linking, image alt audits. Boring foundational work — but it is what separates a ranking page from a wishful page.",["Schema.org","Rank Math","Internal linking"]],["Content & Authority Building","Editorial briefs with intent, structure, internal links, and entity coverage. Paired with digital PR + niche edits to earn the authority signals Google needs to trust new content.",["SurferSEO","HARO","Digital PR","Brief templates"]],["Measure & Iterate","Looker Studio dashboard tracking traffic + leads per cluster — not vanity keyword counts. Monthly performance calls, quarterly content audits, and yearly site-wide refresh cycles.",["Looker Studio","GA4","Notion roadmap"]]]},
    deliverables: [
      'Full technical SEO audit (50+ checks) with prioritized roadmap',
      'Keyword research deck — 200+ targets mapped to funnel stage',
      'On-page rewrites for top 25 pages',
      'Schema markup deployment (Product, FAQ, Article, LocalBusiness)',
      'Monthly link acquisition (5–10 quality links / month)',
      'Looker Studio dashboard + monthly performance call'
    ],
    next: 'llmseo',
    prev: 'growth'
  },


  llmseo: {
    title: 'LLM SEO / AI Search Optimization',
    short: 'LLM SEO',
    icon: '✨',
    eyebrow: 'Service · AI Search · GEO / AEO',
    lead: "Get cited by ChatGPT, Perplexity, Gemini, and Google's AI Overviews. Your next customer asks an AI — not a search bar. I make sure the answer mentions you: entity-rich content, llms.txt, structured data, and the citation-earning digital PR that AI engines actually pull from.",
    whatYouGet: [
      ['01', 'AI Visibility Audit', "Track how ChatGPT, Perplexity, Gemini, Claude, and AI Overviews answer your money queries today — who gets cited, who gets recommended, and where you're invisible."],
      ['02', 'Entity & Brand Optimization', "Build the entity footprint LLMs trust: consistent NAP, Wikipedia-grade about pages, sameAs schema, Knowledge Graph presence, and brand mentions across the sources models retrieve from."],
      ['03', 'Answer-Ready Content', "Restructure content into extractable answers — direct definitions, comparison tables, FAQs, and stat-rich passages that retrieval systems quote verbatim."],
      ['04', 'Technical AI Readiness', "llms.txt, clean semantic HTML, schema markup (FAQ, HowTo, Product, Organization), crawlability for GPTBot / PerplexityBot / Google-Extended — the plumbing of AI retrieval."],
      ['05', 'Citation-Source Placement', "Get your brand into the sources AI engines cite most — review sites, comparison listicles, Reddit / Quora threads, industry directories, and digital PR placements."],
      ['06', 'AI Share-of-Voice Tracking', "Monthly tracking of your brand's citation rate and sentiment across AI engines vs competitors — the new rank tracking."]
    ],
    keywords: [
      ['llm seo', '2.9K', 'low', 'Commercial'],
      ['generative engine optimization', '4.4K', 'med', 'Commercial'],
      ['ai seo agency', '1.9K', 'med', 'Commercial'],
      ['answer engine optimization', '2.4K', 'low', 'Commercial'],
      ['chatgpt seo optimization', '1.6K', 'low', 'Commercial'],
      ['ai overviews optimization', '1.3K', 'low', 'Commercial'],
      ['perplexity seo', '880', 'low', 'Informational'],
      ['rank in ai search', '720', 'low', 'Informational']
    ],
    process: {"title":"How I do LLM SEO","intro":"AI engines don't rank pages — they retrieve, synthesize, and cite. Winning means being present in what they retrieve, quotable in how they synthesize, and trusted enough to cite. Here is the process I run, engine by engine.","steps":[["AI Visibility Baseline","Run your 50–100 money queries through ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews. Log every brand cited, every source linked, and your current share of voice. This is the scoreboard everything else moves.",["Prompt panels","Peec AI","Otterly","AI Overview tracking"]],["Citation-Source Mapping","Reverse-engineer WHERE each engine pulls answers from for your niche — review sites, listicles, Reddit, docs, news. The output is a placement hit-list ranked by how often each source gets cited.",["Citation analysis","SERP overlap","Source mining"]],["Entity & Trust Foundation","Fix your entity footprint: Organization + sameAs schema, consistent brand facts everywhere, Google Knowledge Panel, Wikidata, Crunchbase, LinkedIn. LLMs recommend brands they can resolve and verify.",["Schema.org","Wikidata","Knowledge Graph","About pages"]],["Answer-Ready Content Engineering","Rewrite key pages into extraction-friendly structures — question-led H2s, 40–60 word direct answers, comparison tables, stats with sources, FAQs. Add llms.txt and clean semantic HTML so bots parse everything.",["llms.txt","FAQ schema","Passage optimization"]],["Off-Site Citation Building","Systematic placement in the sources engines actually cite: niche listicles, review platforms, expert-quote digital PR, high-quality Reddit / Quora presence. This is link building's successor — mention building.",["Digital PR","Listicle outreach","Review platforms","Reddit strategy"]],["Track, Compare, Iterate","Monthly AI share-of-voice report: citation rate, sentiment, and position across engines vs competitors — tied back to referral traffic and assisted conversions from AI surfaces.",["Peec AI","GA4 AI referrals","SOV dashboard"]]]},
    deliverables: [
      'AI visibility audit — your citation share across 5 engines',
      'Entity & schema deployment (Organization, FAQ, sameAs, llms.txt)',
      'Answer-ready rewrites of top 15 pages',
      'Citation-source hit-list + monthly placement outreach',
      'Reddit / Quora / review-platform presence strategy',
      'Monthly AI share-of-voice report vs competitors'
    ],
    next: 'aeo',
    prev: 'seo'
  },

  aeo: {
    title: 'Ask Engine Optimization',
    short: 'AEO',
    icon: '🗣️',
    eyebrow: 'Service · AEO · Answers, Snippets & Voice',
    lead: "Your customers don't search anymore — they ask. Google's answer boxes, People Also Ask, voice assistants, and AI chat all reward one thing: being the clearest answer to the exact question. Ask Engine Optimization puts your business inside the answer itself — position zero, read aloud by Siri and Alexa, quoted before your competitor's link is ever seen.",
    whatYouGet: [
      ['01', 'Question Intelligence', "Mine the exact questions your buyers ask — from People Also Ask, AlsoAsked, forums, support tickets, and sales calls — and rank them by buying intent, not just volume."],
      ['02', 'Featured Snippet Capture', "Reverse-engineer the answer boxes in your niche and rebuild your pages to win them — 40–60 word direct answers, definition blocks, tables, and lists formatted the way Google extracts."],
      ['03', 'People Also Ask Domination', "Own whole PAA clusters, not single snippets — question-led page structures that get your brand into 3–4 related boxes per query."],
      ['04', 'Voice Search Readiness', "Conversational, spoken-answer phrasing plus Speakable and FAQ schema — so Siri, Alexa, and Google Assistant read YOUR answer out loud."],
      ['05', 'Answer Schema Stack', "FAQPage, HowTo, Q&A, and Speakable structured data deployed and validated — the markup layer answer engines use to trust and extract your content."],
      ['06', 'Answer Tracking & Defense', "Monthly tracking of every snippet and PAA box you hold, alerts when a competitor takes one, and refresh cycles that win it back."]
    ],
    keywords: [
      ['answer engine optimization', '2.4K', 'low', 'Commercial'],
      ['featured snippet optimization', '1.8K', 'low', 'Commercial'],
      ['people also ask seo', '1.2K', 'low', 'Informational'],
      ['voice search optimization', '2.7K', 'med', 'Commercial'],
      ['position zero seo', '640', 'low', 'Informational'],
      ['faq schema markup', '1.5K', 'low', 'Informational']
    ],
    process: {"title":"How I win the answer box","intro":"Ten blue links get scrolled past; the answer box gets read. AEO is a capture discipline — find the questions, engineer the extractable answer, mark it up, defend it. Pairs naturally with <a href='services.html?s=llmseo'>LLM SEO</a>: AEO wins the answer boxes and voice results, LLM SEO wins the AI-chat citations.","steps":[["Question Mining","Build the full question map for your niche: People Also Ask trees, AlsoAsked data, Reddit and Quora threads, autocomplete, and the questions your sales team hears every week. Scored by intent and answerability.",["AlsoAsked","PAA scraping","Sales-call mining"]],["Answer Gap Audit","For every high-value question: who owns the snippet today, what format Google is rewarding (paragraph, list, table), and how beatable it is. Output is a ranked capture hit-list.",["SERP analysis","Snippet audit","Priority matrix"]],["Answer Engineering","Rewrite and restructure pages to be extractable: the question as an H2, a direct 40–60 word answer immediately below, then depth. Definition blocks, comparison tables, step lists — formatted for the engine, written for the human.",["Content restructuring","Answer blocks","Tables & lists"]],["Schema Deployment","Layer the markup answer engines rely on — FAQPage, HowTo, Q&A, Speakable — validated in Google's rich results tests and monitored in Search Console.",["FAQ schema","HowTo schema","Speakable","Rich results test"]],["Voice Optimization","Tune top answers for spoken delivery: conversational phrasing, local intent variants ('near me', 'open now'), and business-info consistency so assistants resolve your brand correctly.",["Voice phrasing","Local data","Business profile"]],["Track & Defend","Monthly answer-box report: boxes held, boxes lost, boxes within reach — with refresh cycles that keep your answers the freshest, clearest option on the page.",["Rank tracking","Snippet alerts","Refresh cycle"]]]},
    deliverables: [
      'Question map — every high-intent question in your niche',
      'Snippet & PAA capture hit-list with owner analysis',
      'Answer-engineered rewrites of top 15 pages',
      'Full schema stack: FAQ, HowTo, Q&A, Speakable — validated',
      'Voice-search tuning for top answers',
      'Monthly answer-box tracking & defense report'
    ],
    next: 'sem',
    prev: 'llmseo'
  },

  sem: {
    title: 'Search Engine Marketing',
    short: 'SEM / PPC',
    icon: '🎯',
    eyebrow: 'Service · Paid Search',
    lead: 'Profitable Google Ads from day one. I run lean, intent-driven campaigns that focus on lead quality — not click counts — backed by $10M+ in managed spend.',
    whatYouGet: [
      ['01', 'Account Structure & Audit', "Restructure into tight, intent-aligned ad groups. Surface and kill wasted spend before launching new campaigns."],
      ['02', 'Keyword & Negative Strategy', "Build keyword groups around modifiers that signal intent. Discipline negatives weekly — wasted spend is the silent killer."],
      ['03', 'Ad Copy & Creative', "Headline frameworks tested against your unique value prop. RSAs, sitelinks, callouts — all optimized weekly."],
      ['04', 'Landing Page Optimization', "Match-message-to-keyword landing pages with conversion-focused layouts and aggressive A/B testing."],
      ['05', 'Offline Conversion Tracking', "Feed real lead-quality data back into Google so Smart Bidding optimizes for revenue, not form fills."],
      ['06', 'Performance Max & Shopping', "Asset groups, audience signals, and feed optimization for e-commerce and lead-gen Pmax campaigns."]
    ],
    keywords: [
      ['google ads management', '14.8K', 'high', 'Commercial'],
      ['ppc agency', '8.1K', 'high', 'Commercial'],
      ['google ads expert', '5.4K', 'med', 'Commercial'],
      ['google ads consultant', '4.4K', 'med', 'Commercial'],
      ['performance max specialist', '720', 'low', 'Commercial'],
      ['shopping ads agency', '1.9K', 'med', 'Commercial'],
      ['b2b ppc agency', '880', 'med', 'Commercial'],
      ['google ads for saas', '590', 'low', 'Commercial']
    ],
    process: {"title":"How I run Google Ads","intro":"Most Google Ads accounts waste 30–50% of spend on auctions they should not be entering. My process strips out the waste, then scales what is actually profitable — using offline conversions to bid for revenue, not form fills.","steps":[["Account & Spend Audit","Pull 90 days of data, surface wasted-spend by ad group, search term, and device. Identify low-quality lead sources and confirm conversion tracking is firing accurately before changing anything.",["Google Ads","GA4","Tag Assistant"]],["Restructure & Negatives","Rebuild into tight, intent-aligned ad groups. Layer in a 200+ negative keyword list mined from search-term reports. Most accounts see a 30% CPL drop from this step alone.",["SKAG","STAG","N-gram analysis"]],["Keyword & Match Type Strategy","Modifier-led keyword grouping (buy, near me, vs, alternative, agency). Match-type tiered by intent — exact for proven winners, phrase for expansion, broad only with smart bidding + tight audiences.",["Keyword Planner","Search Terms","Ahrefs"]],["Ads, RSAs & Extensions","Headline frameworks tested in pairs against your unique value prop. Sitelinks, callouts, structured snippets, and image extensions — extensions add ~15% CTR uplift on most accounts.",["RSA pinning","Ad Strength","Asset reports"]],["Landing Page & Offer Match","Message-match between ad copy, landing page H1, and form. Conversion-focused layouts with above-fold proof, trust signals, and friction-stripped forms. A/B tested every 2 weeks.",["Unbounce","Hotjar","VWO"]],["Smart Bidding & Offline Conv.","Import qualified-lead values back via offline conversions so Smart Bidding optimizes for revenue. Weekly bid-strategy reviews + monthly Looker dashboard tied to pipeline value.",["Offline Conv. Import","tCPA / tROAS","Looker Studio"]]]},
    deliverables: [
      'Full account audit with wasted-spend report',
      'Restructured account — campaigns, ad groups, keywords',
      'Landing page recommendations (or build if scoped)',
      'Offline conversion tracking implementation',
      'Weekly optimization + bi-weekly performance call',
      'Custom Looker Studio dashboard'
    ],
    next: 'paid',
    prev: 'aeo'
  },

  paid: {
    title: 'Paid Social Advertising',
    short: 'Meta & Paid Social',
    icon: '📣',
    eyebrow: 'Service · DTC & E-commerce',
    lead: "Scale DTC brands profitably on Meta. $2M+ in managed Meta spend, post-iOS14 measurement frameworks, and creative testing systems that compound.",
    whatYouGet: [
      ['01', 'Account Strategy', "Campaign architecture (CBO vs ABO, ASC, manual) tailored to your AOV, margin, and creative volume."],
      ['02', 'Creative Testing System', "50+ ads per week pipeline — hook variations, angle testing, UGC briefs, and statistical winner identification."],
      ['03', 'Audience Strategy', "Custom audiences, lookalikes, broad targeting tests, and post-iOS14 signal-loss workarounds."],
      ['04', 'Measurement Setup', "CAPI, post-purchase surveys (Triple Whale / KnoCommerce), and incrementality testing for true ROAS."],
      ['05', 'Daily Optimization', 'Budget shifts, kill decisions, scaling protocols — managed daily, not "set and forget".'],
      ['06', 'Creative Briefs', "Weekly creative briefs based on what's working — feeding your in-house team or my creators."]
    ],
    keywords: [
      ['meta ads agency', '4.4K', 'high', 'Commercial'],
      ['facebook ads expert', '6.6K', 'high', 'Commercial'],
      ['ecommerce facebook ads', '2.9K', 'med', 'Commercial'],
      ['dtc facebook ads agency', '720', 'med', 'Commercial'],
      ['meta ads consultant', '1.6K', 'med', 'Commercial'],
      ['instagram ads agency', '3.6K', 'high', 'Commercial'],
      ['tiktok ads agency', '5.4K', 'high', 'Commercial'],
      ['paid social agency', '2.4K', 'med', 'Commercial']
    ],
    process: {"title":"How I scale Meta Ads","intro":"Meta Ads is a creative problem, not a targeting problem. My system is built to test 50+ creative variations a month, identify statistical winners fast, and scale them before they fatigue.","steps":[["Pixel & CAPI Setup","Audit the pixel for duplicate events, then layer in Conversions API (server-side) for post-iOS14 signal recovery. Most accounts I take over recover 15–25% of attributed conversions in week one.",["Meta CAPI","Stape.io","Tag Manager"]],["Account Architecture","Choose between CBO, ABO, and ASC based on AOV, creative volume, and budget. Most DTC brands $5K–$200K/mo run a hybrid — ASC for cold prospecting, manual for retargeting.",["CBO/ABO","ASC","Advantage+"]],["Audience & Signal Strategy","Broad targeting with strong CAPI + creative signals beats hyper-targeting in 2025. Lookalikes built from purchase value, custom audiences from high-LTV cohorts, exclusions to prevent overlap.",["Value-based LAL","Custom Audiences","Audience overlap"]],["Creative Testing System","50+ ads/week pipeline — hook variations, angle tests, UGC briefs, static vs video. Statistical significance testing so we kill losers fast and scale winners before they fatigue.",["Motion","Foreplay","UGC briefs","Ad library"]],["Scaling & Budget Protocols","Strict 20% / 72h budget rules to prevent learning-phase resets. Dayparting by post-purchase survey insights. Vertical scaling on winners, horizontal scaling on creative diversity.",["Budget rules","Dayparting","MMM-lite"]],["Incrementality & Reporting","Triple Whale + post-purchase surveys (KnoCommerce) to validate Meta reported ROAS against actual incremental revenue. Weekly performance call + creative-diagnostic Looker dashboard.",["Triple Whale","KnoCommerce","Northbeam"]]]},
    deliverables: [
      'Account audit + restructure recommendation',
      'Weekly creative testing pipeline (volume scales with budget)',
      'CAPI + Triple Whale (or equivalent) implementation',
      'Audience strategy doc + custom audiences setup',
      'Daily management + weekly performance call',
      'Creative briefs based on top-performers'
    ],
    next: 'social',
    prev: 'sem'
  },

  social: {
    title: 'Social Media Marketing',
    short: 'Organic Social',
    icon: '💬',
    eyebrow: 'Service · Brand & Community',
    lead: "Build a brand that compounds. Organic social strategy, content calendars, and community management that turn followers into customers — and customers into advocates.",
    whatYouGet: [
      ['01', 'Channel Strategy', "Pick the right platforms for your audience and content gravity. Not every brand needs to be on every channel."],
      ['02', 'Content Calendar', "Monthly editorial calendar with pillars, formats, and posting cadence built around what actually engages your audience."],
      ['03', 'Short-Form Video', "TikTok, Reels, and Shorts strategy. Hooks, scripts, and edit guidelines that match each platform's native feel."],
      ['04', 'Community Management', "Comment replies, DMs, UGC reposts — the engagement that platforms reward and audiences remember."],
      ['05', 'Influencer Partnerships', "Sourcing, briefing, and managing creator partnerships — from $50 nano-creators to mid-tier campaigns."],
      ['06', 'Analytics & Iteration', "Monthly reporting on what's working, what's flat, and where to double down next month."]
    ],
    keywords: [
      ['social media marketing agency', '22K', 'high', 'Commercial'],
      ['social media manager freelance', '8.1K', 'med', 'Commercial'],
      ['instagram growth agency', '3.6K', 'med', 'Commercial'],
      ['tiktok content agency', '2.9K', 'med', 'Commercial'],
      ['linkedin content strategy', '1.9K', 'low', 'Informational'],
      ['social media for small business', '12.1K', 'high', 'Commercial'],
      ['ugc creator agency', '4.4K', 'med', 'Commercial'],
      ['short form video agency', '1.6K', 'med', 'Commercial']
    ],
    process: {"title":"How I plan organic social","intro":"Organic social only compounds with a system. Random posting and trend-chasing is how brands burn out their team without building any equity. Here is the process I use for sustainable, brand-building social.","steps":[["Audience & Brand Discovery","Interview 5–10 customers, mine reviews and DMs, and study competitor comment sections. The goal: surface the exact phrases your audience uses — then write content that mirrors it back.",["Customer interviews","Review mining","Comment scraping"]],["Content Pillar Definition","Define 3–5 content pillars tied to your brand promise — typically Educate, Entertain, Validate, Aspire, Convert. Every post must fit a pillar, or it does not ship.",["Pillar framework","Brand voice doc"]],["Format & Platform Mapping","Pick formats that fit the platform: short-form video for TikTok / Reels, carousels for LinkedIn / Instagram, threads for X. One core asset → 3–5 platform-native cuts.",["Native format strategy","Repurposing matrix"]],["Editorial Calendar","Monthly calendar with posts mapped to pillars, formats, and cadence. Built in Notion or Airtable so the team has clear visibility — and we never miss a launch or seasonal moment.",["Notion","Airtable","Later","Buffer"]],["Production & Community","Briefs for designers + creators, batch shoots for short-form, scheduled publishing, and a daily community-management SOP. Engagement done right earns algorithmic reach and customer love.",["CapCut","Canva","UGC briefs","DM workflow"]],["Analytics & Iteration","Monthly review of top-performing posts by save / share / reach (not likes). Double down on what works, kill what does not, and pivot quarterly. Save-rate is the leading indicator of compounding reach.",["Native analytics","Saved-content audit","Sprout Social"]]]},
    deliverables: [
      'Channel audit + recommendation per platform',
      'Monthly editorial calendar (8–20 posts depending on tier)',
      'Short-form video scripts + edit guidelines',
      'Community management SOP',
      'Monthly analytics report with next-month strategy',
      'Quarterly content audit + pivot recommendations'
    ],
    next: 'content',
    prev: 'paid'
  },

  content: {
    title: 'Content & Copywriting',
    short: 'Content Marketing',
    icon: '✍️',
    eyebrow: 'Service · Words That Convert',
    lead: "SEO-driven content that ranks and copy that converts. From pillar pages to product descriptions to email sequences — words wired to your funnel.",
    whatYouGet: [
      ['01', 'Content Strategy', "Map content to buyer journey stages. Build editorial pillars that reinforce topical authority and feed your funnel."],
      ['02', 'SEO Briefs', "Detailed briefs with target keyword, intent, competitors, structure, and links — so writers ship faster, ranked content."],
      ['03', 'Pillar Pages & Long-Form', "Definitive guides built to be linked to, referenced, and ranked for years. The compounding assets of content marketing."],
      ['04', 'Product & Sales Pages', "PAS, AIDA, and proof-led frameworks. Copy that handles objections and shortens the buying decision."],
      ['05', 'Email Sequences', "Welcome, nurture, abandon-cart, post-purchase, and re-engagement sequences. Words that work while you sleep."],
      ['06', 'Editorial Operations', "Brief-to-publish workflow, brand voice docs, style guides, and review systems that scale content quality."]
    ],
    keywords: [
      ['seo content writing services', '6.6K', 'med', 'Commercial'],
      ['content marketing agency', '14.8K', 'high', 'Commercial'],
      ['saas content writer', '2.4K', 'med', 'Commercial'],
      ['copywriter for hire', '5.4K', 'high', 'Commercial'],
      ['landing page copywriter', '2.9K', 'med', 'Commercial'],
      ['email copywriter', '4.4K', 'med', 'Commercial'],
      ['blog writing services', '8.1K', 'high', 'Commercial'],
      ['conversion copywriting', '1.9K', 'med', 'Commercial']
    ],
    process: {"title":"How I plan & produce content","intro":"Content marketing fails when it is written for vibes instead of for a job. Every piece in my system has a target keyword, a buyer-journey stage, a primary CTA, and a measurable success metric — before a single word gets written.","steps":[["Audience Job Mapping","Define the audience by the job they hire content to do — answer a question, evaluate options, justify a purchase, learn a skill. This is the foundation for everything that follows.",["JTBD framework","Buyer journey map"]],["Topic & Cluster Strategy","Build topic clusters around your money topics. Each cluster has 1 pillar page + 5–15 supporting articles, internally linked. This is how you earn topical authority instead of one-off rankings.",["Topic clusters","Pillar pages","Internal linking"]],["SEO-First Briefs","Every brief includes target keyword, intent, SERP analysis, entities to cover, headline angle, and a CTA strategy. Writers ship faster — and the work ranks because it is engineered to.",["Frase","SurferSEO","Manual SERP audit"]],["Production Workflow","Brief → outline → draft → SEO review → editorial review → publish. Each gate has a checklist. Built in Notion or Asana with assigned owners and dates — no piece slips because of ownership confusion.",["Notion","Asana","Brief templates"]],["Conversion Layer","Every long-form piece has a primary CTA mapped to journey stage. Awareness → newsletter. Consideration → comparison guide or template. Decision → demo, trial, or sales call.",["Content upgrades","CTA frameworks","Email captures"]],["Distribution & Refresh","Publishing is the start, not the end. Newsletter, social cuts, sales-team enablement, and a 90-day refresh cycle to update top-performers — refreshes typically lift traffic 20–40%.",["Newsletter","Sales enablement","Refresh cadence"]]]},
    deliverables: [
      'Content strategy doc + 90-day editorial calendar',
      'Pillar page or comparison page (2,500+ words)',
      'Monthly blog production (4–8 posts)',
      'Sales/landing page copy (1–3 pages)',
      'Email sequence (5–10 emails)',
      'Brand voice + style guide'
    ],
    next: 'email',
    prev: 'social'
  },

  email: {
    title: 'Email Marketing',
    short: 'Lifecycle Email',
    icon: '📧',
    eyebrow: 'Service · Owned Channel',
    lead: 'Build a list that prints money. Lifecycle email + SMS flows, broadcast campaigns, and segmentation that turns "subscribers" into recurring revenue.',
    whatYouGet: [
      ['01', 'Klaviyo / HubSpot Setup', "Account architecture, list hygiene, deliverability, and segmentation foundation. Done once, used forever."],
      ['02', 'Core Flow Builds', "Welcome, abandoned cart, browse abandon, post-purchase, win-back, and replenishment flows."],
      ['03', 'Campaign Calendar', "Weekly broadcast strategy — promotional + educational mix tied to product launches and seasonality."],
      ['04', 'Segmentation Strategy', "RFM segments, behavioral triggers, and predictive segments that change list size, frequency, and message."],
      ['05', 'A/B Testing System', "Subject lines, send times, content blocks, and CTA tests with statistical rigor — not vibes."],
      ['06', 'Deliverability & Reporting', "Inbox placement, list hygiene, monthly performance reporting tied to revenue per subscriber."]
    ],
    keywords: [
      ['klaviyo agency', '4.4K', 'high', 'Commercial'],
      ['email marketing agency', '14.8K', 'high', 'Commercial'],
      ['email automation expert', '2.9K', 'med', 'Commercial'],
      ['shopify email marketing', '3.6K', 'med', 'Commercial'],
      ['email marketing consultant', '5.4K', 'med', 'Commercial'],
      ['hubspot email expert', '1.6K', 'med', 'Commercial'],
      ['lifecycle marketing agency', '880', 'low', 'Commercial'],
      ['sms marketing agency', '6.6K', 'high', 'Commercial']
    ],
    process: {"title":"How I build email programs","intro":"Email is the highest-ROI channel — when the foundations are right. I build sender reputation, segmentation, and lifecycle flows in that order, before touching campaign volume or fancy automations.","steps":[["Deliverability & List Hygiene","Set up SPF, DKIM, DMARC, warm IPs, and a re-engagement / sunset flow to clean inactive subs. Inbox placement matters more than open rates — and most senders skip this step.",["MailTester","Postmaster Tools","GlockApps"]],["Segmentation Foundation","Build RFM segments, behavioral segments (browsed, abandoned, repeat), and predictive ones (high-LTV, churn risk). Every campaign goes to a segment — never to all subscribers.",["Klaviyo","HubSpot","RFM matrix"]],["Core Flow Builds","Welcome series, abandoned cart, browse abandon, post-purchase, win-back, replenishment. 6–8 flows typically drive 40–60% of total email revenue for DTC brands.",["Klaviyo flows","HubSpot workflows"]],["Campaign Calendar","Weekly broadcast schedule mixing promotion, education, and brand storytelling. Tied to launches, seasonality, and a content calendar so email never feels disconnected from the brand.",["Editorial calendar","Campaign briefs"]],["Testing & Optimization","Subject line tests, send-time optimization, content-block A/Bs — all with statistical rigor, not vibes. Quarterly send-cadence experiments to find your audience true tolerance.",["A/B framework","Subject line testing","Send-time tests"]],["Reporting & Forecasting","Monthly reports on revenue per subscriber, list growth, deliverability, and revenue contribution. Plus an annual forecast model so finance and marketing align on email role in revenue.",["Klaviyo dashboards","Looker","RPS metric"]]]},
    deliverables: [
      'Klaviyo / HubSpot audit + setup',
      'Core flow build (6 flows minimum)',
      'Weekly broadcast campaigns',
      'Segmentation strategy doc',
      'A/B testing roadmap',
      'Monthly performance report'
    ],
    next: 'webdev',
    prev: 'content'
  },

  webdev: {
    title: 'Web Development',
    short: 'Full Stack',
    icon: '🌐',
    eyebrow: 'Service · Build & Ship',
    lead: 'Fast, SEO-friendly websites built to convert. Next.js, WordPress, Shopify — choosing the right tool, not the trendiest one.',
    whatYouGet: [
      ['01', 'Stack Selection', "Match the tech to your team and budget. Headless when it earns its keep — WordPress or Shopify when it doesn't."],
      ['02', 'Design-to-Code', "Pixel-faithful builds from Figma. Accessibility, animations, and motion details that don't ship as afterthoughts."],
      ['03', 'Performance Engineering', "Lighthouse 95+ as a baseline. Edge caching, image optimization, and bundle discipline."],
      ['04', 'SEO-First Architecture', "Sitemaps, schema, ISR/SSR strategy, and content modeling that supports SEO ambitions from day one."],
      ['05', 'CMS & Content Modeling', "Sanity, Contentful, WordPress, or Shopify — modeled so editors can ship without breaking pages."],
      ['06', 'Launch & Handoff', "Pre-launch QA checklist, analytics setup, training videos, and 30-day post-launch support."]
    ],
    keywords: [
      ['full stack developer', '60K', 'high', 'Commercial'],
      ['next.js developer for hire', '2.4K', 'med', 'Commercial'],
      ['shopify developer', '14.8K', 'high', 'Commercial'],
      ['headless ecommerce developer', '1.6K', 'med', 'Commercial'],
      ['wordpress developer freelance', '8.1K', 'high', 'Commercial'],
      ['custom website development', '5.4K', 'high', 'Commercial'],
      ['react developer freelance', '12.1K', 'high', 'Commercial'],
      ['jamstack developer', '2.9K', 'med', 'Commercial']
    ],
    process: {"title":"How I scope & build","intro":"Most web projects fail in scoping, not in code. I spend the first week aligning on the right stack, the right scope, and the right success metrics — so the build is predictable and the launch is not a fire drill.","steps":[["Discovery & Stack Selection","Workshop with stakeholders to align on goals, content patterns, integrations, and team capabilities. Then pick the stack — Next.js, Webflow, Shopify, WordPress — based on fit, not trends.",["Stakeholder workshop","Tech-fit scorecard"]],["Architecture & Content Model","Sitemap, URL structure, content model, and integration spec. This is where SEO, CMS-editing UX, and developer experience all need to agree — usually with some hard tradeoffs.",["Sitemap","Content model","Sanity / Contentful"]],["Design-to-Code","Pixel-faithful builds from Figma with motion details, accessibility (WCAG 2.1 AA), and responsive logic. Component-driven so the design system actually compounds across the site.",["Figma","Tailwind","Storybook","React"]],["Performance Engineering","Lighthouse 95+ as a baseline. Image optimization (AVIF + responsive), font subsetting, edge caching, bundle splitting, and a performance budget enforced in CI. Speed compounds with SEO.",["Vercel Edge","Cloudinary","Bundle analysis"]],["SEO & Tracking Setup","Sitemap, robots.txt, schema, redirects, meta defaults, Open Graph, GA4, Search Console, GTM, and CAPI. Set up before launch — never after.",["GA4","GTM","Search Console","Schema"]],["QA, Launch & Handoff","Pre-launch checklist (50+ items), staging review, redirect verification, training videos for editors, and 30-day post-launch monitoring + bug fixes baked into the contract.",["QA checklist","Staging review","Loom training"]]]},
    deliverables: [
      'Discovery + technical scoping doc',
      'Full design-to-code build',
      'CMS setup + content modeling',
      'Analytics + Search Console setup',
      'Lighthouse 95+ scores across all pages',
      '30 days of post-launch support'
    ],
    next: 'wordpress',
    prev: 'email'
  },

  wordpress: {
    title: 'WordPress Design & Development',
    short: 'WordPress',
    icon: '🔷',
    eyebrow: 'Service · CMS · Speed',
    lead: 'WordPress sites that are fast, secure, and easy to edit. Custom themes, page-builder rebuilds, and the speed work that 90% of WP sites need.',
    whatYouGet: [
      ['01', 'Theme Build or Migration', "Custom theme from scratch, or rebuild your bloated page-builder mess into something you can actually maintain."],
      ['02', 'Performance Optimization', "Caching, image optimization, database cleanup, and PHP-level work. Most WP sites can drop LCP by 60%+."],
      ['03', 'WooCommerce Builds', "Custom Woo storefronts, checkout optimization, and integrations (shipping, payments, inventory)."],
      ['04', 'Security & Hardening', "Updates strategy, WAF, brute-force protection, and the boring hygiene that prevents 3 AM hack calls."],
      ['05', 'SEO Foundation', "Yoast/RankMath setup, schema, sitemap, and the page-template patterns that make SEO actually work on WP."],
      ['06', 'Ongoing Care Plans', "Monthly updates, backups, security monitoring, and minor edits — kept under $200/month."]
    ],
    keywords: [
      ['wordpress developer', '74K', 'high', 'Commercial'],
      ['woocommerce developer', '8.1K', 'high', 'Commercial'],
      ['wordpress speed optimization', '5.4K', 'med', 'Commercial'],
      ['custom wordpress theme developer', '2.9K', 'med', 'Commercial'],
      ['wordpress maintenance services', '4.4K', 'high', 'Commercial'],
      ['elementor expert', '12.1K', 'high', 'Commercial'],
      ['wordpress to webflow migration', '720', 'low', 'Commercial'],
      ['wordpress security expert', '1.9K', 'med', 'Commercial']
    ],
    process: {"title":"How I rebuild WordPress sites","intro":"Most WordPress sites are slow, bloated, and a pain to edit — because they were built once and never maintained. My process either rebuilds cleanly or surgically optimizes — without losing the content team workflow.","steps":[["Audit & Plugin Cleanup","Most WP sites I inherit have 30+ plugins, half not updated in a year. I audit, consolidate, replace bloated plugins with lightweight alternatives, and document what is left.",["Plugin audit","Query Monitor","New Relic"]],["Theme Decision","Decide between a custom theme rebuild, a refactor of the existing theme, or a page-builder migration (Elementor → Bricks, etc). The right choice depends on edit-team skills + budget.",["Custom theme","Bricks","GeneratePress","Elementor"]],["Speed & Core Web Vitals","Caching layer (Cloudflare + LiteSpeed or WP Rocket), image optimization (Imagify, AVIF), database optimization, font subsetting, and JS deferral. Typical LCP drop: 60–70%.",["WP Rocket","Cloudflare APO","Imagify","Asset CleanUp"]],["WooCommerce / Funnel Work","For e-commerce: checkout optimization, cart drawer, abandoned-cart flow, payment gateway diversification, and on-page conversion testing. Mobile checkout gets special attention.",["WooCommerce","CartFlows","FunnelKit"]],["Security & Backups","WAF (Cloudflare or Wordfence), brute-force protection, file integrity monitoring, off-site backups, and SSO + 2FA for editors. Boring — but stops the 3 AM hack calls.",["Cloudflare WAF","Wordfence","UpdraftPlus"]],["Handoff & Care Plan","Editor training videos, a documented style + plugin spec, and an optional monthly care plan covering updates, backups, security monitoring, and small edits — typically under $200/mo.",["Loom training","Care plan SOP","Monthly reports"]]]},
    deliverables: [
      'Discovery + design alignment',
      'Custom theme or page-builder build',
      'Performance optimization pass (Lighthouse 90+)',
      'Plugin audit + replacements',
      'Schema, sitemap, and SEO basics setup',
      'Training video + care plan (optional)'
    ],
    next: 'automation',
    prev: 'webdev'
  },

  automation: {
    title: 'Automation & AI Agents',
    short: 'Automation',
    icon: '🤖',
    eyebrow: 'Service · AI & Systems',
    lead: "Stop doing manually what software can do at 3 AM. AI agents, GoHighLevel, and Zapier-to-CRM pipelines that capture, qualify, and follow up with every lead — automatically.",
    whatYouGet: [
      ['01', 'AI Agent Builds', "Chat and voice agents trained on your business data — qualifying leads, booking appointments, and answering FAQs 24/7 with human handoff rules."],
      ['02', 'GoHighLevel Setup', "Full GHL build-out: pipelines, calendars, funnels, workflows, and snapshots — one platform running your whole client journey."],
      ['03', 'Zapier / Make Integrations', "Connect forms, ad platforms, sheets, and tools to your CRM — with error handling and retries, not fragile one-off zaps."],
      ['04', 'CRM Automation', "Lead routing, scoring, deal-stage triggers, and follow-up sequences — so no lead sits untouched for more than 5 minutes."],
      ['05', 'Email & SMS Sequences', "Automated nurture, appointment reminders, review requests, and win-back flows triggered by real behavior."],
      ['06', 'Dashboards & Alerts', "Live reporting plus Slack / email alerts when an automation fails or a hot lead lands — nothing falls through silently."]
    ],
    keywords: [
      ['ai automation agency', '8.1K', 'high', 'Commercial'],
      ['gohighlevel expert', '4.4K', 'med', 'Commercial'],
      ['marketing automation consultant', '2.9K', 'med', 'Commercial'],
      ['zapier consultant', '2.4K', 'med', 'Commercial'],
      ['ai agents for business', '12.1K', 'high', 'Informational'],
      ['crm automation services', '1.9K', 'med', 'Commercial'],
      ['make.com expert', '1.3K', 'low', 'Commercial'],
      ['ghl funnel builder', '880', 'low', 'Commercial']
    ],
    process: {"title":"How I build automation systems","intro":"Automation fails when you automate a broken process. I map the manual workflow first, fix it on paper, then build it — with error handling, monitoring, and a human-handoff path for everything AI touches.","steps":[["Process Mapping & Audit","Record how leads and tasks actually flow through your business today — every form, sheet, DM, and sticky note. Rank each manual step by hours lost and revenue leaked to pick what gets automated first.",["Process map","Loom walkthroughs","ROI ranking"]],["Stack Selection","GoHighLevel when you want one platform for CRM + funnels + comms; Zapier or Make for connecting your existing tools; n8n for self-hosted control. Picked by fit and monthly cost — not by hype.",["GoHighLevel","Zapier","Make","n8n"]],["CRM & Data Foundation","Clean fields, pipelines, dedup rules, and lead-source tracking before anything gets automated. Garbage in at scale is still garbage — just faster.",["GHL CRM","HubSpot","Field mapping"]],["Workflow & Integration Builds","Triggers, conditions, branching paths, and retries. Forms → CRM → assignment → follow-up, ad leads → instant SMS, invoices → bookkeeping — each tested against edge cases before going live.",["Webhooks","API calls","Zapier paths","GHL workflows"]],["AI Agent Training","Prompting, knowledge-base ingestion, guardrails, and human-handoff rules. The agent answers what it knows, escalates what it doesn't, and never improvises pricing or promises.",["Claude / GPT","Voice AI","Knowledge base","Guardrails"]],["Testing, Handoff & Monitoring","Edge-case QA, documentation, training video for your team, and failure alerts to Slack or email. You'll know an automation broke before your customers do.",["QA matrix","Loom training","Error alerts"]]]},
    deliverables: [
      'Automation audit + process map of your manual workflows',
      'GoHighLevel setup — pipelines, calendars, funnels, snapshots',
      'Workflow builds with error handling (scope-dependent volume)',
      'AI agent (chat or voice) trained on your business data',
      'Zapier / Make integrations wired into your CRM',
      'Documentation, training video + 30 days of monitoring'
    ],
    next: 'seo',
    prev: 'wordpress'
  },

  performance: {
    title: 'Performance Marketing',
    short: 'Performance Marketing',
    icon: '📊',
    eyebrow: 'Service · Paid Growth',
    lead: "Channel-agnostic paid growth built around one number that matters to you — CAC, ROAS, or cost-per-lead. I run Google, Meta, and the rest as one P&L, not siloed campaigns, backed by $12M+ in managed spend.",
    whatYouGet: [
      ['01', 'Full-Funnel Account Strategy', "One growth model across search, social, and shopping — budgets allocated to marginal ROAS, not last-click vanity, so every dollar chases incremental revenue."],
      ['02', 'Tracking & Attribution', "Server-side tracking (GA4 + CAPI), offline-conversion import, and a blended-ROAS view so you trust the numbers you're scaling on."],
      ['03', 'Creative & Offer Testing', "A structured testing pipeline — hooks, angles, and offers — with statistical winners feeding budget, not gut feel."],
      ['04', 'Landing & Funnel CRO', "Match-message landing pages and funnel CRO so the traffic you pay for actually converts — not just clicks."],
      ['05', 'Scaling & Budget Pacing', "Daily pacing, scaling protocols, and kill rules that grow spend without blowing up CAC the moment you push budget."],
      ['06', 'Revenue Reporting', "A live dashboard tying spend to pipeline and revenue — weekly optimization calls, monthly strategy reviews, zero vanity metrics."]
    ],
    keywords: [
      ['performance marketing agency', '9.9K', 'high', 'Commercial'],
      ['performance marketing consultant', '3.6K', 'med', 'Commercial'],
      ['paid media specialist', '2.4K', 'med', 'Commercial'],
      ['roas optimization', '1.6K', 'med', 'Commercial'],
      ['growth marketing agency', '6.6K', 'high', 'Commercial'],
      ['customer acquisition agency', '1.3K', 'med', 'Commercial'],
      ['ppc and paid social management', '880', 'low', 'Commercial'],
      ['blended roas strategy', '590', 'low', 'Informational']
    ],
    process: {"title":"How I run performance marketing","intro":"Performance marketing breaks when channels are managed in silos chasing their own last-click ROAS. I run every channel against one blended growth model — so budget flows to whatever drives the next profitable customer, wherever that happens.","steps":[["Growth Model & Targets","Build a blended-economics model — CAC, LTV, payback, contribution margin — and set the single north-star number every channel is accountable to. No more channel teams optimizing against each other.",["Blended ROAS","CAC / LTV model","Contribution margin"]],["Measurement Foundation","Server-side GA4 + CAPI, offline-conversion import, and UTM discipline so the data you scale on reflects real revenue — not platform-inflated, double-counted conversions.",["GA4","Server-side CAPI","Offline conv.","UTM governance"]],["Channel & Budget Allocation","Allocate spend to marginal return, not historical habit. Search captures demand, social creates it, shopping scales it — each funded to the point where the next dollar still pays back.",["Google Ads","Meta","Demand Gen","Pmax"]],["Creative & Offer Engine","A weekly testing pipeline of hooks, angles, and offers. Winners are decided on statistical lift, then scaled; losers are killed fast. Creative is the real targeting lever now.",["Hook testing","UGC briefs","Offer tests","Ad library"]],["Funnel & Landing CRO","Message-match between ad, landing page, and offer. Funnel-level CRO — not just button colors — so paid traffic converts at a rate that makes scaling profitable.",["Unbounce","Hotjar","A/B testing"]],["Scale, Pace & Report","Daily budget pacing, scaling protocols, and kill rules. A live Looker dashboard tying spend → pipeline → revenue, with weekly optimization calls and monthly strategy reviews.",["Looker Studio","Pacing rules","tROAS / tCPA"]]]},
    deliverables: [
      'Blended growth model — CAC, LTV, payback, target ROAS',
      'Server-side tracking + offline-conversion implementation',
      'Cross-channel campaign build (search, social, shopping)',
      'Weekly creative + offer testing pipeline',
      'Landing page / funnel CRO recommendations (or build if scoped)',
      'Live revenue dashboard + weekly optimization call'
    ],
    next: 'social',
    prev: 'paid'
  },

  scratch: {
    title: 'Scratch to Sales',
    short: 'Scratch to Sales',
    icon: '🚀',
    eyebrow: 'Service · Full Funnel · Done-For-You',
    lead: "A complete done-for-you growth engine — from a blank page to paying customers. Planning, development, funnel build, launch, and scaling, owned end-to-end by one person who's accountable for the sales, not just the deliverables.",
    whatYouGet: [
      ['01', 'Strategy & Planning', "Offer, positioning, ICP, pricing, and a go-to-market plan with a clear revenue model — the foundation everything else is built on, locked before a line of code."],
      ['02', 'Design & Development', "The site, landing pages, and assets — fast, conversion-first, and built on a modern stack. Real build, not a template wrestled into shape."],
      ['03', 'Customer Funnel Setup', "Lead capture, nurture, CRM, booking, and follow-up automation wired end-to-end so every lead is captured, tracked, and worked — nothing falls through."],
      ['04', 'Launch', "Tracking verified, ads live, sequences armed, analytics watching. A coordinated launch where every part talks to every other part from day one."],
      ['05', 'Scaling', "Once it converts, we pour fuel on it — scaling spend, expanding channels, and tightening the funnel against real data, not guesses."],
      ['06', 'One Accountable Owner', "Strategy, build, ads, and automation under one roof. No agency hand-offs, no 'that's not our scope' — one person owns the number from zero to scale."]
    ],
    keywords: [
      ['done for you sales funnel', '4.4K', 'high', 'Commercial'],
      ['go to market consultant', '2.9K', 'med', 'Commercial'],
      ['startup growth consultant', '3.6K', 'high', 'Commercial'],
      ['full funnel marketing agency', '1.9K', 'med', 'Commercial'],
      ['launch a business online', '8.1K', 'high', 'Informational'],
      ['sales funnel builder', '12.1K', 'high', 'Commercial'],
      ['fractional growth lead', '720', 'low', 'Commercial'],
      ['build and scale a funnel', '590', 'low', 'Informational']
    ],
    process: {"title":"How I take you from scratch to sales","intro":"Most launches fail because strategy, build, traffic, and follow-up are owned by four different people who never talk. I run all four as one phased system — so what gets built matches the plan, the traffic matches the funnel, and the whole thing is accountable to revenue.","steps":[["Plan — Strategy & GTM","Nail the offer, ICP, positioning, pricing, and revenue model. Map the customer journey from first touch to closed sale and define the metrics we'll launch and scale against.",["Offer design","ICP & positioning","GTM plan","Revenue model"]],["Build — Design & Development","Design and build the site, landing pages, and assets on a fast, modern, conversion-first stack. Built around the funnel from the plan — not a generic template forced to fit.",["Next.js / modern stack","Conversion-first UX","Copy + design"]],["Connect — Customer Funnel Setup","Wire lead capture, CRM, nurture sequences, booking, and follow-up automation end-to-end. Every lead is captured, scored, and worked — with instant response and zero manual entry.",["GoHighLevel","CRM + pipelines","Email / SMS flows","Booking"]],["Launch — Go Live","Verify tracking, arm sequences, push ads live, and watch analytics from minute one. A coordinated launch where ads, funnel, and automation are tested together before traffic hits.",["Tracking QA","Ad launch","Analytics","Go-live checklist"]],["Scale — Pour Fuel On It","Once the funnel converts profitably, scale spend, expand channels, and tighten conversion against real data — compounding what works instead of chasing new shiny tactics.",["Budget scaling","Channel expansion","Funnel CRO"]],["Own — One Accountable Lead","Throughout, one person owns strategy, build, traffic, and automation — and the revenue number. No hand-offs, no finger-pointing, no scope gaps between vendors.",["Single owner","Weekly reporting","Revenue accountability"]]]},
    deliverables: [
      'Go-to-market strategy — offer, ICP, positioning, pricing, revenue model',
      'Designed & developed site + conversion-first landing pages',
      'Full customer funnel — CRM, nurture, booking, follow-up automation',
      'Coordinated launch with verified tracking & live analytics',
      'Scaling plan — paid channels, budget pacing, funnel CRO',
      'One accountable owner from scratch to scale + weekly reporting'
    ],
    next: 'growth',
    prev: 'automation'
  },

  growth: {
    title: 'Growth Marketing',
    short: 'Growth Marketing',
    icon: '🌱',
    eyebrow: 'Service · New Businesses · Zero to Traction',
    lead: "Built for new businesses that need their first real customers — not vanity metrics. Growth Marketing is a fast, experiment-driven system: find the channels your buyers actually live on, build a funnel that converts them, and double down only on what the data proves. If you're launching, this is where you start. Already an established brand chasing scale? My Performance Marketing service is built for you.",
    whatYouGet: [
      ['01', 'Traction Channel Testing', "Stop guessing where customers come from. I run structured 2-week experiments across search, social, communities, partnerships, and outbound — and kill everything that doesn't produce paying users."],
      ['02', 'Positioning & Offer Sharpening', "New businesses rarely have a traffic problem — they have a 'why should I care' problem. We nail the message, the offer, and the one sentence that makes your buyer stop scrolling."],
      ['03', 'Minimum Viable Funnel', "A landing page that converts, a lead magnet worth trading an email for, and follow-up that turns interest into revenue — live in weeks, not quarters."],
      ['04', 'North-Star Metric & Analytics', "One number the whole business steers by — signups, bookings, orders — with clean GA4 tracking behind it so every experiment has a verdict."],
      ['05', 'Retention & Referral Loops', "Acquisition is rented; retention is owned. Email onboarding, review engines, and referral mechanics that make every customer cheaper than the last."],
      ['06', 'Weekly Growth Sprints', "A weekly cadence: ship experiments, read results, decide, repeat. You always know what's being tested, what it costs, and what it returned."]
    ],
    keywords: [
      ['growth marketing agency', '5.4K', 'med', 'Commercial'],
      ['startup marketing consultant', '2.1K', 'low', 'Commercial'],
      ['how to get first customers', '3.6K', 'low', 'Informational'],
      ['marketing for new business', '4.8K', 'med', 'Commercial'],
      ['growth hacking services', '1.7K', 'low', 'Commercial'],
      ['customer acquisition strategy', '2.9K', 'med', 'Informational']
    ],
    process: {"title":"How I grow new businesses","intro":"Launching is not scaling — new businesses die from spreading thin, not from moving slow. This process finds what works before spending like it works. <strong>Already a brand or established business looking to scale up? You want my <a href='services.html?s=performance'>Performance Marketing service</a> — same rigor, built for bigger budgets and blended-CAC economics.</strong>","steps":[["Foundation Sprint","Week one: ICP definition, competitor teardown, offer and message workshop, and a conversion-ready landing page with tracking wired in. No experiments launch until there's something worth sending traffic to.",["ICP workshop","Landing page","GA4 setup"]],["Channel Hypotheses","Shortlist 4–6 acquisition channels ranked by where your buyers already are and how fast each can be tested. Every channel gets a budget cap, a deadline, and a pass/fail number before a dollar is spent.",["Channel matrix","Budget caps","Success criteria"]],["Rapid Experiments","Run 2-week tests in parallel — small paid bursts, founder-led content, communities, cold outreach, partnerships. Cheap, fast, and brutally scored: pipeline produced per dollar and per hour.",["Google Ads","Meta Ads","Cold email","Communities"]],["Double Down","Kill the losers without sentiment and move 80% of budget into the 1–2 channels that produced real customers. Build the repeatable playbook: targeting, creative, follow-up, cadence.",["Playbook docs","Creative system","CRM setup"]],["Build the Loops","Layer retention and referral on top of acquisition — onboarding emails, review generation, referral incentives — so growth compounds instead of resetting to zero each month.",["Email flows","Review engine","Referral mechanics"]],["Graduate to Scale","When CAC is proven and repeatable, you've outgrown growth marketing — we transition to a Performance Marketing engagement and scale spend with confidence.",["Blended CAC model","Scale plan","Handover"]]]},
    deliverables: [
      'Positioning, offer & ICP definition (week one)',
      'Conversion-ready landing page + GA4 tracking',
      '4–6 channel experiments with pass/fail verdicts',
      'A proven acquisition playbook for your best 1–2 channels',
      'Retention loops: email onboarding, reviews, referrals',
      'Weekly growth sprint reports — tested, learned, next'
    ],
    next: 'seo',
    prev: 'scratch'
  },
};

const SERVICE_ORDER = ['scratch', 'growth', 'seo', 'llmseo', 'aeo', 'sem', 'paid', 'performance', 'social', 'content', 'email', 'webdev', 'wordpress', 'automation'];
window.SERVICES = SERVICES;
window.SERVICE_ORDER = SERVICE_ORDER;
