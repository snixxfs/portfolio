export interface BrandItem {
  name: string
  category: 'Tech' | 'Automotive' | 'Lifestyle & F&B'
  logoText: string
  dealNote?: string
}

export interface ImpactStat {
  num: string
  label: string
  desc: string
  breakdown?: string
}

export interface StrengthItem {
  num: string
  title: string
  proof: string
}

export interface LeadershipItem {
  role: string
  org: string
  years: string
  story: string
  tag: string
  tone: 'paper' | 'dark' | 'ink'
  numeral: string
}

export interface EditorialProject {
  id: string
  title: string
  tagline: string
  year: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Testimonial {
  id: string
  author: string
  date: string
  quote: string
  tag: string
  initials: string
  featured?: boolean
}

export interface CertItem {
  name: string
  issuer: string
  icon: string
}

export const personalData = {
  name: 'Ayush S Kulkarni',
  role: 'President, ECell RV University',
  secondaryRole: 'CSE (AI & ML) Student · Builder',
  email: 'ayushak12n@gmail.com',
  heroIntro: "I'm the student who got Mercedes-Benz, Cisco and Red Bull to say yes to a college fest.",
  heroSticker: 'President, ECell RV',
  heroMonogram: 'AK',
  location: 'Bengaluru, India',

  // Fact sheet for About sticky left column (replaces portrait)
  factSheet: {
    basedIn: 'Bengaluru, India',
    studying: 'CSE (AI & ML), RV University',
    currently: 'President, ECell RVU',
    also: 'AWS Student Builders Group · CEDAT Venture Exec',
    pullQuote: 'I build systems that close deals and make things run.',
  },

  stats: [
    {
      num: '20',
      label: 'Corporate Brands Closed',
      desc: 'Signed Fortune 500s, OEMs and global consumer brands via 100% cold outreach and executive deal negotiations.',
    },
    {
      num: '₹13L',
      label: 'Total Sponsorship Capital Raised',
      desc: 'Executed across Kalpavikas 1.0 and 2.0 with zero prior brand precedent.',
      breakdown: '₹2.8L cash + ₹10.2L in-kind contributions',
    },
    {
      num: '220+',
      label: "Hackathon Teams at Argonyx '26",
      desc: "One of three main coordinators running a 24-hour national flagship across 5 countries, judged by J.P. Morgan, Morgan Stanley, Google and NASSCOM.",
    },
    {
      num: 'Top 5',
      label: 'AI Build Sprint Domain Winner',
      desc: 'Engineered an end-to-end AI Insurance Claim Automation Platform — one of 5 winners among 60+ competing teams.',
    },
    {
      num: '10K+',
      label: 'Telegram Community Scaled',
      desc: 'Built and grew a high-signal broadcast channel to 10,000+ members; advisors include mentors across real estate, finance, and international taxation.',
    },
  ] satisfies ImpactStat[],

  aboutText: [
    "Most college fest organizers ask for small club budgets. I didn't want club budgets.",
    "I spent 30-day outreach cycles cold-pitching executives at Mercedes-Benz, Cisco, TVS Motors and Red Bull until ₹13,00,000 in capital and high-value partnerships were locked.",
    "Beyond student leadership, I engineer machine learning pipelines, co-lead operations for the AWS Student Builders Group, and support venture initiatives interfacing with founder dealflows at CEDAT.",
  ],

  marginaliaNote: "Yes, I actually cold-emailed every single one of them.",

  strengths: [
    {
      num: '01',
      title: 'High-Velocity Cold Outreach',
      proof: 'Closed 20 enterprise deals in 30-day pitch cycles with zero existing warm intros.',
    },
    {
      num: '02',
      title: 'Machine Learning & Systems',
      proof: 'Domain Winner at AI Build Sprint, deploying production LLM deal evaluation pipelines.',
    },
    {
      num: '03',
      title: 'Large-Scale Flagship Orchestration',
      proof: "Coordinated Argonyx '26 across 220+ teams, 5 countries, and tier-1 institutional judges.",
    },
    {
      num: '04',
      title: 'Venture & Dealflow Interface',
      proof: 'Managed Startup World Cup Bengaluru operations at CEDAT with Pegasus Tech Ventures.',
    },
    {
      num: '05',
      title: 'IoT Hardware & Embedded Systems',
      proof: 'Built autonomous ESP8266 rover achieving 90% waste-sorting accuracy; placed 3rd in inter-collegiate hardware hack.',
    },
    {
      num: '06',
      title: 'Community Architecture',
      proof: 'Grew 10,000+ member Telegram community; placement coordinator bridging students and recruiters at RVU.',
    },
  ] satisfies StrengthItem[],

  leadership: [
    {
      role: 'President',
      org: 'ECell RV University',
      years: '2024 — Present',
      story: 'Progressed from Head to Director of Partnerships and Engagements to President. Lead strategic partnerships, campus engagement, and entrepreneurship initiatives. Closed ₹13L in sponsorships across Kalpavikas 1.0 & 2.0.',
      tag: 'Executive Leadership',
      tone: 'paper',
      numeral: '01',
    },
    {
      role: 'Core Member',
      org: 'AWS Student Builders Group',
      years: '2024 — Present',
      story: 'Contribute to a student-led community focused on cloud technologies, AWS, and building practical technical solutions. Architecting hands-on cloud workflows and serverless compute cohorts.',
      tag: 'Cloud & Infrastructure',
      tone: 'dark',
      numeral: '02',
    },
    {
      role: 'Main Coordinator',
      org: "Argonyx '26 Hackathon",
      years: '2026 Flagship',
      story: "One of three coordinators steering 220+ registered teams from 5 countries. Coordinated event planning, participant outreach, judges from JPMC, Morgan Stanley, Google, and NASSCOM, mentors, sponsorships, and on-ground execution.",
      tag: 'Scale & Operations',
      tone: 'ink',
      numeral: '03',
    },
    {
      role: 'Project Executive',
      org: 'CEDAT',
      years: 'Jun 2026 — Present',
      story: "Oversee projects and develop strategic partnerships across Bengaluru's startup and venture capital ecosystem. Engage with VC firms, angel syndicates, investors, banks, and government bodies.",
      tag: 'Venture Ecosystem',
      tone: 'paper',
      numeral: '04',
    },
  ] satisfies LeadershipItem[],

  venture: {
    pullQuote: '"Connecting ambitious student founders directly with early-stage venture capital and tier-1 partner ecosystems."',
    p1: "At CEDAT, I supported the regional finale of the Startup World Cup in Bengaluru, organized in direct partnership with Pegasus Tech Ventures.",
    p2: "Interfaced with venture partners, founders, and angel syndicates to understand how early-stage capital actually evaluates signal from noise.",
    badges: ['Pegasus Tech Ventures', 'CEDAT', 'Startup World Cup', 'Angel Networks', 'Blume Ventures', 'IvyCap Ventures'],
  },

  brands: [
    { name: 'Mercedes-Benz', category: 'Automotive', logoText: 'MERCEDES-BENZ' },
    { name: 'Cisco', category: 'Tech', logoText: 'CISCO' },
    { name: 'Red Bull', category: 'Lifestyle & F&B', logoText: 'RED BULL' },
    { name: 'Nokia', category: 'Tech', logoText: 'NOKIA' },
    { name: 'TVS Motors', category: 'Automotive', logoText: 'TVS' },
    { name: 'Mahindra', category: 'Automotive', logoText: 'MAHINDRA' },
    { name: 'HP', category: 'Tech', logoText: 'HP' },
    { name: 'ixigo', category: 'Tech', logoText: 'IXIGO' },
    { name: 'CodeChef', category: 'Tech', logoText: 'CODECHEF' },
    { name: 'Physics Wallah', category: 'Tech', logoText: 'PHYSICS WALLAH' },
    { name: 'JustVend', category: 'Tech', logoText: 'JUSTVEND' },
    { name: 'RunAnywhere', category: 'Tech', logoText: 'RUNANYWHERE' },
    { name: 'MileTech', category: 'Tech', logoText: 'MILETECH' },
    { name: 'Technosport', category: 'Lifestyle & F&B', logoText: 'TECHNOSPORT' },
    { name: 'Belgium Waffle', category: 'Lifestyle & F&B', logoText: 'BELGIUM WAFFLE' },
    { name: "Atty's Bakery", category: 'Lifestyle & F&B', logoText: "ATTY'S BAKERY" },
    { name: 'EasyBites by Empire', category: 'Lifestyle & F&B', logoText: 'EASYBITES' },
  ] satisfies BrandItem[],

  projects: [
    {
      id: 'ai-claim-automation',
      title: 'AI Insurance Claim Evaluator',
      tagline: 'Domain Winner · AI Build Sprint. Autonomous damage computer vision and fraud score evaluation engine — 5 modular pipelines, <2.5s per claim.',
      year: '2026',
      tags: ['FastAPI', 'Computer Vision', 'LLM Agent', 'Python', 'OpenRouter'],
      githubUrl: 'https://github.com/snixxfs/ai-insurance-claim',
    },
    {
      id: 'trash-rover',
      title: 'Smart Waste Segregation Rover',
      tagline: '90% sorting accuracy. Autonomous solar-hybrid IoT rover with ESP8266, 3-DOF robotic arm, ultrasonic + moisture sensor fusion.',
      year: '2025',
      tags: ['ESP8266', 'C++', 'Arduino', 'Robotics', 'Solar Hardware'],
      githubUrl: 'https://github.com/snixxfs/waste-rover',
    },
    {
      id: 'pharmaguard',
      title: 'PharmaGuard — Genomic Risk Engine',
      tagline: 'Adverse drug reaction prediction based on patient genetic markers. Built overnight in 24 hours at RIFT 2026 (Physics Wallah IOI).',
      year: '2026',
      tags: ['Python', 'Bioinformatics', 'Scikit-Learn', 'Pandas'],
      githubUrl: 'https://github.com/snixxfs/pharmaguard',
    },
    {
      id: 'startup-evaluator',
      title: 'AI Startup Evaluator Bot',
      tagline: 'Automated TAM calculation, competitive moat audit & risk synthesis. Used actively by 100+ student founders inside RVU ECell.',
      year: '2025',
      tags: ['Python', 'Telegram Bot API', 'OpenRouter', 'Mistral-Large'],
      githubUrl: 'https://github.com/snixxfs/startup-evaluator',
    },
    {
      id: 'btc-backtester',
      title: 'BTC Quant Strategy Backtester',
      tagline: 'Algorithmic backtesting: EMA200 & RSI crossovers on 30 days of 15-minute Bitcoin candles. Sharpe ratio estimates + equity curve plotting.',
      year: '2025',
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      githubUrl: 'https://github.com/snixxfs/btc-backtester',
    },
    {
      id: 'gdg-portal',
      title: 'GDG RVU Chapter Portal',
      tagline: 'Production community platform for Google Developer Group RVU. Hackathon registrations, speaker profiles, and event archives. Live in production.',
      year: '2025',
      tags: ['HTML5', 'Modern CSS', 'JavaScript ES6+', 'Render CI/CD'],
      liveUrl: 'https://gdg-rvu.onrender.com',
      githubUrl: 'https://github.com/snixxfs/gdg-rvu',
    },
    {
      id: 'vision-rover',
      title: 'Vision Rover — Real-time WiFi Robot',
      tagline: '3rd Place · 24h inter-collegiate hardware hack. ESP8266-driven robot with low-latency bidirectional WiFi socket control from any mobile browser.',
      year: '2024',
      tags: ['ESP8266', 'C++', 'WebSockets', 'Hardware Prototyping'],
      githubUrl: 'https://github.com/snixxfs/vision-rover',
    },
    {
      id: 'car-bhai',
      title: 'CAR BHAI — Luxury Motion Experience',
      tagline: 'Interactive automotive showcase with GSAP micro-animations, vertical SwiperJS mechanics, and dynamic procedural engine rev audio synthesis.',
      year: '2025',
      tags: ['JavaScript ES6+', 'GSAP', 'SwiperJS', 'Web Audio API'],
      githubUrl: 'https://github.com/snixxfs/car-bhai',
    },
  ] satisfies EditorialProject[],

  // 15 testimonials: 12 main + 3 from shortStrip
  testimonials: [
    {
      id: 'rudra',
      author: 'RUDRA 🔱',
      date: 'March 2026',
      quote: "One of the best posts I've read in a long time honestly… so brutally honest and so accurate and not just this one, ur other posts hit the same way too.",
      tag: 'MINDSET & HONESTY',
      initials: 'RD',
      featured: false,
    },
    {
      id: 'luthera',
      author: 'Luthera',
      date: 'November 2026',
      quote: 'Channel is damn goated. The only reason to use telegram is for reading his channel posts',
      tag: 'HIGH-SIGNAL VALUE',
      initials: 'LT',
      featured: false,
    },
    {
      id: 'observer',
      author: 'Observer (07)',
      date: 'March 2026',
      quote: "I was stuck in the same loop but now I have been taking action from the last 3-4 days… Now I'm trying to rebuild myself brick by brick",
      tag: 'ACTION & MOMENTUM',
      initials: 'OB',
      featured: true,
    },
    {
      id: 'logymystic',
      author: 'LOGYMYSTIC 🍁🚀🍹',
      date: 'November 2026',
      quote: 'You helped me getting reality checks 😭❤️',
      tag: 'REALITY CHECK',
      initials: 'LM',
      featured: false,
    },
    {
      id: 'eas',
      author: 'EAS///',
      date: 'August 2026',
      quote: 'you helped me a lot. Thanks bro',
      tag: 'PERSONAL GROWTH',
      initials: 'EA',
      featured: false,
    },
    {
      id: 'ad',
      author: 'Ad 045999',
      date: 'August 2025',
      quote: 'This is best amazing channel damn… a great thanks to @admin / -snixxfs ❤',
      tag: 'COMMUNITY FEEDBACK',
      initials: 'AD',
      featured: false,
    },
    {
      id: 'idrees',
      author: 'Idrees Khan',
      date: 'June 2025',
      quote: 'Extraordinary stuff, keep sending, salute to the man behind the scene ❤️',
      tag: 'CONSISTENCY & DEPTH',
      initials: 'IK',
      featured: false,
    },
    {
      id: 'mitesh',
      author: 'Mitesh',
      date: 'August 2025',
      quote: 'Wonderful Insight and thank you for taking such great efforts for putting such insight to us ❤️',
      tag: 'STRATEGIC INSIGHT',
      initials: 'MI',
      featured: false,
    },
    {
      id: 'jettlagg',
      author: 'jettlagg',
      date: 'August 2025',
      quote: 'your notes here helped me a lot ❤️😌',
      tag: 'PRACTICAL NOTES',
      initials: 'JL',
      featured: false,
    },
    {
      id: 'anonymous-productivity',
      author: 'Anonymous',
      date: 'March 2026',
      quote: 'Been the most productive version of myself for the last 2 days, simply executing on my plans and take action on stuff I have been putting off for weeks.',
      tag: 'PRODUCTIVITY & EXECUTION',
      initials: 'AN',
      featured: true,
    },
    {
      id: 'anonymous-finance',
      author: 'Anonymous',
      date: 'August 2025',
      quote: 'The only channel on the telegram to get upgrade your financial intelligence at rocket speed 🚀',
      tag: 'FINANCIAL INTELLIGENCE',
      initials: 'AN',
      featured: false,
    },
    {
      id: 'mayank',
      author: 'Mayank Devli',
      date: 'June 2026',
      quote: 'Best telegram channel 🔥🔥',
      tag: 'COMMUNITY LOVE',
      initials: 'MD',
      featured: false,
    },
    {
      id: 'gaurav',
      author: 'Gaurav',
      date: 'October 2024',
      quote: 'G.O.A.T 🐐 Snixx',
      tag: 'GOAT STATUS',
      initials: 'GV',
      featured: false,
    },
    {
      id: 'aryan',
      author: 'Aryan',
      date: 'July 2025',
      quote: "Couldn't believe the quality of insights on this channel. Keep it going!",
      tag: 'QUALITY CONTENT',
      initials: 'AR',
      featured: false,
    },
    {
      id: 'prakhar',
      author: 'Prakhar',
      date: 'February 2026',
      quote: 'Genuinely changed how I approach mornings and decision-making. Thank you.',
      tag: 'MINDSET SHIFT',
      initials: 'PK',
      featured: false,
    },
  ] satisfies Testimonial[],

  certifications: [
    { name: 'Google Cloud Computing Foundations', issuer: 'Google Cloud', icon: '☁️' },
    { name: 'Investment Banking Virtual Experience', issuer: 'J.P. Morgan', icon: '🏦' },
    { name: 'Red Bull Basement Global University Innovator', issuer: 'Red Bull', icon: '⚡' },
    { name: 'Full Stack Web & Cloud Architect Training', issuer: 'DevTown / AWS Community', icon: '💻' },
  ] satisfies CertItem[],

  techStackFlow: "I build in Python, React and AWS, and I'm learning to ship faster than I think.",
  techStackCategories: [
    {
      title: 'AI & Machine Intelligence',
      items: [
        { name: 'Python', note: 'AI workflows, data pipelines, FastAPI' },
        { name: 'LLM APIs & Prompt Engineering', note: 'OpenRouter, Mistral orchestration' },
        { name: 'Computer Vision (OpenCV)', note: 'Damage scoring, classification' },
        { name: 'Bioinformatics ML', note: 'Genomic risk prediction (PharmaGuard)' },
        { name: 'Agentic Workflows', note: 'n8n webhooks, Telegram bots' },
      ],
    },
    {
      title: 'Cloud & Infrastructure',
      items: [
        { name: 'AWS Cloud', note: 'Student Builders core member' },
        { name: 'Google Cloud (GCP)', note: 'Certified Essentials' },
        { name: 'Docker', note: 'Containerized deployment & microservices' },
        { name: 'CI/CD (Render / Vercel)', note: 'Production deployment pipelines' },
        { name: 'n8n Webhook Pipelines', note: 'Serverless HMAC-SHA256 automation' },
      ],
    },
    {
      title: 'Frontend & Creative Systems',
      items: [
        { name: 'TypeScript & React 19', note: 'Typed architecture & modern hooks' },
        { name: 'Three.js & WebGL', note: 'Interactive creative graphics' },
        { name: 'GSAP & ScrollTrigger', note: 'Premium motion design' },
        { name: 'Tailwind & Modern CSS', note: 'Grid, clamp, custom properties' },
        { name: 'Figma', note: 'UI/UX & design systems' },
      ],
    },
    {
      title: 'IoT & Embedded Robotics',
      items: [
        { name: 'ESP8266 & ESP32', note: 'Microcontroller firmware' },
        { name: 'Arduino C / C++', note: 'Real-time sensor control' },
        { name: 'Sensor Fusion Arrays', note: 'Ultrasonic, moisture, range' },
        { name: '3-DOF Robotic Kinematics', note: 'Mechanical arm actuations' },
        { name: 'WiFi WebSocket Telemetry', note: '15m range real-time control' },
      ],
    },
    {
      title: 'Venture, Finance & Strategy',
      items: [
        { name: 'Presidential Leadership (ECell)', note: 'Partnerships, strategy, campus' },
        { name: 'Enterprise Sponsorship Sales', note: '₹13L+ closed via cold outreach' },
        { name: 'J.P. Morgan IB Program', note: 'M&A, DCF valuation, deal mechanics' },
        { name: 'Financial Modelling', note: 'Strategy backtesting, quant analytics' },
        { name: 'Venture Capital Ecosystem', note: 'CEDAT, Pegasus, angel networks' },
      ],
    },
    {
      title: 'Execution & Operations',
      items: [
        { name: "Argonyx '26 Coordination", note: '220+ teams, 5 countries' },
        { name: 'Cross-Functional Leadership', note: 'Hackathons, events, placements' },
        { name: 'Cold Pitching & Deal Closing', note: '30-day exec pitch cycles' },
        { name: 'Algorithmic Backtesting', note: 'EMA200 & RSI on crypto candles' },
      ],
    },
  ],

  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/ayushsk' },
    { label: 'GitHub', url: 'https://github.com/snixxfs' },
    { label: 'Telegram', url: 'https://t.me/snixxfs' },
    { label: 'Email', url: 'mailto:ayushak12n@gmail.com' },
  ],
}

// Runtime assertion: must have exactly 15 testimonials
console.assert(personalData.testimonials.length === 15, `Expected 15 testimonials, got ${personalData.testimonials.length}`)
