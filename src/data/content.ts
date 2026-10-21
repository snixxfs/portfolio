/**
 * CANONICAL CONTENT — Single source of truth.
 * Verified roles & accurate profile:
 * - President of ECell
 * - Core Member of AWS Student Builders Group at RVU
 * (PressCorps advisor role removed per directive)
 * (Spelling: ECell everywhere, not E-Cell)
 */

export const RICH_MARKERS = /(\*\*[^*]+\*\*|_[^_]+_)/

export const profile = {
  name: 'Ayush S Kulkarni',
  nameLines: ['AYUSH', 'S', 'KULKARNI'] as const,
  title: 'Ayush S Kulkarni | President of ECell · AI Builder',
  pageTitle: 'Ayush S Kulkarni | President of ECell · AI Builder',
  tagline: 'AI Systems Builder · Venture Strategist · Ecosystem Leader',
  location: 'Bengaluru, India',
  university: 'RV University',
  degree: 'B.Tech in Computer Science & Engineering (AI/ML)',
  minor: 'Finance',
  status: 'Open to High-Impact AI, Quant & Strategic Venture Roles',
  email: 'ayushak12n@gmail.com',
  phone: '+91 866 069 7430',
  pillars: ['Artificial Intelligence', 'Venture & Capital Growth', 'Ecosystem Architecture'] as const,
  typedPhrases: [
    'AI Systems & Machine Learning Engineering',
    'Domain Winner at AI Build Sprint (one of 5 winners among 60+ teams)',
    'Secured ₹13L in Sponsorships from 20 Global Brands',
    "One of Three Main Coordinators: Argonyx '26 (220+ Teams from 5 Countries)",
    'Project Executive @ CEDAT (Venture & Startup Ecosystem)',
    'Built 10,000+ Member Community & Mentorship Network',
  ],
  pitch:
    'Computer Science & Engineering student at RV University specializing in **Artificial Intelligence and Machine Learning**. Experienced in building real-world AI platforms, securing enterprise sponsorships, co-leading international hackathons, and developing strategic partnerships across Bengaluru’s startup ecosystem.',
  heroCtas: [
    { label: 'Featured Systems', href: '#work', variant: 'fill' as const },
    { label: 'Proven Impact', href: '#impact', variant: 'outline' as const },
    { label: 'Direct Contact', href: '#contact', variant: 'outline' as const },
  ],
  heroMarquee: [
    'President of ECell',
    'AWS Student Builders Group',
    'Domain Winner at AI Build Sprint',
    '₹13L+ Enterprise Capital',
    "Argonyx '26 Coordinator",
    'Autonomous AI & Quant Systems',
    'IoT Robotics & Kinematics',
    'CEDAT Venture Ecosystem',
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ayushsk' },
    { label: 'GitHub', href: 'https://github.com/snixxfs' },
    { label: 'Email', href: 'mailto:ayushak12n@gmail.com' },
    { label: 'Call', href: 'tel:+918660697430' },
  ],
  footer: '© 2026 Ayush S Kulkarni. All rights reserved.',
} as const

export interface RichText {
  text: string
}

export const aboutSection = {
  kicker: 'I // PROFILE & PHILOSOPHY',
  editorialTitle: 'Engineering Intelligence. Closing Capital. Orchestrating Systems.',
  headline: 'Where technical rigor, venture economics, and executive leadership converge.',
  paragraphs: [
    "I study Computer Science & Engineering at RV University with an honors focus on **Artificial Intelligence & Machine Learning** and a minor in Finance. Rather than confining myself to software sandboxes, I operate across three high-leverage domains: **applied AI engineering**, **venture capital dealmaking**, and **ecosystem leadership**.",
    "As **President of ECell**, I direct campus engagement, strategic partnerships, and student founder initiatives. Concurrently at **CEDAT**, I oversee projects connecting Bengaluru's startup ecosystem with institutional venture funds and angel networks. Having secured ₹13 lakh in sponsorships from 20 premier brands including Mercedes-Benz and Cisco, and served as one of three main coordinators of Argonyx '26—a 24-hour hackathon with 220+ teams across 5 countries—I prioritize execution speed and precision.",
    "On the engineering front, I architect systems that deliver tangible real-world value: from an **autonomous IoT rover sorting waste at 90% accuracy** to a **Top-5 award-winning AI Insurance Claim Automation engine**, algorithmic crypto analytics pipelines, and LLM orchestration tools.",
  ] as const,
  terminalHeading: 'Executive Telemetry // Operational Overview',
  terminalStatus: 'ACTIVE & DEPLOYED',
  roles: [
    { title: 'President', org: 'ECell, RV University', period: 'Jun 2025 – Present' },
    { title: 'Core Member', org: 'AWS Student Builders Group', period: 'Present' },
    { title: 'Project Executive', org: 'CEDAT (Startup & Venture Ecosystem)', period: 'Jun 2026 – Present' },
    { title: 'Placement Coordinator', org: 'RV University Central Placement Cell', period: 'Present' },
  ],
  now: [
    'Leading ECell: strategic partnerships, campus engagement, and student founder initiatives',
    'Contributing to AWS Student Builders Group on cloud architectures and practical solutions',
    'Managing CEDAT project operations and strategic partnerships with VCs, investors, and banks',
    'Scaled a 10,000+ member Telegram community with mentors across global domains',
    'Architecting autonomous agent workflows, quant analytics pipelines, and machine intelligence',
  ] as const,
}

export interface Stat {
  value: string
  count?: number
  prefix?: string
  suffix?: string
  label: string
  sublabel?: string
  description: string
}

export const impactSection = {
  kicker: 'II // TRACK RECORD',
  heading: 'Proven Metrics in Numbers',
  caption: 'Verifiable outcomes achieved through high-velocity cold outreach, technical hackathons, and university leadership.',
  stats: [
    {
      value: '₹13L+',
      count: 13,
      prefix: '₹',
      suffix: 'L+',
      label: 'Sponsorship Capital Closed',
      sublabel: 'Kalpavikas 1.0 & 2.0',
      description: 'Closed ₹5L in year 1, scaled to ₹8L in year 2 (+60% YoY) across 20 corporate partners via pure cold outreach.',
    },
    {
      value: '20+',
      count: 20,
      suffix: '+',
      label: 'Enterprise Brands Signed',
      sublabel: 'Fortune 500 & Global OEMs',
      description: 'Mercedes-Benz, TVS Motors, Red Bull, Cisco, Nokia, ixigo, CodeChef, HP, JustVend, and Physics Wallah.',
    },
    {
      value: 'Domain Winner',
      label: 'AI Build Sprint',
      sublabel: 'One of 5 winners among 60+ teams',
      description: 'Engineered an end-to-end AI Insurance Claim Automation Platform with live fraud scoring and damage computer vision.',
    },
    {
      value: '10K+',
      count: 10,
      suffix: 'K+',
      label: 'Telegram Channel Scaled',
      sublabel: 'Global Distribution & Dubai HNIs',
      description: 'Scaled a high-engagement channel to 10,000+ members; advised high-net-worth individuals in Dubai on cross-border tax & asset allocations.',
    },
    {
      value: '24h / 500+',
      label: "Argonyx '26 Coordination",
      sublabel: 'One of Three Main Coordinators',
      description: "One of three main coordinators of Argonyx '26, a 24-hour hackathon with 220+ teams from 5 countries; judges from Morgan Stanley, Salesforce, Google.",
    },
    {
      value: '$1M',
      label: 'Startup World Cup Regional',
      sublabel: 'Pegasus Tech Ventures x CEDAT',
      description: 'Coordinated operations for the Bengaluru Regional Finale alongside top venture capitalists, accelerators, and founders.',
    },
  ] satisfies Stat[],
}

export interface FitColumn {
  title: string
  tag: string
  accent: 'gold' | 'cyan' | 'emerald'
  items: string[]
}

export const fitSection = {
  kicker: 'III // STRATEGIC VALUE',
  heading: 'The Engineering × Venture Synthesis',
  caption:
    'Why leading technology firms, quantitative funds, and venture platforms seek builders who command both software architecture and unit economics.',
  columns: [
    {
      title: 'Technical & Machine Intelligence',
      tag: '01 / TECHNICAL EXCELLENCE',
      accent: 'gold',
      items: [
        'Production Python, C++, TypeScript, React 19, FastAPI, and relational SQL architectures.',
        'Applied LLM orchestration with OpenRouter, Mistral pipelines, and serverless n8n webhooks.',
        'Physical IoT robotics design using ESP8266, sensor fusion arrays, and 3-DOF robotic kinematics.',
        'Algorithmic trading backtesting: EMA200 & RSI crossover evaluations on 15m crypto candles.',
      ],
    },
    {
      title: 'Venture & Capital Acumen',
      tag: '02 / CAPITAL & DEALS',
      accent: 'gold',
      items: [
        'President of ECell: managing venture partnerships, founder incubations, and institutional showcases.',
        'Completed J.P. Morgan Investment Banking Virtual Experience Program (M&A, DCF valuation).',
        'Project Executive at CEDAT: embedded alongside venture funds, angel syndicates, and government bodies.',
        'Advised Dubai HNIs on cross-border tax optimization, private aviation charters, and asset holdings.',
      ],
    },
    {
      title: 'Executive Leadership & Execution',
      tag: '03 / SCALE & ORCHESTRATION',
      accent: 'gold',
      items: [
        'Core Member of AWS Student Builders Group at RVU: driving cloud architecture cohorts.',
        'Closed 20 enterprise brand sponsors with zero prior network in 30-day cold outreach sprints.',
        "One of three main coordinators of Argonyx '26: managing judges from Morgan Stanley, Salesforce, and Progress.",
        'Official Student Placement Coordinator bridging campus hiring committees and recruiters.',
      ],
    },
  ] satisfies FitColumn[],
}

export type HatKey = 'build' | 'sell' | 'run'

export interface HatPanelItem {
  big: string
  title: string
  text: string
  tags: string[]
}

export interface HatTab {
  id: HatKey
  small: string
  label: string
  accent: 'gold'
  panels: HatPanelItem[]
}

export const hatsSection = {
  kicker: 'IV // CORE CAPABILITIES',
  heading: 'Build. Close. Orchestrate.',
  tabs: [
    {
      id: 'build',
      small: 'SYSTEMS & AI',
      label: 'Build',
      accent: 'gold',
      panels: [
        {
          big: 'Domain Winner',
          title: 'AI Build Sprint',
          text: 'Domain Winner at AI Build Sprint (one of 5 winners among 60+ teams), building an autonomous insurance claim evaluation platform with computer vision damage scoring and instant fraud risk triage.',
          tags: ['Python', 'Computer Vision', 'LLMs', 'Fintech'],
        },
        {
          big: '90% Accuracy',
          title: 'Smart Waste Sorting Rover',
          text: 'Hardware IoT rover running ESP8266, ultrasonic and moisture sensors, 3-DOF robotic arm, and hybrid Li-ion/solar power array.',
          tags: ['IoT', 'ESP8266', 'C++', 'Robotics'],
        },
        {
          big: '24h Sprint',
          title: 'PharmaGuard Genomic Risk Engine',
          text: 'Predicts adverse drug reactions based on patient genetic markers, built and shipped overnight at RIFT 2026.',
          tags: ['Bioinformatics', 'ML', 'Python'],
        },
        {
          big: 'Cloud & Agents',
          title: 'AI Automation & Tax Systems',
          text: 'OpenRouter-powered Telegram bots for India new tax regime and automated startup valuation with HMAC-SHA256 CRC webhooks.',
          tags: ['Mistral', 'OpenRouter', 'n8n', 'APIs'],
        },
      ],
    },
    {
      id: 'sell',
      small: 'CAPITAL & BRANDS',
      label: 'Close',
      accent: 'gold',
      panels: [
        {
          big: '₹13 Lakhs',
          title: 'Sponsorships: Kalpavikas 1.0 & 2.0',
          text: 'Secured ₹13 lakh in sponsorships from 20 brands, comprising ₹2.8 lakh in cash and ₹10.2 lakh in-kind contributions.',
          tags: ['Negotiation', 'Enterprise Sales', 'Pitching'],
        },
        {
          big: '20 Brands',
          title: 'Tier-1 Enterprise Logos Signed',
          text: 'Built brand partnerships with Mercedes-Benz, Cisco, Mahindra, Red Bull, TVS Motors, Nokia, ixigo, CodeChef, and HP.',
          tags: ['Cold Outreach', 'Brand Partnerships', 'Contracts'],
        },
        {
          big: 'Venture & Deals',
          title: 'CEDAT Project Executive',
          text: 'Oversee projects and develop strategic partnerships across Bengaluru’s startup and VC ecosystem; engage with VC funds, investors, banks, and government bodies.',
          tags: ['Venture Capital', 'Startup Ecosystem', 'Partnerships'],
        },
        {
          big: 'Startup World Cup',
          title: 'Bengaluru Regional Finale',
          text: 'Supported event operations for the regional finale organized by Pegasus Tech Ventures in collaboration with CEDAT, working with founders and investors.',
          tags: ['Pegasus Tech Ventures', 'Global Finale', 'Operations'],
        },
      ],
    },
    {
      id: 'run',
      small: 'EXECUTIVE LEADERSHIP',
      label: 'Orchestrate',
      accent: 'gold',
      panels: [
        {
          big: 'President',
          title: 'ECell, RV University',
          text: 'Progressed from Head to Director of Partnerships and Engagements to President. Lead strategic partnerships, campus engagement, and student founder initiatives.',
          tags: ['Executive Leadership', 'Ecosystem', 'Strategy'],
        },
        {
          big: 'Core Member',
          title: 'AWS Student Builders Group',
          text: 'Contribute to a student-led community focused on cloud technologies, AWS, and building practical technical solutions.',
          tags: ['AWS', 'Cloud Architecture', 'Community'],
        },
        {
          big: 'ARGONYX ’26',
          title: 'Main Coordinator (220+ Teams)',
          text: "Served as one of three main coordinators of Argonyx '26, a 24-hour hackathon featuring 220+ registered teams across 5 countries; coordinated event planning, outreach, mentors, and on-ground execution.",
          tags: ['220+ Teams', '5 Countries', 'Hackathon Lead'],
        },
        {
          big: '10K+ Community',
          title: 'Community Builder — Telegram',
          text: 'Built and grew a Telegram community to 10,000+ subscribers; connected with experienced mentors and gained exposure to real estate, aviation, and international taxation.',
          tags: ['10K+ Members', 'Community Growth', 'Mentorship'],
        },
      ],
    },
  ] satisfies HatTab[],
}

export interface ExperienceItem {
  date: string
  title: string
  org: string
  category: 'leadership' | 'tech' | 'venture'
  badge?: string
  bullets: string[]
}

export const experienceSection = {
  kicker: 'V // CHRONOLOGICAL TRACK RECORD',
  heading: 'Leadership & Professional Experience',
  caption:
    'Demonstrated track record across entrepreneurship initiatives, cloud builder groups, venture capital, and engineering ecosystems.',
  items: [
    {
      date: 'Jun 2025 – Present',
      title: 'President',
      org: 'ECell, RV University',
      category: 'leadership',
      badge: 'EXECUTIVE APPOINTMENT',
      bullets: [
        'Progressed from Head to Director of Partnerships and Engagements to President.',
        'Lead strategic partnerships, campus engagement, and entrepreneurship initiatives.',
        'Drive sponsorships, events, workshops, and initiatives supporting student founders.',
      ],
    },
    {
      date: 'Present',
      title: 'Core Member',
      org: 'AWS Student Builders Group',
      category: 'tech',
      badge: 'CLOUD & BUILDERS',
      bullets: [
        'Contribute to a student-led community focused on cloud technologies, AWS, and building practical technical solutions.',
      ],
    },
    {
      date: 'Jun 2026 – Present',
      title: 'Project Executive',
      org: 'CEDAT',
      category: 'venture',
      badge: 'VENTURE ECOSYSTEM',
      bullets: [
        'Oversee projects and develop strategic partnerships across Bengaluru’s startup and venture capital ecosystem.',
        'Engage with venture capital firms, investors, banks, and government bodies.',
      ],
    },
    {
      date: '2024 – 2025',
      title: 'Head of Sponsorships',
      org: 'Kalpavikas 1.0 & 2.0',
      category: 'venture',
      badge: '₹13L CLOSED',
      bullets: [
        'Secured ₹13 lakh in sponsorships from 20 brands, comprising ₹2.8 lakh in cash and ₹10.2 lakh in-kind contributions.',
        'Built brand partnerships with companies including Mercedes-Benz, Cisco, Mahindra, Red Bull, TVS Motors, Nokia, ixigo, CodeChef, and HP.',
      ],
    },
    {
      date: 'Sep 2026',
      title: 'Main Coordinator',
      org: 'ARGONYX ’26',
      category: 'leadership',
      badge: '24H HACKATHON',
      bullets: [
        "One of three main coordinators of Argonyx '26, a 24-hour hackathon featuring 220+ registered teams across five countries.",
        'Coordinated event planning, participant outreach, judges, mentors, sponsorships, and on-ground execution.',
      ],
    },
    {
      date: 'Aug 2026',
      title: 'Organizing Team',
      org: 'Startup World Cup – Bengaluru Regional Finale',
      category: 'venture',
      badge: 'PEGASUS TECH VENTURES',
      bullets: [
        'Supported event operations for the regional finale organized by Pegasus Tech Ventures in collaboration with CEDAT.',
        'Worked with founders, investors, and ecosystem stakeholders during the event.',
      ],
    },
    {
      date: '2024 – Present',
      title: 'Community Builder',
      org: 'Telegram',
      category: 'leadership',
      badge: '10,000+ SUBSCRIBERS',
      bullets: [
        'Built and grew a Telegram community to 10,000+ subscribers.',
        'Connected with experienced mentors and gained exposure to real estate, aviation, and international taxation.',
      ],
    },
    {
      date: 'Present',
      title: 'Placement Coordinator',
      org: 'RV University',
      category: 'leadership',
      badge: 'CENTRAL PLACEMENT CELL',
      bullets: [
        'Act as a liaison between students, the placement cell, and recruiters.',
      ],
    },
    {
      date: 'Oct 2024 – Oct 2025',
      title: 'Board Member',
      org: 'RUDRA – RVU Data Analytics',
      category: 'tech',
      badge: 'DATA & ANALYTICS',
      bullets: [
        'Co-organized a Toyota-sponsored ideathon and evaluated student solutions.',
      ],
    },
    {
      date: 'Oct 2024 – Oct 2025',
      title: 'Technical Team Member',
      org: 'GDG On Campus, RV University',
      category: 'tech',
      badge: 'GOOGLE DEVELOPER GROUPS',
      bullets: [
        'Supported hackathons and technical meetups.',
        'Developed quiz questions and managed the qualifier round for Codeverse 2025.',
      ],
    },
  ] satisfies ExperienceItem[],
}

export const vcSection = {
  kicker: 'VI // VENTURE ECOSYSTEM',
  heading: 'CEDAT & Investor Constellation',
  caption:
    'Institutional venture capital funds, angel networks, accelerators, and government entities connected through my ecosystem work at CEDAT.',
  entities: [
    { name: 'Pegasus Tech Ventures', tag: 'Global VC · Startup World Cup', featured: true },
    { name: 'KDEM / Startup Karnataka', tag: 'State Innovation Authority', featured: true },
    { name: 'IvyCap Ventures', tag: 'Early & Growth Stage VC', featured: true },
    { name: 'Blume Ventures', tag: 'Tier-1 Early Stage Fund', featured: true },
    { name: 'Aum Ventures', tag: 'Global Cross-Border VC', featured: false },
    { name: 'NextUnicorn.Fund', tag: 'Early-Stage Fund', featured: false },
    { name: 'SIAN (South India Angel Network)', tag: 'Angel Syndicate', featured: false },
    { name: 'Ideabaaz', tag: 'Startup Ecosystem Platform', featured: false },
    { name: 'DBS Bank India', tag: 'Institutional Banking Partner', featured: false },
    { name: 'State Bank of India', tag: 'Public Sector Banking', featured: false },
    { name: 'IACC (Indo-American Chamber)', tag: 'Bilateral Trade Chamber', featured: false },
    { name: 'TiE Bangalore', tag: 'Global Entrepreneur Network', featured: false },
    { name: 'Headstart Network', tag: 'Grassroots Startup Hub', featured: false },
    { name: 'eChai Ventures', tag: 'Founder Community', featured: false },
    { name: 'Finsu Advisors / FINVAYU', tag: 'Strategic Advisory', featured: false },
  ],
}

export const brandsSection = {
  kicker: 'VII // CORPORATE PARTNERS',
  heading: 'Enterprise Brands Signed',
  caption: '20 marquee logos closed through cold outreach and executive pitches across Kalpavikas editions.',
  brands: [
    { name: 'Mercedes-Benz', category: 'Luxury Automotive' },
    { name: 'Cisco', category: 'Enterprise Networking' },
    { name: 'Red Bull', category: 'Energy & Lifestyle' },
    { name: 'Nokia', category: 'Telecommunications' },
    { name: 'TVS Motors', category: 'Automotive OEM' },
    { name: 'Mahindra', category: 'Industrial & Auto' },
    { name: 'HP', category: 'Computing & Tech' },
    { name: 'ixigo', category: 'Travel Tech' },
    { name: 'CodeChef', category: 'EdTech & Dev' },
    { name: 'Physics Wallah', category: 'EdTech Unicorn' },
    { name: 'JustVend', category: 'Smart Retail IoT' },
    { name: 'RunAnywhere', category: 'Health & Fitness' },
    { name: 'MileTech', category: 'Enterprise Solutions' },
    { name: 'Technosport', category: 'Performance Apparel' },
    { name: 'Belgium Waffle', category: 'F&B Retail' },
    { name: "Atty's Bakery", category: 'Gourmet Culinary' },
    { name: 'EasyBites by Empire', category: 'Quick Service Dining' },
  ],
}

export type ProjectCategory = 'all' | 'ai' | 'iot' | 'hack' | 'web'

export interface Project {
  id: string
  title: string
  headline: string
  categories: ProjectCategory[]
  featured?: boolean
  badge?: { text: string; tone: 'gold' | 'cyan' | 'emerald' }
  metrics?: { label: string; value: string }[]
  problem: string
  solution: string
  impact: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
}

export const projectsSection = {
  kicker: 'VIII // TECHNICAL REPOSITORY',
  heading: 'Selected Engineered Systems',
  caption: 'Functional AI platforms, autonomous IoT hardware rovers, quantitative tools, and production web applications.',
  filters: [
    { key: 'all' as ProjectCategory, label: 'All Builds' },
    { key: 'ai' as ProjectCategory, label: 'AI & Automation' },
    { key: 'iot' as ProjectCategory, label: 'IoT & Robotics' },
    { key: 'hack' as ProjectCategory, label: 'Hackathons' },
    { key: 'web' as ProjectCategory, label: 'Web Systems' },
  ],
  projects: [
    {
      id: 'claims-ai',
      title: 'AI Insurance Claim Automation Platform',
      headline: 'Autonomous claim verification, fraud detection & damage scoring engine',
      categories: ['ai', 'hack'],
      featured: true,
      badge: { text: 'Domain Winner · AI Build Sprint', tone: 'gold' },
      metrics: [
        { label: 'Evaluation Speed', value: '< 2.5s' },
        { label: 'Sprint Standing', value: 'Domain Winner (Top 5 / 60+)' },
        { label: 'Architecture', value: '5 Live Engines' },
      ],
      problem: 'Insurance claims take weeks of manual inspection, are vulnerable to fraudulent image uploads, and require costly human assessors.',
      solution: 'Engineered an end-to-end platform with 5 modular pipelines: (1) Claim Approval/Rejection Rule Engine, (2) Fraud Detection classifier, (3) Automated Payout Estimator, (4) Computer Vision Damage Scoring, and (5) Instant LLM-drafted customer replies.',
      impact: 'Won 1 of 5 winning spots out of 60+ teams (180+ developers) at the AI Build Sprint with a live working demo in front of industry judges.',
      stack: ['Python', 'Computer Vision', 'OpenRouter LLM', 'FastAPI', 'React'],
    },
    {
      id: 'trash-rover',
      title: 'Smart Waste Segregation Rover',
      headline: 'Autonomous solar-hybrid IoT rover with 3-DOF robotic sorting arm',
      categories: ['iot'],
      featured: true,
      badge: { text: '90% Accuracy · Hardware Build', tone: 'gold' },
      metrics: [
        { label: 'Sorting Accuracy', value: '90%' },
        { label: 'Cycle Time', value: '4.5s' },
        { label: 'WiFi Telemetry', value: '15m Range' },
      ],
      problem: 'Manual municipal waste sorting is hazardous, slow, and error-prone; existing industrial machines are static and prohibitively expensive.',
      solution: 'Constructed an agile IoT rover utilizing an ESP8266 microcontroller, ultrasonic distance sensors, and soil-moisture arrays to differentiate wet vs. dry refuse, paired with an actuated 3-DOF robotic arm for mechanical segregation.',
      impact: 'Achieved 90% sorting accuracy on the first live campus deployment; powered entirely by a hybrid solar panel and rechargeable Li-ion battery pack.',
      stack: ['ESP8266', 'C++', 'Arduino IDE', 'Kinematics', 'Solar Hardware'],
    },
    {
      id: 'pharmaguard',
      title: 'PharmaGuard — Genomic Risk System',
      headline: 'Adverse drug reaction prediction based on patient genetic markers',
      categories: ['ai', 'hack'],
      badge: { text: 'RIFT 2026 · 24h Sprint', tone: 'gold' },
      metrics: [
        { label: 'Build Time', value: '24 Hours' },
        { label: 'City Finals', value: 'Top Cohort' },
      ],
      problem: 'Adverse Drug Reactions (ADRs) cause thousands of preventable hospitalizations annually due to unrecognized patient genetic polymorphisms.',
      solution: 'Trained a bioinformatics ML pipeline at RIFT 2026 (Physics Wallah IOI) mapping specific genetic loci and metabolizer phenotypes to contraindicated medications.',
      impact: 'Built completely overnight in 24 hours under extreme time limits; pitched to an industry jury across 2000+ competitors.',
      stack: ['Python', 'Bioinformatics', 'Scikit-Learn', 'Pandas'],
    },
    {
      id: 'startup-evaluator',
      title: 'AI Startup Evaluator Bot',
      headline: 'Automated TAM calculation, competitive moat audit & risk synthesis',
      categories: ['ai'],
      badge: { text: 'ECell Tool', tone: 'gold' },
      problem: 'Student entrepreneurs lack immediate, objective analytical critiques on TAM calculations, defensibility moats, and investor pushback.',
      solution: 'Crafted an autonomous Telegram bot powered by OpenRouter LLM orchestration that evaluates pitch synopses, estimates market sizes, and stress-tests business models.',
      impact: 'Used actively by 100+ student founders inside RVU ECell to iterate and refine their pitch decks prior to investor showcases.',
      stack: ['Python', 'Telegram Bot API', 'OpenRouter', 'Mistral-Large'],
    },
    {
      id: 'tax-assistant',
      title: 'AI Tax Assistant — India Regime',
      headline: 'Conversational tax calculation & deductions advisor for India',
      categories: ['ai'],
      badge: { text: 'Fintech Bot', tone: 'gold' },
      problem: 'Navigating India’s new versus old tax regimes, deductions, and Section 87A rebates creates immense friction for salaried earners.',
      solution: 'Developed an intelligent bot conversational agent that ingests annual salary breakdowns, parses optimal regime choices, and outlines statutory tax-saving strategies.',
      impact: 'Delivered accurate tax liability breakdowns in under 3 seconds per query with multi-turn conversational follow-ups.',
      stack: ['Python', 'Mistral 7B', 'OpenRouter', 'Financial Rules Engine'],
    },
    {
      id: 'btc-backtester',
      title: 'BTC Quant Strategy Backtester',
      headline: 'Algorithmic backtesting framework for EMA200 & RSI crossovers',
      categories: ['ai', 'web'],
      problem: 'Retail crypto traders rely on unverified social media signals without quantitative statistical edge testing on historical order books.',
      solution: 'Implemented a clean Python quantitative backtesting engine testing EMA200 and RSI crossover logic over 30 days of 15-minute Bitcoin candle data.',
      impact: 'Provided visual equity curve plotting, drawdown analysis, Sharpe ratio estimates, and automated trade log exports.',
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    },
    {
      id: 'crypto-crc',
      title: 'Crypto CRC Webhook Automation',
      headline: 'Zero-code HMAC-SHA256 visual security challenge replication in n8n',
      categories: ['ai', 'web'],
      problem: 'Setting up enterprise webhook handshakes with cryptographic signature validation typically requires heavy boilerplate backend servers.',
      solution: 'Engineered an end-to-end n8n workflow that validates Twitter-style Challenge-Response Check (CRC) requests, signs tokens using HMAC-SHA256, and returns verified responses through ngrok tunnels.',
      impact: 'Demonstrated serverless webhook orchestration handling authenticated event streams without persistent server overhead.',
      stack: ['n8n', 'HMAC-SHA256', 'ngrok', 'Webhooks'],
    },
    {
      id: 'gdg-portal',
      title: 'GDG RVU Official Chapter Portal',
      headline: 'High-performance community platform for Google Developer Group RVU',
      categories: ['web'],
      liveUrl: 'https://gdg-rvu.onrender.com',
      badge: { text: 'Production Live', tone: 'gold' },
      problem: 'The student developer community required a unified portal for hackathon registrations, speaker profiles, and event archives.',
      solution: 'Co-developed and shipped the responsive chapter website with fast render times, clean typography, and interactive event listings.',
      impact: 'Live in production at gdg-rvu.onrender.com, supporting hundreds of students during Codeverse 2025.',
      stack: ['HTML5', 'Modern CSS', 'JavaScript ES6+', 'Render CI/CD'],
    },
    {
      id: 'vision-rover',
      title: 'Vision Rover — Real-time WiFi Robot',
      headline: 'ESP8266 mobile-controlled rover built in 24 hours (3rd Place)',
      categories: ['iot', 'hack'],
      badge: { text: '3rd Place · 24h Hack', tone: 'gold' },
      problem: 'Rapid deployment of remote exploration rovers in disaster or inspection environments is hindered by proprietary protocols.',
      solution: 'Designed and wired an ESP8266-driven robot with low-latency bidirectional WiFi socket control from any mobile browser.',
      impact: 'Placed 3rd overall at an inter-collegiate hardware hackathon under intense time pressure.',
      stack: ['ESP8266', 'C++', 'WebSockets', 'Hardware Prototyping'],
    },
    {
      id: 'car-bhai',
      title: 'CAR BHAI — Luxury Motion Experience',
      headline: 'Interactive automotive showcase with GSAP & spatial engine audio',
      categories: ['web'],
      badge: { text: 'Creative Dev', tone: 'gold' },
      problem: 'Traditional automotive web showcases rely on static carousels without tactile sensory feedback or cinematic pacing.',
      solution: 'Built an experimental web experience featuring vertical SwiperJS mechanics, GSAP micro-animations, and dynamic procedural engine rev audio.',
      impact: 'Demonstrates creative frontend development, audio synthesis APIs, and high frame-rate motion typography.',
      stack: ['JavaScript ES6+', 'GSAP', 'SwiperJS', 'Web Audio API'],
    },
    {
      id: 'sih-dementia',
      title: 'Dementia Care Assistive Network',
      headline: 'Smart India Hackathon project for elderly cognitive assistance',
      categories: ['hack', 'iot'],
      badge: { text: 'Smart India Hackathon', tone: 'gold' },
      problem: 'Dementia patients experience severe disorientation and caregivers lack passive, non-intrusive wandering detection systems.',
      solution: 'Architected an integrated IoT sensor and mobile alert mechanism that flags unusual movement patterns and guides disoriented patients safely.',
      impact: 'Submitted for evaluation under the Government of India Smart India Hackathon initiative.',
      stack: ['IoT', 'Mobile Architecture', 'SIH Track'],
    },
  ] satisfies Project[],
}

export const stackSection = {
  kicker: 'IX // TECHNICAL ARSENAL',
  heading: 'Skills, Systems & Infrastructure',
  caption: 'Production-tested tools and frameworks spanning AI engineering, cloud, hardware, and venture strategy.',
  groups: [
    {
      category: 'AI & Machine Intelligence',
      accent: 'gold',
      skills: [
        'Python',
        'LLM APIs & Prompt Engineering',
        'OpenRouter & Mistral Orchestration',
        'Computer Vision (OpenCV)',
        'Bioinformatics Machine Learning',
        'Telegram Bot Automation',
        'Agentic Workflows',
      ],
    },
    {
      category: 'Cloud & Infrastructure',
      accent: 'gold',
      skills: [
        'AWS Cloud (Student Builders Core)',
        'Google Cloud (GCP Essentials)',
        'Serverless & AWS Lambda',
        'n8n Webhook Pipelines',
        'Docker Containerization',
        'CI/CD & Render / Vercel',
      ],
    },
    {
      category: 'Frontend & Creative Systems',
      accent: 'gold',
      skills: [
        'TypeScript & React 19',
        'Three.js & WebGL Shaders',
        'GSAP & ScrollTrigger',
        'Tailwind & Modern CSS Grids',
        'Figma UI/UX & Design Systems',
        'Responsive Mobile Architecture',
      ],
    },
    {
      category: 'IoT & Embedded Robotics',
      accent: 'gold',
      skills: [
        'ESP8266 & ESP32 Microcontrollers',
        'Arduino C / C++',
        'Sensor Fusion Arrays (Ultrasonic, Moisture)',
        '3-DOF Robotic Kinematics',
        'Li-ion & Solar Hybrid Circuits',
        'WiFi WebSocket Telemetry',
      ],
    },
    {
      category: 'Venture, Finance & Strategy',
      accent: 'gold',
      skills: [
        'Presidential Leadership (ECell)',
        'Enterprise Sponsorship Sales (₹13L+ Closed)',
        'J.P. Morgan Investment Banking Program',
        'Financial Modelling & Strategy Backtesting',
        'Dubai HNI Advisory (Tax & Asset Structuring)',
        'Venture Capital Ecosystem (CEDAT)',
      ],
    },
    {
      category: 'Execution & Operations',
      accent: 'gold',
      skills: [
        "Argonyx '26 Hackathon Coordination",
        'Cross-Functional Team Leadership',
        'Placement Cell Operations',
        'Technical Mentorship',
        'Cold Pitching & Deal Closing',
      ],
    },
  ],
  certifications: [
    { name: 'Google Cloud Essentials', issuer: 'Google', icon: '☁️' },
    { name: 'Investment Banking Virtual Program', issuer: 'J.P. Morgan', icon: '🏦' },
    { name: 'Basement Innovation Program', issuer: 'Red Bull', icon: '⚡' },
    { name: '30+ Hours Advanced Web Dev Training', issuer: 'DevTown (Campus Ambassador)', icon: '💻' },
  ],
}

export const contactSection = {
  kicker: 'X // INITIATE TRANSMISSION',
  heading: 'Let’s Build Something Formidable',
  caption:
    'Whether you are looking to hire a high-impact AI/CSE builder, partner on enterprise ecosystems, or invite a founder to collaborate — my inbox is open.',
  channels: [
    { label: 'Direct Email', value: 'ayushak12n@gmail.com', href: 'mailto:ayushak12n@gmail.com', icon: 'email' },
    { label: 'Direct Phone', value: '+91 866 069 7430', href: 'tel:+918660697430', icon: 'phone' },
    { label: 'LinkedIn Profile', value: 'linkedin.com/in/ayushsk', href: 'https://linkedin.com/in/ayushsk', icon: 'linkedin' },
    { label: 'GitHub Repositories', value: 'github.com/snixxfs', href: 'https://github.com/snixxfs', icon: 'github' },
  ],
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'fit', label: 'Fit' },
  { id: 'hats', label: 'Strengths' },
  { id: 'exp', label: 'Leadership' },
  { id: 'vc', label: 'Venture' },
  { id: 'brands', label: 'Brands' },
  { id: 'work', label: 'Projects' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId =
  | 'hero'
  | 'about'
  | 'impact'
  | 'fit'
  | 'hats'
  | 'exp'
  | 'vc'
  | 'brands'
  | 'work'
  | 'stack'
  | 'contact'
