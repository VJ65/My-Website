// ─── INDUSTRIES DATA ── shared by industries.html + nav dropdowns ──
// Each industry: how I approach that market — funnel realities, playbook, channels.

const INDUSTRY_ORDER = ['realestate', 'ecommerce', 'healthcare', 'restaurants', 'legal', 'outdoor', 'localservices', 'saas'];

const INDUSTRIES = {

  realestate: {
    icon: '🏡',
    title: 'Real Estate',
    short: 'Real Estate',
    eyebrow: 'Industry · Property & Agents',
    accent: 'oklch(58% 0.12 155)',
    lead: "Buyers start on Google and Instagram months before they call an agent. My job is to be there first — with local search dominance, listing-led creative and lead funnels that separate the ready-to-move from the just-browsing.",
    realities: [
      ['01', 'Long, emotional decision cycles', "A property lead can take 3–12 months to transact. Nurture sequences and retargeting matter as much as the first click — most agents lose the lead in the gap."],
      ['02', 'Hyper-local intent', "Nobody searches 'buy house'. They search suburb + property type. Winning means owning dozens of micro-local keywords and map-pack positions, not one big term."],
      ['03', 'Lead quality beats lead volume', "A hundred cheap leads that never answer the phone cost more than twenty qualified ones. Forms are built to qualify — budget, timeline, pre-approval — before the CRM ever rings."],
      ['04', 'Trust is the conversion event', "Reviews, sold-listing proof and agent personal brand do the selling. The funnel's job is to package that proof at every step."]
    ],
    approach: {
      title: 'From suburb searches to signed listings',
      intro: "The playbook pairs local SEO foundations with paid lead-gen, then protects ROI with qualification and nurture — so agents spend time on people who are actually transacting.",
      steps: [
        ['Local visibility audit', "Map-pack rankings, suburb keyword coverage, Google Business Profile health and competitor share-of-search — a baseline of where buyers can and can't find you.", ['GBP', 'Ahrefs', 'Local rank tracking']],
        ['Listing-led lead funnels', "Suburb reports, off-market lists and appraisal offers as lead magnets — landing pages built to qualify budget and timeline, not just capture an email.", ['Landing pages', 'Meta Ads', 'Google Ads']],
        ['Nurture & retargeting', "Automated follow-up that keeps you present for the 6-month decision cycle: email drips, SMS touchpoints and retargeting audiences segmented by intent.", ['Email drips', 'SMS', 'Retargeting']],
        ['Attribution to appraisals', "Call tracking and CRM integration so every appraisal and listing traces back to its source keyword or ad — spend shifts to what signs contracts.", ['Call tracking', 'CRM', 'GA4']]
      ]
    },
    channels: ['Local SEO & map pack', 'Google Ads (suburb + intent)', 'Meta lead campaigns', 'Email & SMS nurture', 'Review generation', 'Retargeting'],
    services: ['seo', 'sem', 'automation']
  },

  ecommerce: {
    icon: '🛒',
    title: 'E-commerce & DTC',
    short: 'E-commerce',
    eyebrow: 'Industry · Online Retail',
    accent: 'oklch(55% 0.11 195)',
    lead: "Scaling a store isn't about more spend — it's about protecting blended ROAS while spend grows. I run e-commerce as a system: creative testing on Meta, harvest intent on Google Shopping, and lifecycle email doing the profitable second sale.",
    realities: [
      ['01', 'Blended ROAS is the only truth', "Platform-reported ROAS flatters itself. Decisions run on blended metrics — MER, new-customer CAC and contribution margin — or scaling quietly loses money."],
      ['02', 'Creative is the targeting', "Post-iOS14, the ad account is a creative-testing machine. Winners get found through structured hook/angle/format testing, not audience micromanagement."],
      ['03', 'Second purchase pays the profit', "Most stores break even on first order. Email and SMS lifecycle flows are where margin actually lives — they're built before spend scales, not after."],
      ['04', 'Site speed and PDP conversion compound', "A 0.5% conversion-rate lift beats a 10% budget increase. Landing experience, offer structure and page speed get engineered alongside the ads."]
    ],
    approach: {
      title: 'Scale spend without losing the margin',
      intro: "Full-funnel DTC growth: prospecting creative on Meta, intent capture on Google, and a lifecycle engine that turns first orders into repeat revenue.",
      steps: [
        ['Unit-economics baseline', "AOV, margin, repeat rate and payback windows first — so target CAC and scaling thresholds are real numbers, not vibes.", ['GA4', 'Shopify analytics', 'Spreadsheet models']],
        ['Creative testing engine', "A weekly cadence of hooks, angles and formats on Meta with clean naming and structured verdicts — winners scale, learnings feed the next batch.", ['Meta Ads', 'UGC briefs', 'Post-purchase surveys']],
        ['Intent capture & feeds', "Google Shopping, Performance Max and branded search tuned with feed optimisation — collecting the demand the top-of-funnel creates.", ['Google Merchant Center', 'PMax', 'Feed rules']],
        ['Lifecycle & retention', "Klaviyo flows — welcome, abandon, post-purchase, win-back — plus campaign calendar, so repeat revenue grows while ads hunt new customers.", ['Klaviyo', 'SMS', 'Cohort analysis']]
      ]
    },
    channels: ['Meta & TikTok prospecting', 'Google Shopping / PMax', 'Klaviyo email & SMS', 'CRO & landing pages', 'Post-purchase surveys', 'Influencer whitelisting'],
    services: ['paid', 'performance', 'email']
  },

  healthcare: {
    icon: '♿',
    title: 'NDIS & Healthcare',
    short: 'NDIS & Healthcare',
    eyebrow: 'Industry · Care Providers & Clinics',
    accent: 'oklch(58% 0.12 240)',
    lead: "Healthcare marketing is trust-first and compliance-bound. I build acquisition for clinics and NDIS providers that respects advertising rules, earns confidence before the first call, and measures bookings — not clicks.",
    realities: [
      ['01', 'Compliance shapes the creative', "Health and disability advertising has hard rules — no outcome promises, careful testimonial use. Campaigns are written to pass review and still convert."],
      ['02', 'Care decisions involve families', "The person searching is often a parent, carer or support coordinator. Messaging and landing pages speak to the decision circle, not just the participant."],
      ['03', 'The call is the conversion', "Bookings happen on the phone. Call tracking, answered-rate monitoring and front-desk scripts are part of the funnel — ads that ring an unanswered phone are wasted."],
      ['04', 'Local trust signals decide', "Reviews, accreditations, staff pages and plain-English service explanations do the heavy lifting. Content is built to reassure before it persuades."]
    ],
    approach: {
      title: 'Compliant growth measured in booked appointments',
      intro: "A trust-first system: local SEO and service-page content that answers real questions, paid search for high-intent moments, and call tracking that ties spend to bookings.",
      steps: [
        ['Compliance & trust audit', "Review of claims, testimonials and required disclosures across site and ads — plus a trust-signal gap check against competing providers.", ['AHPRA/NDIS guidelines', 'Site audit', 'Review platforms']],
        ['Service-line SEO', "Dedicated, plain-English pages per service and location — built around the questions families and support coordinators actually search.", ['Keyword research', 'Content briefs', 'Local landing pages']],
        ['High-intent paid search', "Google Ads on 'near me' and service + suburb terms with compliant copy — capturing urgent demand while SEO compounds.", ['Google Ads', 'LSA where eligible', 'Negative keywords']],
        ['Call & booking attribution', "Dynamic call tracking, booking-system integration and answered-rate reporting — so the metric is appointments kept, not clicks bought.", ['Call tracking', 'Booking systems', 'GA4']]
      ]
    },
    channels: ['Local SEO & GBP', 'Google Ads (high intent)', 'Content & service pages', 'Call tracking', 'Review generation', 'Referrer outreach'],
    services: ['seo', 'sem', 'content']
  },

  restaurants: {
    icon: '🍽️',
    title: 'Restaurants & Hospitality',
    short: 'Restaurants',
    eyebrow: 'Industry · Dining & Venues',
    accent: 'oklch(62% 0.14 45)',
    lead: "For a venue, marketing is a radius game: be the obvious choice within 5km at the moment someone's deciding where to eat. I run Google Business Profile like a storefront, reviews like a sales team, and geo-targeted offers that fill quiet nights.",
    realities: [
      ['01', "The map pack is the homepage", "Most bookings start at 'restaurants near me'. Photos, categories, menus and review velocity on your Business Profile outweigh the website itself."],
      ['02', 'Reviews compound or kill', "Star rating moves cover counts measurably. A review-generation system — ask, respond, recover — is core infrastructure, not a nice-to-have."],
      ['03', 'Demand is time-shaped', "Friday fills itself; Tuesday doesn't. Offers and ads are dayparted to push demand into the gaps instead of discounting peak service."],
      ['04', 'The asset is the list', "Walk-ins you can't re-contact are rented traffic. Wifi sign-ins, booking data and loyalty capture turn one visit into a repeat-visit channel you own."]
    ],
    approach: {
      title: 'Own the 5km radius',
      intro: "Local dominance first, then demand shaping: an optimised profile that wins the map pack, a review engine, and geo-targeted campaigns aimed at the nights you need filled.",
      steps: [
        ['Profile & listings overhaul', "Google Business Profile rebuilt — categories, menu links, photo strategy, posts cadence — plus consistent listings across maps and delivery platforms.", ['GBP', 'Listings sync', 'Photo direction']],
        ['Review engine', "QR and post-visit prompts, response templates and recovery flows for bad experiences — building velocity and rating together.", ['Review platforms', 'QR flows', 'Response playbook']],
        ['Geo-targeted demand', "Meta and Google campaigns in a tight radius, dayparted for slow periods, promoting bookable offers — measured in reservations, not reach.", ['Meta Ads', 'Google Ads', 'Booking links']],
        ['Repeat-visit machine', "Email/SMS list capture from wifi, bookings and loyalty — with a monthly calendar of events and offers that brings faces back.", ['Email/SMS', 'Loyalty', 'Events calendar']]
      ]
    },
    channels: ['Google Business Profile', 'Review generation', 'Geo-targeted Meta Ads', 'Local SEO', 'Email/SMS loyalty', 'Delivery-platform optimisation'],
    services: ['seo', 'social', 'sem']
  },

  legal: {
    icon: '⚖️',
    title: 'Legal Services',
    short: 'Legal',
    eyebrow: 'Industry · Law Firms',
    accent: 'oklch(50% 0.1 280)',
    lead: "Legal clicks are among the most expensive on the internet — so the system has to be ruthless about intent. I build tightly-themed Google Ads, authority content that ranks for the questions clients ask, and tracking that values a signed case, not a form fill.",
    realities: [
      ['01', 'CPCs punish sloppy structure', "At $50–$300 a click, broad match and lazy negatives burn budgets fast. Campaigns are tightly themed by practice area with aggressive negative lists."],
      ['02', 'Urgency splits the funnel', "An arrest tonight and an estate plan next year are different funnels. Urgent matters get call-first ads; considered matters get content and nurture."],
      ['03', 'Authority is rankable', "Clients search their situation, not your service name. Practice-area content that answers those questions builds rankings and pre-sells expertise at once."],
      ['04', 'Intake is half the funnel', "Slow callbacks lose signed cases to whoever answered first. Response-time tracking and intake scripts are inside scope, not outside it."]
    ],
    approach: {
      title: 'High-intent leads, valued at the case level',
      intro: "Practice-area campaigns built around intent tiers, supported by authority content, with attribution that follows a lead through intake to signed matter.",
      steps: [
        ['Practice-area demand map', "Search demand, CPC benchmarks and competitor coverage per practice area — deciding where paid wins, where content wins, and what to ignore.", ['Keyword research', 'Auction insights', 'SERP analysis']],
        ['Tightly-themed Google Ads', "Single-theme ad groups, call-first extensions for urgent matters, and negative lists that keep 'free advice' searches out of the bill.", ['Google Ads', 'Call assets', 'LSA']],
        ['Authority content system', "Question-led practice pages and guides written to rank and reassure — the content a nervous client reads at midnight before choosing who to call.", ['Content briefs', 'On-page SEO', 'E-E-A-T signals']],
        ['Case-level attribution', "Call tracking and CRM stages from enquiry → consult → signed, with lead-source value reports — so budget follows signed cases, not enquiries.", ['Call tracking', 'CRM', 'Offline conversions']]
      ]
    },
    channels: ['Google Ads (practice-area)', 'Local Services Ads', 'Authority content & SEO', 'Call tracking & intake', 'Review generation', 'Remarketing'],
    services: ['sem', 'content', 'seo']
  },

  outdoor: {
    icon: '📺',
    title: 'Digital Billboard & Outdoor Media',
    short: 'Outdoor Media',
    eyebrow: 'Industry · OOH & DOOH',
    accent: 'oklch(58% 0.14 330)',
    lead: "Billboards build the demand; digital proves it happened. I bridge OOH with digital infrastructure — memorable URLs, QR journeys, geo-fenced retargeting and brand-lift measurement — so outdoor budgets stop being a leap of faith.",
    realities: [
      ['01', 'Attribution is the objection', "OOH gets cut first because nobody can prove it worked. Wrapping boards with measurable digital touchpoints answers the CFO's question."],
      ['02', 'Seven words, five seconds', "A billboard is glanced at, not read. Creative discipline — one message, one memorable action — decides whether the digital layer has anything to catch."],
      ['03', 'The search spike is the signal', "Good OOH shows up as branded-search and direct-traffic lift in exposed areas. Instrumenting that baseline before launch is what makes it visible."],
      ['04', 'Retargeting extends the board', "Geo-fenced audiences around board locations let a 5-second impression become a 30-day digital conversation."]
    ],
    approach: {
      title: 'Make outdoor measurable',
      intro: "Digital scaffolding around every campaign: trackable entry points, geo-fenced audiences, and before/after measurement that shows what the boards actually moved.",
      steps: [
        ['Measurement baseline', "Branded search volume, direct traffic and store/location visits by area before flight — the control that later proves lift.", ['GA4', 'Search Console', 'Geo reports']],
        ['Trackable creative layer', "Short memorable URLs, QR journeys and campaign-specific landing pages designed for the glance-to-phone moment.", ['Short URLs', 'QR codes', 'Landing pages']],
        ['Geo-fenced amplification', "Mobile audiences built around board locations, retargeted on Meta and programmatic — frequency where the brand is already in the air.", ['Geo-fencing', 'Meta Ads', 'Programmatic']],
        ['Lift reporting', "During/after-flight comparison: branded search lift, landing-page entries, promo redemptions and exposed-area conversions in one report.", ['GA4', 'UTM discipline', 'Lift analysis']]
      ]
    },
    channels: ['QR & short-URL journeys', 'Geo-fenced retargeting', 'Branded-search lift tracking', 'Campaign landing pages', 'Meta amplification', 'Promo attribution'],
    services: ['performance', 'webdev', 'sem']
  },

  localservices: {
    icon: '🔧',
    title: 'Local Service Businesses',
    short: 'Local Services',
    eyebrow: 'Industry · Trades & Home Services',
    accent: 'oklch(65% 0.13 85)',
    lead: "For trades and home services, growth is simple to describe and hard to do: rank in the map pack, answer the phone, collect the review, repeat. I build that loop — Local Services Ads, local SEO and review systems that turn searches into booked jobs.",
    realities: [
      ['01', 'Speed-to-lead wins the job', "An emergency plumbing lead is gone in 15 minutes. Missed-call textback and instant routing are worth more than any extra ad spend."],
      ['02', 'The map pack is the market', "Three spots, winner-takes-most. Proximity, review count and profile activity decide it — and all three can be systematically worked."],
      ['03', 'Reviews are the moat', "Google Guaranteed and 4.8-with-400-reviews beat any slogan. A per-job review ask, built into the workflow, compounds forever."],
      ['04', 'Seasonality demands agility', "AC in summer, heaters in winter, storms overnight. Budgets and creative swing with demand instead of running one flat campaign."]
    ],
    approach: {
      title: 'The booked-jobs loop',
      intro: "A repeatable local machine: LSA and map-pack presence to catch demand, instant lead handling to win it, and review systems that make the next job cheaper.",
      steps: [
        ['Local foundation', "GBP optimisation, service-area pages and citation cleanup — the groundwork proximity and relevance are scored on.", ['GBP', 'Service-area pages', 'Citations']],
        ['Local Services Ads + search', "Google Guaranteed setup and dispute discipline, backed by tightly-geofenced search campaigns for jobs LSA doesn't cover.", ['LSA', 'Google Ads', 'Geo targeting']],
        ['Speed-to-lead system', "Missed-call textback, lead routing and booking automation — every enquiry answered in minutes, tracked to outcome.", ['GHL', 'Call tracking', 'SMS automation']],
        ['Review flywheel', "Post-job review requests built into the workflow, response templates, and rating monitoring across platforms.", ['Review automation', 'QR on invoices', 'Reputation dashboards']]
      ]
    },
    channels: ['Local Services Ads', 'Map-pack SEO', 'Missed-call textback', 'Review automation', 'Service-area pages', 'Seasonal campaigns'],
    services: ['sem', 'seo', 'automation']
  },

  saas: {
    icon: '💻',
    title: 'SaaS & Startups',
    short: 'SaaS & Startups',
    eyebrow: 'Industry · Software & Product',
    accent: 'oklch(55% 0.13 300)',
    lead: "SaaS growth is a systems problem: acquisition, activation and expansion have to compound together. I combine programmatic SEO, intent-based paid, and lifecycle email tuned to the trial-to-paid journey — measured in payback months, not clicks.",
    realities: [
      ['01', 'CAC payback rules everything', "Channels are judged on months-to-payback by cohort. A channel that pays back in 6 months scales; one that pays back in 24 gets cut."],
      ['02', 'Activation is a marketing metric', "Signups that never hit the aha-moment churn silently. Onboarding email, in-product nudges and signup-source quality are inside the growth scope."],
      ['03', 'Search scales through templates', "Programmatic and comparison pages — 'X vs Y', 'best tool for Z', integrations, use cases — compound where one-off blog posts plateau."],
      ['04', 'Buying committees read everything', "B2B deals involve 4–7 people. Retargeting, case studies and pricing-page clarity work on the committee, not just the visitor."]
    ],
    approach: {
      title: 'Compounding acquisition, tuned to payback',
      intro: "A full-funnel system: programmatic SEO for durable pipeline, intent-based paid for speed, and lifecycle flows that move signups to revenue.",
      steps: [
        ['Growth model & baseline', "Funnel math from visitor → signup → activated → paid, with CAC payback by channel — deciding where a dollar works hardest.", ['Analytics audit', 'Cohort models', 'Attribution']],
        ['Programmatic & comparison SEO', "Template-driven pages for use cases, integrations and 'vs' searches — engineering + content shipping hundreds of indexable, useful pages.", ['Next.js', 'Keyword clustering', 'Content ops']],
        ['Intent-based paid', "Google search on category and competitor terms, LinkedIn/Meta for ICP reach — landing pages per intent, not one generic homepage.", ['Google Ads', 'LinkedIn Ads', 'Landing pages']],
        ['Trial-to-paid lifecycle', "Onboarding sequences keyed to activation milestones, sales-assist triggers and expansion campaigns — email that moves the revenue metric.", ['Lifecycle email', 'Product analytics', 'CRM triggers']]
      ]
    },
    channels: ['Programmatic SEO', 'Google & LinkedIn Ads', 'Lifecycle email', 'Comparison & use-case pages', 'Retargeting', 'Product analytics'],
    services: ['seo', 'performance', 'email']
  }
};

// expose for pages that build nav dropdowns from data
window.INDUSTRIES = INDUSTRIES;
window.INDUSTRY_ORDER = INDUSTRY_ORDER;
