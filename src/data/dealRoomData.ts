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
    location: 'Bengaluru, India',
    githubUrl: 'https://github.com/snixxfs',
    linkedinUrl: 'https://linkedin.com/in/ayushsk',
    telegramUrl: 'https://t.me/snixxfs',
    topLabel: 'President, ECell RV University  ·  AWS Student Builders Group  ·  Bengaluru',
    heroLinePrefix: 'I got Mercedes-Benz, Cisco and Red Bull to',
    heroLineHighlight: 'back',
    heroLineSuffix: 'a college fest.',
    heroSubsentence:
      'CSE (AI & ML) at RV University. I lead ECell, build with the AWS Student Builders Group, and close deals for student ecosystems.',
  },

  // Chapter 00: The Ledger Strip (3 equal columns at bottom of viewport)
  ledger: [
    {
      id: 'brands',
      number: '20',
      label: 'Brands closed',
      sublabel: 'Fortune 500s & OEMs via cold outreach',
      targetChapter: 'chapter-01',
    },
    {
      id: 'capital',
      number: '₹13L',
      label: 'Sponsorship raised',
      sublabel: '₹2.8L cash + ₹10.2L in-kind (Kalpavikas 1.0 & 2.0)',
      targetChapter: 'chapter-01',
    },
    {
      id: 'scale',
      number: '220+',
      label: 'Teams at Argonyx ’26',
      sublabel: 'Across 5 countries, 24h flagship hackathon',
      targetChapter: 'chapter-02',
    },
  ] satisfies LedgerItem[],

  // Marquee brands ticker
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
    'Physics Wallah',
    'JustVend',
    'RunAnywhere',
    'MileTech',
    'Technosport',
    'Belgium Waffle',
    "Atty's Bakery",
    'EasyBites by Empire',
  ],

  // Chapter 01: The Closes (All 20 verified brands with categories)
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
    { index: '10', name: 'Physics Wallah', category: 'Tech & Telecom', type: 'Cash' },
    { index: '11', name: 'JustVend', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '12', name: 'RunAnywhere', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '13', name: 'MileTech', category: 'Tech & Telecom', type: 'Cash' },
    { index: '14', name: 'Technosport', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '15', name: 'Belgium Waffle', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '16', name: "Atty's Bakery", category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '17', name: 'EasyBites by Empire', category: 'Lifestyle & F&B', type: 'In-Kind' },
    { index: '18', name: 'DevTown', category: 'Tech & Telecom', type: 'In-Kind' },
    { index: '19', name: 'Toyota', category: 'Automotive & Industrial', type: 'In-Kind' },
    { index: '20', name: 'Pegasus Tech Ventures', category: 'Tech & Telecom', type: 'Cash' },
  ] satisfies BrandDeal[],

  // Chapter 02: The Rooms (5 stacking panels)
  rooms: [
    {
      id: 'ecell',
      numeral: '01',
      org: 'ECell, RV University',
      role: 'President',
      dates: '2024 — Present',
      highlightWord: 'Presidential',
      outcomes: [
        'Progressed from Head to Director of Partnerships to President, directing strategic partnerships, campus engagement, and student founder initiatives.',
        'Closed ₹13,00,000 across Kalpavikas 1.0 and 2.0 (₹5L in year one, scaled to ₹8L in year two, +60% YoY) through 30-day cold outreach sprints.',
        'Structured deals with 20 corporate partners including Mercedes-Benz, Cisco, TVS Motors, and Red Bull with zero prior warm introductions.',
      ],
      metric: {
        value: '₹13L',
        label: 'Sponsorship Capital Closed',
      },
      tag: 'Executive Governance',
    },
    {
      id: 'aws',
      numeral: '02',
      org: 'AWS Student Builders Group',
      role: 'Core Member',
      dates: '2024 — Present',
      highlightWord: 'Infrastructure',
      outcomes: [
        'Active member of the student builder cohort at RV University focused on practical cloud infrastructure and AWS solutions.',
        'Architecting serverless compute, event-driven pipelines, and cloud-native AI integration for student cohorts.',
        'Collaborating with developer communities to bridge fundamental systems architecture and real production deployments.',
      ],
      metric: {
        value: 'Cloud Native',
        label: 'Architectural Focus',
      },
      tag: 'Cloud Systems',
    },
    {
      id: 'cedat',
      numeral: '03',
      org: 'CEDAT · Venture Ecosystem',
      role: 'Project Executive',
      dates: 'Jun 2026 — Present',
      highlightWord: 'Venture',
      outcomes: [
        'Coordinated operations for the Bengaluru Regional Finale of the Startup World Cup in collaboration with Pegasus Tech Ventures.',
        'Interfaced directly with early-stage venture capital funds, angel syndicates, institutional banks, and state innovation authorities (KDEM, Blume Ventures, IvyCap Ventures).',
        'Evaluated early founder traction and dealflows at the intersection of capital, regulatory compliance, and market defensibility.',
      ],
      metric: {
        value: '$1M',
        label: 'Regional Finale Stakes',
      },
      tag: 'Venture Operations',
    },
    {
      id: 'argonyx',
      numeral: '04',
      org: 'Argonyx ’26 Flagship Hackathon',
      role: 'Main Coordinator',
      dates: '2026 National Edition',
      highlightWord: 'Execution',
      outcomes: [
        'Served as one of three main coordinators running a 24-hour hackathon with 220+ registered teams across 5 countries.',
        'Directed end-to-end event planning, technical infrastructure, mentor schedules, and institutional sponsor delivery.',
        'Managed jury panels from J.P. Morgan, Morgan Stanley, Google, and NASSCOM evaluating production submissions.',
      ],
      metric: {
        value: '220+',
        label: 'International Teams',
      },
      tag: 'Flagship Operations',
    },
    {
      id: 'sprint',
      numeral: '05',
      org: 'AI Build Sprint',
      role: 'Domain Winner (Top 5 / 60+ Teams)',
      dates: 'Competitive AI Sprint',
      highlightWord: 'Autonomous',
      outcomes: [
        'Built an end-to-end AI Insurance Claim Automation Platform with 5 modular pipelines: CV damage scoring, instant fraud triage, payout rule estimator, and LLM drafting.',
        'Delivered complete evaluation in under 2.5 seconds per claim in front of senior industry technical jury.',
        'Secured 1 of 5 winning positions across 60+ competing teams (180+ participating developers).',
      ],
      metric: {
        value: 'Top 5',
        label: 'Domain Standing',
      },
      tag: 'Machine Intelligence',
    },
  ] satisfies RoomPanel[],

  // Folded strengths summary list for Chapter 02
  foldedStrengths: [
    'Sponsorship strategy',
    'Cold outreach',
    'Executive pitching',
    'Hackathon operations',
    'AI + cloud builds',
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
