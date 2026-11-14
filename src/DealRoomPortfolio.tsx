import { useEffect, useRef, useState, useMemo } from 'react'
import {
  dealRoomData,
  type BrandDeal,
  type RoomPanel,
  type BuildProject,
  type VoiceTestimonial,
  type VentureEntity,
} from './data/dealRoomData'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { HeroConstellation } from './components/HeroConstellation'

gsap.registerPlugin(ScrollTrigger)

interface RepoLiveMeta {
  stars?: number
  language?: string
  updated?: string
}

export function DealRoomPortfolio() {
  const [introDismissed, setIntroDismissed] = useState<boolean>(false)
  const [introSplitting, setIntroSplitting] = useState(false)
  const [introCounter, setIntroCounter] = useState(0)

  const [topBarVisible, setTopBarVisible] = useState(true)
  const [activeChapter, setActiveChapter] = useState('chapter-00')
  const [showProofBar, setShowProofBar] = useState(false)

  const [selectedBrandCategory, setSelectedBrandCategory] = useState<string>('All')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [cursorHover, setCursorHover] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')

  // Live GitHub metadata cache
  const [repoMeta, setRepoMeta] = useState<Record<string, RepoLiveMeta>>({})

  // Local Bengaluru time
  const [bengaluruTime, setBengaluruTime] = useState('')

  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const emailLinkRef = useRef<HTMLAnchorElement>(null)
  const lastScrollY = useRef(0)

  // 1. Live Bengaluru Time Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())
        setBengaluruTime(timeStr)
      } catch {
        setBengaluruTime(new Date().toLocaleTimeString())
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // 2. Fetch Live GitHub Repo Stats (with try/catch & silent fallback)
  useEffect(() => {
    let isMounted = true
    const fetchStats = async () => {
      const results: Record<string, RepoLiveMeta> = {}
      for (const project of dealRoomData.builds) {
        try {
          const match = project.repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
          if (match) {
            const [, owner, repo] = match
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
            if (res.ok) {
              const data = await res.json()
              const updatedDate = data.pushed_at
                ? new Date(data.pushed_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : project.defaultUpdated
              results[project.id] = {
                stars: data.stargazers_count ?? project.defaultStars,
                language: data.language ?? project.defaultLanguage,
                updated: updatedDate,
              }
            }
          }
        } catch {
          // Silent fallback to static verified defaults
        }
      }
      if (isMounted) {
        setRepoMeta(results)
      }
    }
    fetchStats()
    return () => { isMounted = false }
  }, [])

  // 3. Ultra-Smooth Scroll (Lenis) synced directly with GSAP Ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
    }
  }, [])

  // 4. Cinematic Intro Curtain Animation (~1.8s)
  useEffect(() => {
    if (introDismissed) return

    let val = 0
    const countInterval = setInterval(() => {
      val += Math.floor(Math.random() * 4) + 2
      if (val >= 100) {
        val = 100
        clearInterval(countInterval)
        setIntroCounter(100)
        setTimeout(() => {
          setIntroSplitting(true)
          setTimeout(() => {
            setIntroDismissed(true)
          }, 850)
        }, 220)
      } else {
        setIntroCounter(val)
      }
    }, 28)

    const skipIntro = () => {
      clearInterval(countInterval)
      setIntroCounter(100)
      setIntroSplitting(true)
      setTimeout(() => {
        setIntroDismissed(true)
      }, 400)
    }

    window.addEventListener('keydown', skipIntro, { once: true })
    window.addEventListener('click', skipIntro, { once: true })

    return () => {
      clearInterval(countInterval)
      window.removeEventListener('keydown', skipIntro)
      window.removeEventListener('click', skipIntro)
    }
  }, [introDismissed])

  // 5. Custom Cursor (Bone dot -> Brass ring)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // 6. Hero Spotlight Interaction (CSS Mask with gsap.quickTo)
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const xTo = gsap.quickTo(hero, '--spotlight-x', { duration: 0.4, ease: 'power2.out', unit: 'px' })
    const yTo = gsap.quickTo(hero, '--spotlight-y', { duration: 0.4, ease: 'power2.out', unit: 'px' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      xTo(x)
      yTo(y)
    }

    // Auto-drift for touch or idle
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    let tween: gsap.core.Tween | null = null
    if (isTouch) {
      const state = { pct: 20 }
      tween = gsap.to(state, {
        pct: 80,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        onUpdate: () => {
          hero.style.setProperty('--spotlight-x', `${state.pct}%`)
          hero.style.setProperty('--spotlight-y', '45%')
        },
      })
    } else {
      hero.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      if (tween) tween.kill()
    }
  }, [])

  // 7. Scroll Spy & Global Frame States (TopBar hide/show, Proof Bar, Chapter Rail)
  useEffect(() => {
    const chapters = [
      'chapter-00',
      'chapter-01',
      'chapter-02',
      'chapter-03',
      'chapter-04',
      'chapter-05',
    ]

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Top bar hide on scroll down, show on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
          setTopBarVisible(false)
        } else if (lastScrollY.current - currentScrollY > 6) {
          setTopBarVisible(true)
        }
      } else {
        setTopBarVisible(true)
      }
      lastScrollY.current = currentScrollY

      // Proof bar: visible after hero (viewport height), hidden near contact/vault
      const heroHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const nearBottom = currentScrollY + window.innerHeight > docHeight - 400
      setShowProofBar(currentScrollY > heroHeight * 0.7 && !nearBottom)

      // Active Chapter detection
      const scrollMiddle = currentScrollY + window.innerHeight * 0.35
      for (const id of chapters) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollMiddle >= top && scrollMiddle < top + height) {
            setActiveChapter(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 8. Stacking Panels scrub scale & dim (Chapter 02: The Rooms)
  useEffect(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.room-panel')
    if (panels.length === 0) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 769px)', () => {
      panels.forEach((panel, i) => {
        if (i < panels.length - 1) {
          ScrollTrigger.create({
            trigger: panels[i + 1],
            start: 'top 120px',
            end: 'top 96px',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress
              gsap.set(panel, {
                scale: 1 - progress * 0.06,
                opacity: 1 - progress * 0.4,
              })
            },
          })
        }
      })
    })

    return () => mm.revert()
  }, [])

  // 9. 3D Card Tilt on Build Rows and Room Panels
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.build-row, .room-panel, .vault-unlocked-card')
    const cleanups: Array<() => void> = []

    cards.forEach((card) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -3.2
        const rotateY = ((x - centerX) / centerX) * 3.2

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`
      }

      const handleMouseLeave = () => {
        card.style.transform = ''
      }

      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })
    })

    return () => cleanups.forEach((c) => c())
  }, [])

  // 10. Email Magnetic Hover
  useEffect(() => {
    const emailEl = emailLinkRef.current
    if (!emailEl) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = emailEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.2
      const deltaY = (e.clientY - centerY) * 0.2
      gsap.to(emailEl, {
        x: Math.max(-12, Math.min(12, deltaX)),
        y: Math.max(-12, Math.min(12, deltaY)),
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(emailEl, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
    }

    emailEl.addEventListener('mousemove', handleMouseMove)
    emailEl.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      emailEl.removeEventListener('mousemove', handleMouseMove)
      emailEl.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Filtered Brands
  const filteredBrands = useMemo(() => {
    if (selectedBrandCategory === 'All') return dealRoomData.brands
    return dealRoomData.brands.filter((b: BrandDeal) => b.category === selectedBrandCategory)
  }, [selectedBrandCategory])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(dealRoomData.profile.email).then(() => {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2400)
    })
  }

  const onInteractiveEnter = (label: string) => {
    setCursorHover(true)
    setCursorLabel(label)
  }

  const onInteractiveLeave = () => {
    setCursorHover(false)
    setCursorLabel('')
  }

  return (
    <div className="deal-room-root">
      {/* Film Grain Texture Overlay */}
      <div className="deal-grain" aria-hidden="true" />

      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to deal file
      </a>

      {/* Custom Cursor */}
      <div
        className={`deal-cursor ${cursorHover ? 'deal-cursor--hover' : ''}`}
        ref={cursorRef}
        aria-hidden="true"
      >
        <span className="deal-cursor__label">{cursorLabel}</span>
      </div>

      {/* Intro Screen (Cinematic Split-Screen Opening Reveal) */}
      {!introDismissed && (
        <aside
          className={`deal-intro ${introSplitting ? 'deal-intro--split' : ''}`}
          aria-label="Opening executive dossier"
        >
          <div className="deal-intro__half deal-intro__top" />
          <div className="deal-intro__content">
            <span className="deal-intro__tag">CONFIDENTIAL // EXECUTIVE DOSSIER 2026</span>
            <h1 className="deal-intro__name">Ayush S Kulkarni</h1>
            <span className="deal-intro__sub">Applied AI Systems · ECell Presidency · Bengaluru</span>

            {/* Expanding Hairline Progress Bar */}
            <div className="deal-intro__bar-wrap">
              <div
                className="deal-intro__bar"
                style={{ width: `${introCounter}%` }}
              />
            </div>

            <div className="deal-intro__meta">
              <span className="tabular">INITIALIZING THE DEAL ROOM</span>
              <span className="deal-intro__counter tabular">[{introCounter.toString().padStart(2, '0')}%]</span>
            </div>

            <span className="deal-intro__skip-hint">Click or press any key to enter</span>
          </div>
          <div className="deal-intro__half deal-intro__bottom" />
        </aside>
      )}

      {/* Global Frame: Fixed Top Bar (72px, Difference Mode) */}
      <header className={`deal-topbar ${!topBarVisible ? 'deal-topbar--hidden' : ''}`}>
        <a
          href="#chapter-00"
          className="deal-topbar__brand"
          onClick={(e) => { e.preventDefault(); scrollTo('chapter-00') }}
        >
          Ayush S Kulkarni
        </a>

        <nav className="deal-topbar__nav">
          {[
            { id: 'chapter-03', label: 'Work' },
            { id: 'chapter-02', label: 'Leadership' },
            { id: 'chapter-04', label: 'Voices' },
            { id: 'chapter-05', label: 'Contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="deal-topbar__link"
              onClick={(e) => {
                e.preventDefault()
                scrollTo(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${dealRoomData.profile.email}`}
            className="deal-topbar__cta"
          >
            Email me
          </a>
        </nav>
      </header>

      {/* Global Frame: Chapter Rail (Desktop Right Edge) */}
      <nav className="chapter-rail" aria-label="Chapter index">
        {[
          { id: 'chapter-00', num: '00', label: 'Cold Open' },
          { id: 'chapter-01', num: '01', label: 'The Closes' },
          { id: 'chapter-02', num: '02', label: 'The Rooms' },
          { id: 'chapter-03', num: '03', label: 'The Builds' },
          { id: 'chapter-04', num: '04', label: 'The Voices' },
          { id: 'chapter-05', num: '05', label: 'The Close' },
        ].map((ch) => (
          <div className="chapter-rail__item" key={ch.id}>
            <button
              type="button"
              className={`chapter-rail__btn ${activeChapter === ch.id ? 'is-active' : ''}`}
              onClick={() => scrollTo(ch.id)}
              aria-label={`Jump to ${ch.num}: ${ch.label}`}
            >
              <span className="chapter-rail__label">{ch.label}</span>
              <span className="chapter-rail__tick" />
              <span className="chapter-rail__num">{ch.num}</span>
            </button>
          </div>
        ))}
      </nav>

      {/* Global Frame: Proof Bar (Fixed Bottom Center) */}
      <aside className={`proof-bar ${!showProofBar ? 'proof-bar--hidden' : ''}`} aria-label="Persistent verifiable credentials">
        <button type="button" className="proof-bar__item" onClick={() => scrollTo('chapter-03')}>
          AI & ML Builder
        </button>
        <span className="proof-bar__sep">·</span>
        <button type="button" className="proof-bar__item" onClick={() => scrollTo('chapter-02')}>
          Top 5 AI Sprint
        </button>
        <span className="proof-bar__sep">·</span>
        <button type="button" className="proof-bar__item" onClick={() => scrollTo('chapter-01')}>
          ₹13L Closed
        </button>
        <span className="proof-bar__sep">·</span>
        <button type="button" className="proof-bar__item" onClick={() => scrollTo('chapter-02')}>
          President, ECell RV
        </button>
      </aside>

      <main id="main-content">
        {/* ============================================================
            CHAPTER 00: COLD OPEN (HERO, OBSIDIAN, 100SVH)
            30-Second Scan: 0 to 5s. Name, proof, contact visible with no scroll.
            ============================================================ */}
        <section
          className="deal-section deal-section--obsidian hero-cold-open"
          id="chapter-00"
          ref={heroRef}
        >
          {/* Interactive Constellation Nodes & Connection Lines Canvas */}
          <HeroConstellation />

          {/* Faint oversized BUILDER outline parallax */}
          <div className="hero-bg-letters" aria-hidden="true">
            BUILDER
          </div>

          <div className="deal-container hero-main-content">
            <span className="hero-top-tag">{dealRoomData.profile.topLabel}</span>

            {/* Spotlight Mask Headline */}
            <div className="hero-spotlight-wrap">
              <h1 className="hero-headline hero-headline--base">
                {dealRoomData.profile.heroLinePrefix}{' '}
                <span className="brass-italic">{dealRoomData.profile.heroLineHighlight}</span>{' '}
                {dealRoomData.profile.heroLineSuffix}
              </h1>
              <h1 className="hero-headline hero-headline--spotlight" aria-hidden="true">
                {dealRoomData.profile.heroLinePrefix}{' '}
                <span className="brass-italic">{dealRoomData.profile.heroLineHighlight}</span>{' '}
                {dealRoomData.profile.heroLineSuffix}
              </h1>
            </div>

            <p className="hero-subsentence">
              {dealRoomData.profile.heroSubsentence}
            </p>

            <div className="hero-actions">
              <a
                href={`mailto:${dealRoomData.profile.email}`}
                className="deal-btn-solid"
                onMouseEnter={() => onInteractiveEnter('Email')}
                onMouseLeave={onInteractiveLeave}
              >
                Email me
              </a>
              <a
                href="#chapter-03"
                className="deal-link-text"
                onClick={(e) => { e.preventDefault(); scrollTo('chapter-03') }}
                onMouseEnter={() => onInteractiveEnter('View')}
                onMouseLeave={onInteractiveLeave}
              >
                See the work →
              </a>
            </div>
          </div>

          <div>
            {/* Slow Marquee of technical disciplines directly above ledger */}
            <div className="hero-marquee-wrap" aria-hidden="true">
              <div className="hero-marquee-track">
                {dealRoomData.marqueeDisciplines.concat(dealRoomData.marqueeDisciplines).map((d, i) => (
                  <span className="hero-marquee-item" key={`${d}-${i}`}>
                    {d} ·
                  </span>
                ))}
              </div>
            </div>

            {/* THE LEDGER STRIP (3 equal columns separated by hairlines) */}
            <div className="hero-ledger">
              {dealRoomData.ledger.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.targetChapter}`}
                  className="ledger-col"
                  onClick={(e) => { e.preventDefault(); scrollTo(item.targetChapter) }}
                  onMouseEnter={() => onInteractiveEnter('Proof')}
                  onMouseLeave={onInteractiveLeave}
                >
                  <div className="ledger-col__num tabular">{item.number}</div>
                  <div className="ledger-col__label">{item.label}</div>
                  <div className="ledger-col__sub">{item.sublabel}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 01: THE CLOSES (BRANDS LEDGER, BONE BG)
            30-Second Scan: 5 to 15s. Proof is real.
            ============================================================ */}
        <section className="deal-section deal-section--bone section-pad" id="chapter-01">
          <div className="deal-container">
            <div className="chapter-label-strip">
              <span className="chapter-label-num">Chapter 01 / The closes</span>
              <span className="chapter-label-name">Execution & Leverage</span>
            </div>

            <h2 className="serif" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--ink)', marginBottom: '16px' }}>
              Closing without warm <span className="brass-italic">introductions</span>.
            </h2>
            <p style={{ color: 'rgba(10,18,16,0.65)', fontSize: 'clamp(15px, 1.3vw, 18px)', maxWidth: '58ch', marginBottom: '32px', lineHeight: 1.5 }}>
              How a student engineer closed 18 marquee corporate partners and ₹13,00,000 in capital through disciplined 30-day cold outreach cycles. Execution speed, not institutional pedigree.
            </p>

            {/* Category Filter Tabs + Counter */}
            <div className="brand-ledger-controls">
              <div className="brand-ledger-tabs" role="tablist">
                {['All', 'Tech & Telecom', 'Automotive & Industrial', 'Lifestyle & F&B'].map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    role="tab"
                    aria-selected={selectedBrandCategory === cat}
                    className={`brand-tab-btn ${selectedBrandCategory === cat ? 'is-active' : ''}`}
                    onClick={() => setSelectedBrandCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="brand-counter">
                Showing {filteredBrands.length} of {dealRoomData.brands.length} deals
              </div>
            </div>

            {/* Full Ledger Table List */}
            <div className="brand-table">
              {filteredBrands.map((b: BrandDeal) => (
                <article className="brand-row" key={b.name}>
                  <span className="brand-row__idx">{b.index}</span>
                  <h3 className="brand-row__name">{b.name}</h3>
                  <span className="brand-row__cat">{b.category}</span>
                  <span className="brand-row__type">{b.type ?? 'Partnership'}</span>
                </article>
              ))}
            </div>

            {/* How a close works 3-step timeline */}
            <div className="close-timeline">
              <div className="close-timeline__header">
                <span className="small-caps" style={{ color: 'var(--brass)' }}>How a close works</span>
                <span className="small-caps" style={{ color: 'rgba(10,18,16,0.6)' }}>30-day cycles · Kalpavikas 1.0 & 2.0</span>
              </div>
              <div className="close-timeline__steps">
                <div className="close-timeline__step">
                  <div className="close-timeline__dot" />
                  <h4 className="close-timeline__title">01. Cold outreach</h4>
                  <p className="close-timeline__desc">
                    Customized executive prospect briefs with zero template blast. In-depth student demographic & brand alignment dossiers.
                  </p>
                </div>
                <div className="close-timeline__step">
                  <div className="close-timeline__dot" />
                  <h4 className="close-timeline__title">02. Executive pitch</h4>
                  <p className="close-timeline__desc">
                    In-person & Zoom sponsor alignment calls presenting ROI, campus activations, technical challenges, and marketing distribution.
                  </p>
                </div>
                <div className="close-timeline__step">
                  <div className="close-timeline__dot" />
                  <h4 className="close-timeline__title">03. Close & deploy</h4>
                  <p className="close-timeline__desc">
                    Multi-lakh cash allocations, physical asset deployment, and long-term ecosystem ties for student founders.
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================================
                THE VENTURE CAPITAL & ECOSYSTEM CONSTELLATION (15 NODES)
                Connected through CEDAT and Startup World Cup operations
                ============================================================ */}
            <div className="vc-constellation-wrap">
              <div className="chapter-label-strip" style={{ marginBottom: '24px', borderBottomColor: 'var(--rule-light)' }}>
                <span className="chapter-label-num">CEDAT Ecosystem</span>
                <span className="chapter-label-name">Venture Capital & Institutional Partners</span>
              </div>

              <h3 className="serif" style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)', color: 'var(--ink)', marginBottom: '14px' }}>
                15 venture funds & ecosystem <span className="brass-italic">partners</span>.
              </h3>
              <p style={{ color: 'rgba(10,18,16,0.65)', fontSize: 'clamp(15px, 1.3vw, 18px)', maxWidth: '62ch', marginBottom: '36px', lineHeight: 1.5 }}>
                Institutional venture capital funds, angel syndicates, institutional banks, and state innovation authorities interfaced directly through my operations at CEDAT and the Startup World Cup.
              </p>

              {/* The 15 VC Entities Grid */}
              <div className="vc-grid">
                {dealRoomData.ventureEntities.map((entity: VentureEntity, idx: number) => (
                  <article
                    className={`vc-card ${entity.featured ? 'vc-card--featured' : ''}`}
                    key={entity.name}
                  >
                    <div className="vc-card__top">
                      <span className="vc-card__num tabular">{(idx + 1).toString().padStart(2, '0')}</span>
                      {entity.featured && <span className="vc-card__badge">Lead Partner</span>}
                    </div>
                    <h4 className="vc-card__name">{entity.name}</h4>
                    <span className="vc-card__tag">{entity.tag}</span>
                  </article>
                ))}
              </div>

              {/* VC Meta Stats Bar */}
              <div className="vc-meta-strip">
                <div className="vc-meta-col">
                  <span className="vc-meta-val tabular">15</span>
                  <span className="vc-meta-lbl">Active Institutional Nodes</span>
                </div>
                <div className="vc-meta-col">
                  <span className="vc-meta-val tabular">4</span>
                  <span className="vc-meta-lbl">Key Lead Partners</span>
                </div>
                <div className="vc-meta-col">
                  <span className="vc-meta-val tabular">$1M</span>
                  <span className="vc-meta-lbl">Startup World Cup Finale</span>
                </div>
                <div className="vc-meta-col">
                  <span className="vc-meta-val">Bengaluru</span>
                  <span className="vc-meta-lbl">Venture Ecosystem Base</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 02: THE ROOMS (LEADERSHIP STACKING PANELS, OBSIDIAN)
            Vertical sticky stack, no horizontal scroll.
            ============================================================ */}
        <section className="deal-section deal-section--obsidian section-pad" id="chapter-02">
          <div className="deal-container">
            <div className="chapter-label-strip">
              <span className="chapter-label-num">Chapter 02 / The rooms</span>
              <span className="chapter-label-name">Command & Scale</span>
            </div>

            <h2 className="serif" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--bone)', marginBottom: '48px' }}>
              Where I've been trusted with the <span className="brass-italic">room</span>.
            </h2>

            {/* 5 Vertical Stacking Panels */}
            <div className="rooms-stack-wrap">
              {dealRoomData.rooms.map((panel: RoomPanel) => (
                <article className="room-panel" key={panel.id}>
                  <div className="room-panel__top">
                    <span className="small-caps" style={{ color: 'var(--stone)' }}>{panel.dates}</span>
                    <span className="small-caps" style={{ color: 'var(--brass)' }}>{panel.tag}</span>
                  </div>

                  <div className="room-panel__body">
                    <div className="room-panel__numeral">{panel.numeral}</div>
                    <div className="room-panel__center">
                      <h3 className="room-panel__org">{panel.org}</h3>
                      <div className="room-panel__role">{panel.role}</div>
                      <ul className="room-panel__outcomes">
                        {panel.outcomes.map((bullet, idx) => (
                          <li className="room-panel__outcome-item" key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                    {panel.metric && (
                      <div className="room-panel__metric-card">
                        <div className="room-panel__metric-val tabular">{panel.metric.value}</div>
                        <div className="room-panel__metric-label">{panel.metric.label}</div>
                      </div>
                    )}
                  </div>

                  <div className="room-panel__footer">
                    <span className="small-caps" style={{ color: 'var(--stone)' }}>Record // {panel.numeral} of 05</span>
                    <span className="small-caps" style={{ color: 'var(--brass)' }}>Bengaluru Ecosystem</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Folded Strengths inline strip */}
            <div className="folded-strengths-strip" aria-label="Core capability disciplines">
              {dealRoomData.foldedStrengths.map((str) => (
                <span className="folded-strength-item" key={str}>{str}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 03: THE BUILDS (PROJECTS TYPOGRAPHY, GITHUB ONLY)
            30-Second Scan: 15 to 30s. Depth & technical rigor.
            ============================================================ */}
        <section className="deal-section deal-section--obsidian section-pad" id="chapter-03">
          <div className="deal-container">
            <div className="chapter-label-strip">
              <span className="chapter-label-num">Chapter 03 / The builds</span>
              <span className="chapter-label-name">Engineered Systems</span>
            </div>

            <h2 className="serif" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--bone)', marginBottom: '16px' }}>
              Systems engineered from first <span className="brass-italic">principles</span>.
            </h2>
            <p style={{ color: 'var(--stone)', fontSize: 'clamp(15px, 1.3vw, 18px)', maxWidth: '58ch', marginBottom: '48px', lineHeight: 1.5 }}>
              Applied machine learning pipelines, CV damage classifiers, and hardware rovers built with production rigor. Live GitHub synchronization.
            </p>

            {/* Typographic list */}
            <div className="builds-list">
              {dealRoomData.builds.map((proj: BuildProject) => {
                const live = repoMeta[proj.id]
                const lang = live?.language ?? proj.defaultLanguage
                const stars = live?.stars ?? proj.defaultStars
                const updated = live?.updated ?? proj.defaultUpdated

                return (
                  <a
                    key={proj.id}
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="build-row"
                    onMouseEnter={() => onInteractiveEnter('Open')}
                    onMouseLeave={onInteractiveLeave}
                  >
                    <div className="build-row__meta">
                      <span className="build-row__year tabular">{proj.year}</span>
                      <span className="small-caps" style={{ color: 'var(--brass)', fontSize: '10px' }}>
                        GitHub ↗
                      </span>
                    </div>

                    <div className="build-row__center">
                      <h3 className="build-row__title">{proj.title}</h3>
                      <p className="build-row__desc">{proj.description}</p>
                      <div className="build-row__tags">
                        {proj.stack.map((t) => (
                          <span className="build-row__tag" key={t}>{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="build-row__stats">
                      <span className="build-row__stat">{lang}</span>
                      <span className="build-row__stat tabular">★ {stars} stars</span>
                      <span className="build-row__stat">{updated}</span>
                    </div>

                    <div className="build-row__arrow">
                      View on GitHub ↗
                    </div>
                  </a>
                )
              })}
            </div>

            <a
              href={dealRoomData.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="builds-footer-link"
              onMouseEnter={() => onInteractiveEnter('Profile')}
              onMouseLeave={onInteractiveLeave}
            >
              Everything else is on GitHub ↗
            </a>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 04: THE VOICES (15 TESTIMONIALS MASONRY, BONE BG)
            ============================================================ */}
        <section className="deal-section deal-section--bone section-pad" id="chapter-04">
          <div className="deal-container">
            <div className="chapter-label-strip">
              <span className="chapter-label-num">Chapter 04 / The voices</span>
              <span className="chapter-label-name">Verified Dispatches</span>
            </div>

            <h2 className="serif" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--ink)', marginBottom: '8px' }}>
              What people <span className="brass-italic">say</span>.
            </h2>
            <div className="voices-subline">
              10,000+ Telegram Broadcast Subscribers · Real Unedited Reader Feedback
            </div>

            {/* 3-Column Editorial Masonry */}
            <div className="voices-masonry">
              {dealRoomData.voices.map((v: VoiceTestimonial) => (
                <blockquote
                  className={`voice-card ${v.featured ? 'voice-card--featured' : ''}`}
                  key={v.id}
                >
                  <div>
                    <div className="voice-card__quote-mark">“</div>
                    <p className="voice-card__quote">{v.quote}</p>
                  </div>
                  <div className="voice-card__footer">
                    <cite className="voice-card__author">{v.author}</cite>
                    <span className="voice-card__source">{v.source}</span>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 05: THE CLOSE (CONTACT, OBSIDIAN)
            ============================================================ */}
        <section className="deal-section deal-section--obsidian section-pad" id="chapter-05">
          <div className="deal-container">
            <div className="chapter-label-strip">
              <span className="chapter-label-num">Chapter 05 / The close</span>
              <span className="chapter-label-name">Direct Transmission</span>
            </div>

            <h2 className="close-headline">
              Let's <span className="brass-italic">talk</span>.
            </h2>

            {/* Email with Magnetic Pull & Click-to-Copy */}
            <div className="close-email-wrap">
              <button
                type="button"
                className="close-email-btn"
                onClick={copyEmailToClipboard}
                onMouseEnter={() => onInteractiveEnter('Copy')}
                onMouseLeave={onInteractiveLeave}
                aria-label={`Copy email address ${dealRoomData.profile.email}`}
              >
                <span className="close-email-link" ref={emailLinkRef}>
                  {dealRoomData.profile.email}
                </span>
                <span className="close-copy-toast">
                  {copiedEmail ? '✓ Copied to clipboard' : 'Click to copy direct address'}
                </span>
              </button>
            </div>

            {/* Real Social Links */}
            <div className="close-socials-row">
              <a
                href={dealRoomData.profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="close-social-link"
              >
                LinkedIn ↗
              </a>
              <a
                href={dealRoomData.profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="close-social-link"
              >
                GitHub ↗
              </a>
              <a
                href={dealRoomData.profile.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="close-social-link"
              >
                Telegram ↗
              </a>
              <a
                href={`tel:${dealRoomData.profile.phone.replace(/\s+/g, '')}`}
                className="close-social-link"
              >
                Direct Call ({dealRoomData.profile.phone}) ↗
              </a>
              <a
                href={dealRoomData.profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="close-social-link"
              >
                WhatsApp ↗
              </a>
            </div>

            {/* Complete Technical Stack (Restored from Original Site) */}
            <div className="close-stack-section">
              <div className="close-stack-header">Full Production Technical Arsenal</div>
              <div className="close-stack-grid">
                {dealRoomData.techStackCategories.map((group) => (
                  <div key={group.label} className="close-stack-col">
                    <h4 className="close-stack-col__title">{group.label}</h4>
                    <ul className="close-stack-col__list">
                      {group.items.map((item) => (
                        <li className="close-stack-col__item" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* All 4 Verified Certifications */}
            <div className="close-certs-section">
              <div className="close-stack-header">Verified Credentials & Certifications</div>
              <div className="close-certs-grid">
                {dealRoomData.certifications.map((cert) => (
                  <div className="close-cert-row" key={cert.name}>
                    <span className="close-cert-name">{cert.name}</span>
                    <span className="close-cert-issuer">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Bottom Bar */}
            <footer className="close-footer-bar">
              <span>Bengaluru Local Time: <strong className="tabular" style={{ color: 'var(--bone)' }}>{bengaluruTime}</strong></span>
              <span>© 2026 Ayush S Kulkarni. All rights reserved.</span>
              <button
                type="button"
                className="close-back-to-top"
                onClick={() => scrollTo('chapter-00')}
              >
                Back to top ↑
              </button>
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}
