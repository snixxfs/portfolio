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
}

export interface EditorialProject {
  id: string
  title: string
  tagline: string
  year: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  placeholderImage: string
}

export const personalData = {
  name: 'Ayush S Kulkarni',
  role: 'President, ECell RV University',
  secondaryRole: 'CSE (AI & ML) Student · Builder',
  email: 'ayushak12n@gmail.com',
  heroIntro: "I'm the student who got Mercedes-Benz, Cisco and Red Bull to say yes to a college fest.",
  heroSticker: 'President, ECell RV',
  location: 'Bengaluru, India',
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
      label: 'Hackathon Teams at Argonyx ’26',
      desc: 'One of three main coordinators running a 24-hour national flagship across 5 countries, judged by J.P. Morgan, Morgan Stanley, Google and NASSCOM.',
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
      proof: 'Coordinated Argonyx ’26 across 220+ teams, 5 countries, and tier-1 institutional judges.',
    },
    {
      num: '04',
      title: 'Venture & Dealflow Interface',
      proof: 'Managed Startup World Cup Bengaluru operations at CEDAT with Pegasus Tech Ventures.',
    },
  ] satisfies StrengthItem[],

  leadership: [
    {
      role: 'President',
      org: 'ECell RV University',
      years: '2024 — Present',
      story: 'Built the entrepreneurship cell into an executive-backed engine, closing ₹13L in sponsorships across Kalpavikas 1.0 & 2.0.',
      tag: 'Executive Leadership',
      tone: 'paper',
    },
    {
      role: 'Core Member',
      org: 'AWS Student Builders Group',
      years: '2024 — Present',
      story: 'Architecting hands-on cloud workflows, serverless compute, and training cohorts in modern AWS infrastructure.',
      tag: 'Cloud & Infrastructure',
      tone: 'dark',
    },
    {
      role: 'Main Coordinator',
      org: 'Argonyx ’26 Hackathon',
      years: '2026 Flagship',
      story: 'One of three coordinators steering 220+ teams from 5 countries with panels from Morgan Stanley, Google, and JPMC.',
      tag: 'Scale & Operations',
      tone: 'ink',
    },
  ] satisfies LeadershipItem[],

  venture: {
    pullQuote: "“Connecting ambitious student founders directly with early-stage venture capital and tier-1 partner ecosystems.”",
    p1: "At CEDAT, I supported the regional finale of the Startup World Cup in Bengaluru, organized in direct partnership with Pegasus Tech Ventures.",
    p2: "Interfaced with venture partners, founders, and angel syndicates to understand how early-stage capital actually evaluates signal from noise.",
    badges: ['Pegasus Tech Ventures', 'CEDAT', 'Startup World Cup', 'Angel Networks'],
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
      tagline: 'Production damage computer vision and automated fraud score evaluation engine.',
      year: '2026',
      tags: ['FastAPI', 'Computer Vision', 'LLM Agent', 'Python'],
      liveUrl: 'https://github.com/snixxfs',
      githubUrl: 'https://github.com/snixxfs',
      placeholderImage: '/ayush_placeholder_claim.svg',
    },
    {
      id: 'dealflow-intelligence',
      title: 'Dealflow AI Intelligence Platform',
      tagline: 'Screening pitch decks, founder credentials, and cross-border regulatory filings.',
      year: '2025',
      tags: ['OpenRouter', 'TypeScript', 'Vector DB', 'Next.js'],
      liveUrl: 'https://github.com/snixxfs',
      githubUrl: 'https://github.com/snixxfs',
      placeholderImage: '/ayush_placeholder_dealflow.svg',
    },
    {
      id: 'argonyx-portal',
      title: 'Argonyx ’26 Management Engine',
      tagline: 'Registration, judging dashboard, and live telemetry for 220+ international teams.',
      year: '2026',
      tags: ['React 19', 'Tailwind', 'PostgreSQL', 'Serverless'],
      liveUrl: 'https://github.com/snixxfs',
      githubUrl: 'https://github.com/snixxfs',
      placeholderImage: '/ayush_placeholder_argonyx.svg',
    },
  ] satisfies EditorialProject[],

  communityQuotes: [
    {
      quote: "One of the best posts I've read in a long time honestly… so brutally honest and accurate.",
      author: 'Rudra 🔱 · Telegram Reader',
    },
    {
      quote: "Channel is damn goated. The only reason to use Telegram is for reading his channel posts.",
      author: 'Luthera · Student Founder',
    },
    {
      quote: "Been the most productive version of myself for the last 2 days, simply executing on my plans.",
      author: 'Anonymous · Active Reader',
    },
  ],

  techStackFlow: "I build in Python, React and AWS, and I'm learning to ship faster than I think.",
  techStackCategories: [
    {
      title: 'Languages & Core Systems',
      items: [
        { name: 'Python', note: 'AI workflows, data pipelines, FastAPI' },
        { name: 'TypeScript', note: 'Frontend architecture & typed contracts' },
        { name: 'C / C++', note: 'Embedded robotics & IoT firmware' },
        { name: 'SQL', note: 'PostgreSQL, schema indexing' },
      ],
    },
    {
      title: 'Cloud, Infrastructure & AI',
      items: [
        { name: 'AWS Cloud', note: 'Student Builders core architecture' },
        { name: 'Docker', note: 'Containerized deployment & microservices' },
        { name: 'OpenRouter / Mistral', note: 'Agentic prompt loops & orchestration' },
        { name: 'Three.js / WebGL', note: 'Interactive creative graphics' },
      ],
    },
  ],

  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/ayushskulkarni' },
    { label: 'GitHub', url: 'https://github.com/snixxfs' },
    { label: 'Telegram', url: 'https://t.me/snixxfs' },
    { label: 'Resume', url: '/ayush_resume.pdf' },
  ],
}
