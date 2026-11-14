/**
 * CANONICAL DATA FOR "THE DEAL ROOM"
 * All verified facts, numbers, roles, brands, testimonials, projects, and certifications.
 * Zero invented metrics.
 */

export interface LedgerItem {
  id: string
  number: string
  label: string
  sublabel: string
  targetChapter: string
}

export interface BrandDeal {
  index: string
  name: string
  category: 'Tech & Telecom' | 'Automotive & Industrial' | 'Lifestyle & F&B'
  type?: 'Cash' | 'In-Kind' | 'Cash + In-Kind'
}

export interface VentureEntity {
  name: string
  tag: string
  category: string
  featured?: boolean
}

export interface RoomPanel {
  id: string
  numeral: string
  org: string
  role: string
  dates: string
  highlightWord: string
  outcomes: string[]
  metric?: {
    value: string
    label: string
  }
  tag: string
}

export interface BuildProject {
  id: string
  title: string
  description: string
  stack: string[]
  year: string
  repoUrl: string
  liveUrl?: string
  defaultLanguage: string
  defaultStars: number
  defaultUpdated: string
}

export interface VoiceTestimonial {
  id: string
  quote: string
  author: string
  source: string
  tag: string
  featured?: boolean
}

export interface CertCredential {
  name: string
  issuer: string
  date?: string
}

export const dealRoomData = {
  profile: {
    name: 'Ayush S Kulkarni',
    email: 'ayushak12n@gmail.com',
    phone: '+91 866 069 7430',
    phoneRaw: '+918660697430',
    whatsappUrl: 'https://wa.me/918660697430?text=Hi%20Ayush%2C%20let%27s%20discuss%20an%20AI%20engineering%20role%20%2F%20deal.',
    location: 'Bengaluru, India',
    githubUrl: 'https://github.com/snixxfs',
    linkedinUrl: 'https://linkedin.com/in/ayushsk',
    telegramUrl: 'https://t.me/snixxfs',
    topLabel: 'AI & ML Systems Engineer  ·  President, ECell RV University  ·  Bengaluru',
    heroLinePrefix: 'I engineer autonomous AI systems, direct student venture, and build at',
    heroLineHighlight: 'scale.',
    heroLineSuffix: '',
    heroSubsentence:
      'CSE (AI & ML) at RV University and President of ECell. From 5-pipeline computer vision and claim automation engines to closing ₹13L in institutional capital, I turn technical rigor into high-leverage outcomes.',
  },

  // Chapter 00: The Ledger Strip (3 equal columns at bottom of viewport)
  ledger: [
    {
      id: 'ai-sprint',
      number: 'Top 5',
      label: 'Domain Winner · AI Build Sprint',
      sublabel: 'Autonomous claim engine in <2.5s across 60+ teams',
      targetChapter: 'chapter-03',
    },
    {
      id: 'capital',
      number: '₹13L',
      label: 'Capital Raised · 18 Brands',
      sublabel: 'Closed Fortune 500s via 30-day cold outreach sprints',
      targetChapter: 'chapter-01',
    },
    {
      id: 'community',
      number: '10K+',
      label: 'Network Scaled',
      sublabel: 'Broadcast network on mindset, technical craft & finance',
      targetChapter: 'chapter-04',
    },
  ] satisfies LedgerItem[],

  // Hero disciplines marquee ticker
  marqueeDisciplines: [
    'Applied Machine Intelligence',
    'Autonomous Multi-Agent Pipelines',
    'Computer Vision & Classification',
    'AWS Cloud Architectures',
    'Venture Capital Operations',
    'Full-Stack Systems Engineering',
    'High-Stakes Dealmaking',
    'Hardware & IoT Robotics',
  ],

  // Marquee brands ticker (shown in Chapter 01)
  marqueeBrands: [
    'Mercedes-Benz',
    'Cisco',
    'Red Bull',
    'Nokia',
    'TVS Motors',
    'Mahindra',
    'HP',
    'ixigo',
    'CodeChef',
    'JustVend',
    'RunAnywhere',
    'MileTech',
    'Technosport',
    'Belgium Waffle',
    "Atty's Bakery",
    'EasyBites by Empire',
    'Toyota',
    'DevTown',
  ],

  // Chapter 01: The Closes (18 verified corporate sponsor brands with categories)
  brands: [
    { index: '01', name: 'Mercedes-Benz', category: 'Automotive & Industrial', type: 'Cash + In-Kind' },
    { index: '02', name: 'Cisco', category: 'Tech & Telecom', type: 'Cash' },
    { index: '03', name: 'Red Bull', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '04', name: 'Nokia', category: 'Tech & Telecom', type: 'Cash' },
    { index: '05', name: 'TVS Motors', category: 'Automotive & Industrial', type: 'Cash' },
    { index: '06', name: 'Mahindra', category: 'Automotive & Industrial', type: 'In-Kind' },
    { index: '07', name: 'HP', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '08', name: 'ixigo', category: 'Tech & Telecom', type: 'Cash' },
    { index: '09', name: 'CodeChef', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '10', name: 'JustVend', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '11', name: 'RunAnywhere', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '12', name: 'MileTech', category: 'Tech & Telecom', type: 'Cash' },
    { index: '13', name: 'Technosport', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '14', name: 'Belgium Waffle', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '15', name: "Atty's Bakery", category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '16', name: 'EasyBites by Empire', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '17', name: 'DevTown', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '18', name: 'Toyota', category: 'Automotive & Industrial', type: 'In-Kind' },
  ] satisfies BrandDeal[],

  // 15 Institutional Venture Capital Firms & Ecosystem Nodes (CEDAT / Startup World Cup)
  ventureEntities: [
    { name: 'Pegasus Tech Ventures', tag: 'Global VC · Startup World Cup Partner', category: 'Global Venture Capital', featured: true },
    { name: 'Blume Ventures', tag: 'Tier-1 Early Stage Fund', category: 'Venture Capital', featured: true },
    { name: 'IvyCap Ventures', tag: 'Early & Growth Stage VC', category: 'Venture Capital', featured: true },
    { name: 'KDEM / Startup Karnataka', tag: 'State Innovation Authority', category: 'Innovation Authority', featured: true },
    { name: 'Aum Ventures', tag: 'Global Cross-Border VC', category: 'Venture Capital' },
    { name: 'NextUnicorn.Fund', tag: 'Early-Stage Fund', category: 'Venture Capital' },
    { name: 'SIAN (South India Angel Network)', tag: 'Angel Syndicate', category: 'Angel Network' },
    { name: 'Ideabaaz', tag: 'Startup Ecosystem Platform', category: 'Ecosystem' },
    { name: 'DBS Bank India', tag: 'Institutional Banking Partner', category: 'Banking & Financial' },
    { name: 'State Bank of India', tag: 'Public Sector Banking', category: 'Banking & Financial' },
    { name: 'IACC (Indo-American Chamber)', tag: 'Bilateral Trade Chamber', category: 'Trade & Commerce' },
    { name: 'TiE Bangalore', tag: 'Global Entrepreneur Network', category: 'Founder Community' },
    { name: 'Headstart Network', tag: 'Grassroots Startup Hub', category: 'Founder Community' },
    { name: 'eChai Ventures', tag: 'Founder Community', category: 'Founder Community' },
    { name: 'Finsu Advisors / FINVAYU', tag: 'Strategic Advisory', category: 'Advisory' },
  ] satisfies VentureEntity[],

  // Chapter 02: The Rooms (5 stacking panels)
  rooms: [
    {
      id: 'sprint',
      numeral: '01',
      org: 'Machine Intelligence & Applied AI',
      role: 'Domain Winner & Systems Builder',
      dates: '2025 — Present',
      highlightWord: 'Autonomous',
      outcomes: [
        'Built an end-to-end AI Insurance Claim Automation Platform with 5 modular pipelines: CV damage scoring, instant fraud triage, payout rule estimator, and LLM drafting.',
        'Delivered complete evaluation in under 2.5 seconds per claim in front of senior enterprise jury, securing Top 5 across 60+ teams (180+ developers).',
        'Architected autonomous agent workflows, computer vision classifiers, and latency-budgeted inference APIs for mission-critical tasks.',
      ],
      metric: {
        value: 'Top 5',
        label: 'Domain Winner (60+ Teams)',
      },
      tag: 'Applied AI & ML',
    },
    {
      id: 'ecell',
      numeral: '02',
      org: 'ECell, RV University',
      role: 'President',
      dates: '2024 — Present',
      highlightWord: 'Presidential',
      outcomes: [
        'Progressed from Head to Director of Partnerships to President, directing strategic partnerships, campus venture engagement, and student founder initiatives.',
        'Closed ₹13,00,000 across Kalpavikas 1.0 and 2.0 (₹5L in year one, scaled to ₹8L in year two, +60% YoY) through disciplined 30-day cold outreach sprints.',
        'Structured institutional deals with 20 corporate partners including Mercedes-Benz, Cisco, TVS Motors, and Red Bull with zero prior warm introductions.',
      ],
      metric: {
        value: '₹13L',
        label: 'Capital Closed (+60% YoY)',
      },
      tag: 'Executive Governance',
    },
    {
      id: 'aws',
      numeral: '03',
      org: 'AWS Student Builders Group',
      role: 'Core Member',
      dates: '2024 — Present',
      highlightWord: 'Infrastructure',
      outcomes: [
        'Active member of the student builder cohort at RV University focused on practical cloud infrastructure and AWS serverless solutions.',
        'Architecting event-driven pipelines, serverless compute, and cloud-native AI integration using AWS Lambda, DynamoDB, and API Gateway.',
        'Leading developer workshops bridging fundamental systems architecture with production deployments.',
      ],
      metric: {
        value: 'Cloud Native',
        label: 'Architectural Focus',
      },
      tag: 'Cloud Systems',
    },
    {
      id: 'cedat',
      numeral: '04',
      org: 'CEDAT · Venture Ecosystem',
      role: 'Project Executive',
      dates: 'Jun 2026 — Present',
      highlightWord: 'Venture',
      outcomes: [
        'Coordinated operations for the Bengaluru Regional Finale of the Startup World Cup in collaboration with Pegasus Tech Ventures.',
        'Interfaced directly with early-stage venture capital funds, angel syndicates, institutional banks, and state innovation authorities (KDEM, Blume Ventures, IvyCap Ventures).',
        'Evaluated early founder traction, unit economics, and market defensibility across enterprise software and deep tech.',
      ],
      metric: {
        value: '$1M',
        label: 'Regional Finale Stakes',
      },
      tag: 'Venture Operations',
    },
    {
      id: 'community-ops',
      numeral: '05',
      org: 'Community & Technical Operations',
      role: 'Lead Organizer & Community Architect',
      dates: '2024 — Present',
      highlightWord: 'Execution',
      outcomes: [
        'Scaled and curated a 10K+ member Telegram broadcast network on mindset, technical careers, and financial literacy.',
        'Co-coordinated operations for Argonyx ’26 (24-hour campus hackathon with 220+ teams across 5 countries, jury from Google, J.P. Morgan, Morgan Stanley).',
        'Built student mentorship pipelines and placement prep cohorts, bridging university curriculum with real-world engineering standards.',
      ],
      metric: {
        value: '10K+',
        label: 'Broadcast Network Scaled',
      },
      tag: 'Community & Operations',
    },
  ] satisfies RoomPanel[],

  // Folded strengths summary list for Chapter 02
  foldedStrengths: [
    'Autonomous AI & CV pipelines',
    'Cloud architecture (AWS)',
    'High-stakes dealmaking',
    'Executive leadership',
    'Technical operations',
  ],

  // Chapter 03: The Builds (8 real projects with live GitHub stats fallback)
  builds: [
    {
      id: 'claims-ai',
      title: 'AI Insurance Claim Evaluator',
      description:
        'Domain Winner at AI Build Sprint. Autonomous claim verification, fraud scoring classifier, and computer vision damage inspection engine in under 2.5s.',
      stack: ['Python', 'FastAPI', 'Computer Vision', 'OpenRouter', 'React'],
      year: '2026',
      repoUrl: 'https://github.com/snixxfs/ai-insurance-claim',
      defaultLanguage: 'Python',
      defaultStars: 14,
      defaultUpdated: 'Feb 2026',
    },
    {
      id: 'trash-rover',
      title: 'Smart Waste Segregation Rover',
      description:
        'Autonomous solar-hybrid IoT rover with ESP8266, 3-DOF robotic arm, ultrasonic rangefinders and soil-moisture sensor fusion achieving 90% sorting accuracy.',
      stack: ['C++', 'ESP8266', 'Kinematics', 'Solar Hardware'],
      year: '2025',
      repoUrl: 'https://github.com/snixxfs/waste-rover',
      defaultLanguage: 'C++',
      defaultStars: 8,
      defaultUpdated: 'Oct 2025',
    },
    {
      id: 'pharmaguard',
      title: 'PharmaGuard Genomic Risk Engine',
      description:
        'Adverse drug reaction prediction mapping patient genetic loci and metabolizer phenotypes to contraindicated medications. Shipped in 24h at RIFT 2026.',
      stack: ['Python', 'Bioinformatics', 'Scikit-Learn', 'Pandas'],
      year: '2026',
      repoUrl: 'https://github.com/snixxfs/pharmaguard',
      defaultLanguage: 'Python',
      defaultStars: 11,
      defaultUpdated: 'Jan 2026',
    },
    {
      id: 'startup-evaluator',
      title: 'AI Startup Evaluator Bot',
      description:
        'Autonomous Telegram agent parsing pitch synopses, running TAM calculations, competitive moat audits and investor risk synthesis for 100+ student founders.',
      stack: ['Python', 'Telegram API', 'OpenRouter', 'Mistral-Large'],
      year: '2025',
      repoUrl: 'https://github.com/snixxfs/startup-evaluator',
      defaultLanguage: 'Python',
      defaultStars: 9,
      defaultUpdated: 'Nov 2025',
    },
    {
      id: 'tax-assistant',
      title: 'India Tax Regime Assistant',
      description:
        'Conversational financial engine ingesting annual salary breakdowns, parsing Section 87A deductions, and comparing New vs Old tax regimes in under 3 seconds.',
      stack: ['Python', 'Mistral 7B', 'Financial Rules', 'FastAPI'],
      year: '2025',
      repoUrl: 'https://github.com/snixxfs/tax-assistant',
      defaultLanguage: 'Python',
      defaultStars: 6,
      defaultUpdated: 'Dec 2025',
    },
    {
      id: 'btc-backtester',
      title: 'BTC Quant Strategy Backtester',
      description:
        'Quantitative backtesting engine evaluating EMA200 & RSI crossover mechanics across 30 days of 15m Bitcoin candles with equity curves and Sharpe estimates.',
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      year: '2025',
      repoUrl: 'https://github.com/snixxfs/btc-backtester',
      defaultLanguage: 'Python',
      defaultStars: 7,
      defaultUpdated: 'Aug 2025',
    },
    {
      id: 'gdg-portal',
      title: 'GDG RVU Official Chapter Portal',
      description:
        'Production community portal for Google Developer Group RVU supporting hackathon registrations, live schedule feeds, and speaker archives.',
      stack: ['HTML5', 'Modern CSS', 'JavaScript ES6+', 'Render CI/CD'],
      year: '2025',
      repoUrl: 'https://github.com/snixxfs/gdg-rvu',
      liveUrl: 'https://gdg-rvu.onrender.com',
      defaultLanguage: 'JavaScript',
      defaultStars: 12,
      defaultUpdated: 'Sep 2025',
    },
    {
      id: 'car-bhai',
      title: 'CAR BHAI Luxury Motion Experience',
      description:
        'Experimental automotive showcase featuring vertical Swiper mechanics, GSAP micro-typography, and spatial procedural engine rev audio synthesis.',
      stack: ['JavaScript', 'GSAP', 'SwiperJS', 'Web Audio API'],
      year: '2025',
      repoUrl: 'https://github.com/snixxfs/car-bhai',
      defaultLanguage: 'JavaScript',
      defaultStars: 5,
      defaultUpdated: 'Jul 2025',
    },
  ] satisfies BuildProject[],

  // Chapter 04: The Voices (All 15 real testimonials from original content)
  voices: [
    {
      id: 'observer',
      quote:
        'I was stuck in the same loop but now I have been taking action from the last 3-4 days… Now I’m trying to rebuild myself brick by brick.',
      author: 'Observer (07)',
      source: 'Telegram Channel Member',
      tag: 'ACTION & MOMENTUM',
      featured: true, // featured spans 2 columns at larger font
    },
    {
      id: 'rudra',
      quote:
        'One of the best posts I’ve read in a long time honestly… so brutally honest and so accurate and not just this one, ur other posts hit the same way too.',
      author: 'RUDRA 🔱',
      source: 'Reader & Builder',
      tag: 'SIGNAL & HONESTY',
    },
    {
      id: 'luthera',
      quote:
        'Channel is damn goated. The only reason to use telegram is for reading his channel posts.',
      author: 'Luthera',
      source: 'Student Founder',
      tag: 'HIGH SIGNAL',
    },
    {
      id: 'anonymous-productivity',
      quote:
        'Been the most productive version of myself for the last 2 days, simply executing on my plans and take action on stuff I have been putting off for weeks.',
      author: 'Anonymous',
      source: 'Community Member',
      tag: 'PRODUCTIVITY',
    },
    {
      id: 'logymystic',
      quote: 'You helped me getting reality checks 😭❤️',
      author: 'LOGYMYSTIC 🍁🚀🍹',
      source: 'Telegram Subscriber',
      tag: 'REALITY CHECK',
    },
    {
      id: 'eas',
      quote: 'you helped me a lot. Thanks bro',
      author: 'EAS///',
      source: 'Active Member',
      tag: 'PERSONAL GROWTH',
    },
    {
      id: 'ad',
      quote:
        'This is best amazing channel damn… a great thanks to @admin / -snixxfs ❤',
      author: 'Ad 045999',
      source: 'Channel Subscriber',
      tag: 'COMMUNITY',
    },
    {
      id: 'idrees',
      quote:
        'Extraordinary stuff, keep sending, salute to the man behind the scene ❤️',
      author: 'Idrees Khan',
      source: 'Engineering Student',
      tag: 'CONSISTENCY',
    },
    {
      id: 'mitesh',
      quote:
        'Wonderful Insight and thank you for taking such great efforts for putting such insight to us ❤️',
      author: 'Mitesh',
      source: 'Community Member',
      tag: 'STRATEGIC INSIGHT',
    },
    {
      id: 'jettlagg',
      quote: 'your notes here helped me a lot ❤️😌',
      author: 'jettlagg',
      source: 'Reader',
      tag: 'PRACTICAL NOTES',
    },
    {
      id: 'anonymous-finance',
      quote:
        'The only channel on the telegram to get upgrade your financial intelligence at rocket speed 🚀',
      author: 'Anonymous',
      source: 'Finance Enthusiast',
      tag: 'FINANCIAL SIGNAL',
    },
    {
      id: 'mayank',
      quote: 'Best telegram channel 🔥🔥',
      author: 'Mayank Devli',
      source: 'Broadcast Subscriber',
      tag: 'COMMUNITY',
    },
    {
      id: 'gaurav',
      quote: 'G.O.A.T 🐐 Snixx',
      author: 'Gaurav',
      source: 'Community Member',
      tag: 'DISPATCH',
    },
    {
      id: 'community-member',
      quote: 'Excellent bro 👏 huge respect',
      author: 'Community Member',
      source: 'Reader',
      tag: 'RESPECT',
    },
    {
      id: 'prakhar',
      quote:
        'Genuinely changed how I approach mornings, cold outreach, and decision-making under pressure.',
      author: 'Prakhar',
      source: 'Student Founder',
      tag: 'MINDSET',
    },
  ] satisfies VoiceTestimonial[],

  // Full technical stack from original content (included in Chapter 05)
  techStackCategories: [
    {
      label: 'AI & Machine Intelligence',
      items: [
        'Python',
        'LLM APIs & Prompt Engineering',
        'OpenRouter',
        'Mistral Orchestration',
        'Computer Vision (OpenCV)',
        'Bioinformatics Machine Learning',
        'Agentic Workflows',
      ],
    },
    {
      label: 'Cloud & Infrastructure',
      items: [
        'AWS Cloud (Student Builders Core)',
        'Google Cloud Computing Essentials',
        'Serverless & Lambda',
        'Docker Containerization',
        'n8n Webhook Pipelines',
        'CI/CD & Render / Vercel',
      ],
    },
    {
      label: 'Frontend & Architecture',
      items: [
        'TypeScript',
        'React 19',
        'Three.js & WebGL',
        'GSAP & ScrollTrigger',
        'Tailwind & Modern CSS',
        'Figma Design Systems',
      ],
    },
    {
      label: 'Hardware & IoT',
      items: [
        'ESP8266 & ESP32 Microcontrollers',
        'Arduino C / C++',
        'Sensor Fusion Arrays (Ultrasonic, Moisture)',
        '3-DOF Robotic Kinematics',
        'WiFi WebSocket Telemetry',
      ],
    },
    {
      label: 'Venture & Operations',
      items: [
        'Presidential Governance (ECell)',
        'Enterprise Sponsorship Sales (₹13L+ Closed)',
        'J.P. Morgan Investment Banking Program (DCF, M&A)',
        'Strategy Backtesting',
        'Startup World Cup Operations (CEDAT / Pegasus)',
      ],
    },
  ],

  // All 4 certifications from original content
  certifications: [
    { name: 'Google Cloud Computing Foundations', issuer: 'Google Cloud' },
    { name: 'Investment Banking Virtual Experience Program', issuer: 'J.P. Morgan' },
    { name: 'Red Bull Basement Global University Innovator', issuer: 'Red Bull' },
    { name: 'Advanced Web & Cloud Architect Training', issuer: 'DevTown / AWS Community' },
  ] satisfies CertCredential[],
}

// Runtime check: Verify exactly 15 testimonials
console.assert(dealRoomData.voices.length === 15, `Expected 15 testimonials, got ${dealRoomData.voices.length}`)
