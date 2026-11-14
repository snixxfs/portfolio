import { useEffect, useRef, useState } from 'react'
import {
  personalData,
  type BrandItem,
  type ImpactStat,
  type StrengthItem,
  type LeadershipItem,
  type EditorialProject,
} from './data/printedData'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function PrintedPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedBrandCategory, setSelectedBrandCategory] = useState<string>('All')
  const [hoveredBrand, setHoveredBrand] = useState<BrandItem | null>(null)
  const [loaderComplete, setLoaderComplete] = useState(false)
  const [counterVal, setCounterVal] = useState(0)

  const cursorRef = useRef<HTMLDivElement>(null)
  const floatCardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  const horizontalWrapRef = useRef<HTMLDivElement>(null)

  // 1. Loader Curtain Animation (0 -> 100 counter, then ink wipe out)
  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 4
      if (count >= 100) {
        count = 100
        clearInterval(interval)
        setCounterVal(100)

        // Curtain wipe up
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
              setLoaderComplete(true)
            },
          })
        }
      } else {
        setCounterVal(count)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [])

  // 2. Custom Cursor (Ink dot -> Accent circle)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
      })

      // Move float card if brand hovered
      if (floatCardRef.current && hoveredBrand) {
        gsap.to(floatCardRef.current, {
          x: e.clientX + 20,
          y: e.clientY + 20,
          duration: 0.25,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [hoveredBrand])

  // 3. Horizontal Scroll Pin for Leadership Section (Desktop Only)
  useEffect(() => {
    if (!loaderComplete) return
    const track = horizontalTrackRef.current
    const wrap = horizontalWrapRef.current
    if (!track || !wrap) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 769px)', () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [loaderComplete])

  // 4. Hero Staggered Typography Reveal
  useEffect(() => {
    if (!loaderComplete) return

    const letters = document.querySelectorAll('.hero-letter-reveal')
    gsap.fromTo(
      letters,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.1,
      }
    )
  }, [loaderComplete])

  // Filtered brands
  const filteredBrands = personalData.brands.filter(
    (b: BrandItem) => selectedBrandCategory === 'All' || b.category === selectedBrandCategory
  )

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="printed-site-root">
      {/* Paper Grain Overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Editorial Custom Cursor */}
      <div
        className={`editorial-cursor ${hoveredBrand ? 'editorial-cursor--hover' : ''}`}
        ref={cursorRef}
        aria-hidden="true"
      >
        <span className="editorial-cursor__label">View</span>
      </div>

      {/* Floating Brand Preview Card */}
      <div
        ref={floatCardRef}
        className={`brand-float-card ${hoveredBrand ? 'is-visible' : ''}`}
        aria-hidden="true"
      >
        {hoveredBrand && (
          <>
            <div className="brand-float-card__logo">{hoveredBrand.logoText}</div>
            <div className="brand-float-card__tag">{hoveredBrand.category} · Partnership</div>
          </>
        )}
      </div>

      {/* 1. Curtain Loader */}
      {!loaderComplete && (
        <aside className="curtain-loader" ref={loaderRef} aria-label="Loading portfolio">
          <div className="curtain-loader__top">
            <span>Issue 01 // Bengaluru</span>
            <span>Ayush S Kulkarni</span>
          </div>
          <div className="curtain-loader__center">
            <h1 className="curtain-loader__word">
              <span>AYUSH</span>
            </h1>
            <h1 className="curtain-loader__word">
              <span style={{ fontStyle: 'italic' }}>KULKARNI</span>
            </h1>
          </div>
          <div className="curtain-loader__bottom">
            <span className="curtain-loader__counter">{counterVal}%</span>
            <span className="curtain-loader__status">Typesetting Pages</span>
          </div>
        </aside>
      )}

      {/* Sticky Minimal Navigation */}
      <header className="editorial-nav">
        <div className="editorial-nav__inner">
          <a
            href="#hero"
            className="editorial-nav__brand"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('hero')
            }}
          >
            Ayush S Kulkarni
          </a>

          <div className="editorial-nav__right">
            <nav className="editorial-nav__links">
              <a
                href="#about"
                className="editorial-nav__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('about')
                }}
              >
                About
              </a>
              <a
                href="#impact"
                className="editorial-nav__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('impact')
                }}
              >
                Impact
              </a>
              <a
                href="#leadership"
                className="editorial-nav__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('leadership')
                }}
              >
                Leadership
              </a>
              <a
                href="#brands"
                className="editorial-nav__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('brands')
                }}
              >
                Brands
              </a>
              <a
                href="#projects"
                className="editorial-nav__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('projects')
                }}
              >
                Work
              </a>
            </nav>

            <a
              href="#contact"
              className="editorial-nav__cta"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
            >
              Let’s talk →
            </a>

            <button
              type="button"
              className="editorial-nav__menu-trigger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Fullscreen Menu"
            >
              Index [☰]
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`menu-overlay ${menuOpen ? 'menu-overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="menu-overlay__header">
          <span>PORTFOLIO INDEX // ISSUE 2026</span>
          <button
            type="button"
            className="menu-overlay__close"
            onClick={() => setMenuOpen(false)}
          >
            Close [✕]
          </button>
        </div>

        <ul className="menu-overlay__list">
          {[
            { num: '01', label: 'Intro & Persona', id: 'hero' },
            { num: '02', label: 'About & Cold Pitching', id: 'about' },
            { num: '03', label: 'The Numbers (Impact)', id: 'impact' },
            { num: '04', label: 'Core Strengths', id: 'strengths' },
            { num: '05', label: 'Leadership Horizontal', id: 'leadership' },
            { num: '06', label: 'Venture & CEDAT', id: 'venture' },
            { num: '07', label: '20 Brands Said Yes', id: 'brands' },
            { num: '08', label: 'Selected Projects', id: 'projects' },
            { num: '09', label: 'Community Feedback', id: 'community' },
            { num: '10', label: 'Technical Arsenal', id: 'stack' },
            { num: '11', label: 'Direct Correspondence', id: 'contact' },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="menu-overlay__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.id)
                }}
              >
                <span className="num">{item.num}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-overlay__footer">
          <span>Ayush S Kulkarni · Bengaluru, India</span>
          <a
            href="mailto:ayushak12n@gmail.com"
            className="editorial-link"
            style={{ color: 'var(--paper)' }}
          >
            ayushak12n@gmail.com
          </a>
        </div>
      </div>

      <main>
        {/* ============================================================
            01. HERO
            ============================================================ */}
        <section className="hero-editorial site-container" id="hero">
          <div className="hero-editorial__name-wrap" ref={heroRef}>
            <span className="hero-editorial__sticker">
              {personalData.heroSticker}
            </span>

            <h1 className="hero-editorial__title">
              <span className="hero-editorial__line">
                {'AYUSH S'.split('').map((char, i) => (
                  <span className="hero-letter-reveal" key={i}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="hero-editorial__line">
                {'KULKARNI'.split('').map((char, i) => (
                  <span
                    className="hero-letter-reveal"
                    key={i}
                    style={char === 'K' ? { color: 'var(--accent)' } : undefined}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Photo overlapping the K */}
            <div className="hero-editorial__portrait-overlap photo-framed">
              <div className="photo-tape" aria-hidden="true" />
              <div className="hero-editorial__portrait-img" role="img" aria-label="Ayush portrait" />
              <span className="marginalia" style={{ marginTop: '8px', fontSize: '15px' }}>
                Bengaluru, 2026 ↗
              </span>
            </div>
          </div>

          <div className="hero-editorial__bottom">
            <p className="hero-editorial__pitch">
              "{personalData.heroIntro}"
            </p>

            <div className="hero-editorial__actions">
              <div className="hero-editorial__links-row">
                <a
                  href="#brands"
                  className="hero-editorial__text-link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo('brands')
                  }}
                >
                  See the 20 brands
                </a>
                <a
                  href="#projects"
                  className="hero-editorial__text-link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo('projects')
                  }}
                >
                  Inspect code & systems
                </a>
              </div>

              <div className="hero-editorial__scroll-indicator">
                <span>Scroll to turn page</span>
                <span aria-hidden="true">↓</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            02. ABOUT
            ============================================================ */}
        <section className="section-padding site-container" id="about">
          <div className="section-meta-strip">
            <span className="section-meta-num">01 / ABOUT</span>
            <span className="section-meta-name">The Narrative</span>
          </div>

          <div className="about-editorial__grid">
            <div className="about-editorial__left-sticky">
              <div className="about-editorial__photo-card photo-framed">
                <div className="photo-tape" aria-hidden="true" />
                <div
                  className="about-editorial__photo"
                  role="img"
                  aria-label="Ayush S Kulkarni at RV University"
                />
                <span className="about-editorial__caption">
                  [PHOTO PLACEHOLDER: Ayush S Kulkarni, RV University campus, Bengaluru]
                </span>
              </div>
              <div className="about-editorial__marginalia-wrap">
                <span className="marginalia marginalia--accent">
                  ← "{personalData.marginaliaNote}"
                </span>
              </div>
            </div>

            <div className="about-editorial__right">
              <div className="about-editorial__scrub-text">
                {personalData.aboutText[0]}
              </div>

              <div className="about-editorial__body-copy">
                <p>{personalData.aboutText[1]}</p>
                <p>{personalData.aboutText[2]}</p>
                <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>
                  [NOTE: Insert personal anecdote about the first cold email reply from Mercedes-Benz here.]
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            03. IMPACT (THE NUMBERS)
            ============================================================ */}
        <section className="section-padding section-alt site-container" id="impact">
          <div className="section-meta-strip">
            <span className="section-meta-num">02 / IMPACT</span>
            <span className="section-meta-name">Verifiable Outcomes</span>
          </div>

          <div className="impact-editorial__list">
            {personalData.stats.map((stat: ImpactStat) => (
              <div className="impact-editorial__row" key={stat.num}>
                <div className="impact-editorial__num">{stat.num}</div>
                <div className="impact-editorial__meta">
                  <h3 className="impact-editorial__label">{stat.label}</h3>
                  <p className="impact-editorial__desc">{stat.desc}</p>
                  {stat.breakdown && (
                    <span className="impact-editorial__breakdown">{stat.breakdown}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            04. STRENGTHS
            ============================================================ */}
        <section className="section-padding site-container" id="strengths">
          <div className="section-meta-strip">
            <span className="section-meta-num">03 / STRENGTHS</span>
            <span className="section-meta-name">Core Capabilities</span>
          </div>

          <div className="strengths-editorial__list">
            {personalData.strengths.map((item: StrengthItem) => (
              <div className="strengths-editorial__row" key={item.num}>
                <span className="strengths-editorial__num">{item.num}</span>
                <h3 className="strengths-editorial__title">{item.title}</h3>
                <p className="strengths-editorial__proof">{item.proof}</p>
                <span className="strengths-editorial__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            05. LEADERSHIP (HORIZONTAL PANELS)
            ============================================================ */}
        <section
          className="section-padding leadership-editorial"
          id="leadership"
          ref={horizontalWrapRef}
        >
          <div className="site-container">
            <div className="section-meta-strip">
              <span className="section-meta-num">04 / LEADERSHIP</span>
              <span className="section-meta-name">Command & Scale (Horizontal Scroll)</span>
            </div>
          </div>

          <div className="site-container">
            <div className="leadership-editorial__track" ref={horizontalTrackRef}>
              {personalData.leadership.map((panel: LeadershipItem, idx: number) => (
                <article
                  className={`leadership-panel leadership-panel--${panel.tone}`}
                  key={panel.role}
                >
                  <div className="leadership-panel__top">
                    <span className="leadership-panel__years">{panel.years}</span>
                    <span className="leadership-panel__org">{panel.org}</span>
                  </div>

                  <div>
                    <h3 className="leadership-panel__role">{panel.role}</h3>
                    <p className="leadership-panel__desc">{panel.story}</p>
                    <div style={{ marginTop: '16px' }}>
                      <span className="marginalia" style={{ fontSize: '16px' }}>
                        [Record #{idx + 1}: Verified on-ground mandate]
                      </span>
                    </div>
                  </div>

                  <div className="leadership-panel__footer">
                    <span className="leadership-panel__tag">{panel.tag}</span>
                    <span className="mono">0{idx + 1} / 03</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            06. VENTURE (CEDAT & STARTUP WORLD CUP)
            ============================================================ */}
        <section className="section-padding section-alt site-container" id="venture">
          <div className="section-meta-strip">
            <span className="section-meta-num">05 / VENTURE</span>
            <span className="section-meta-name">CEDAT & Capital Operations</span>
          </div>

          <div className="venture-editorial__spread">
            <div className="venture-editorial__pullquote">
              {personalData.venture.pullQuote}
            </div>

            <div className="venture-editorial__facts">
              <p>{personalData.venture.p1}</p>
              <p>{personalData.venture.p2}</p>
              <div className="venture-editorial__badge-row">
                {personalData.venture.badges.map((b: string) => (
                  <span className="sticker sticker--ink" key={b}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            07. BRANDS (INVERTED INK SECTION)
            ============================================================ */}
        <section className="section-padding brands-editorial" id="brands">
          <div className="site-container">
            <div className="section-meta-strip">
              <span className="section-meta-num">06 / PARTNERS</span>
              <span className="section-meta-name">Cold Outreach Results</span>
            </div>

            <h2 className="brands-editorial__title">20 brands said yes.</h2>
          </div>

          {/* Marquee ticker of monochrome brand names */}
          <div className="brands-editorial__marquee" aria-hidden="true">
            <div className="brands-editorial__marquee-track">
              {personalData.brands.concat(personalData.brands).map((b: BrandItem, idx: number) => (
                <span className="brands-editorial__marquee-item" key={`${b.name}-${idx}`}>
                  {b.name} ·
                </span>
              ))}
            </div>
          </div>

          <div className="site-container">
            {/* Category Filter Tabs */}
            <div className="brands-editorial__filters" role="tablist">
              {['All', 'Tech', 'Automotive', 'Lifestyle & F&B'].map((cat: string) => (
                <button
                  type="button"
                  key={cat}
                  role="tab"
                  aria-selected={selectedBrandCategory === cat}
                  className={`brands-editorial__filter-btn ${
                    selectedBrandCategory === cat ? 'is-active' : ''
                  }`}
                  onClick={() => setSelectedBrandCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List with cursor follow */}
            <div className="brands-editorial__list">
              {filteredBrands.map((b: BrandItem) => (
                <div
                  className="brands-editorial__item"
                  key={b.name}
                  onMouseEnter={() => setHoveredBrand(b)}
                  onMouseLeave={() => setHoveredBrand(null)}
                >
                  <span className="brands-editorial__item-name">{b.name}</span>
                  <span className="brands-editorial__item-category">{b.category}</span>
                </div>
              ))}
            </div>

            {/* 30-Day Cycles Drawn Line */}
            <div className="brands-editorial__timeline">
              <span className="mono" style={{ color: 'var(--accent)' }}>
                EXECUTION PROTOCOL
              </span>
              <div className="brands-editorial__timeline-steps">
                <div className="brands-editorial__step">
                  <div className="brands-editorial__step-dot" />
                  <h4 className="brands-editorial__step-title">01. Cold Outreach</h4>
                  <p className="brands-editorial__step-desc">
                    Customized executive prospect lists, value proposition drafts, zero spam templates.
                  </p>
                </div>
                <div className="brands-editorial__step">
                  <div className="brands-editorial__step-dot" />
                  <h4 className="brands-editorial__step-title">02. Executive Pitch</h4>
                  <p className="brands-editorial__step-desc">
                    In-person & Zoom sponsor alignment calls presenting ROI, brand activations, and student demographics.
                  </p>
                </div>
                <div className="brands-editorial__step">
                  <div className="brands-editorial__step-dot" />
                  <h4 className="brands-editorial__step-title">03. Deal Closure</h4>
                  <p className="brands-editorial__step-desc">
                    Contract signing, asset delivery, and multi-lakh in-kind/cash deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            08. PROJECTS (ASYMMETRIC EDITORIAL LIST)
            ============================================================ */}
        <section className="section-padding site-container" id="projects">
          <div className="section-meta-strip">
            <span className="section-meta-num">07 / WORK</span>
            <span className="section-meta-name">Engineered Systems</span>
          </div>

          <div className="projects-editorial__list">
            {personalData.projects.map((proj: EditorialProject) => (
              <article className="project-entry" key={proj.id}>
                <div className="project-entry__preview-wrap">
                  <div
                    className="project-entry__img"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--paper-dark)',
                      padding: '24px',
                    }}
                  >
                    <span className="mono" style={{ color: 'var(--muted)', textAlign: 'center' }}>
                      [SCREENSHOT PLACEHOLDER: {proj.title}]
                    </span>
                  </div>
                </div>

                <div className="project-entry__info">
                  <div className="project-entry__year-tag">
                    <span className="mono">{proj.year}</span>
                    <span>·</span>
                    <span className="mono">Production ML & Web</span>
                  </div>
                  <h3 className="project-entry__title">{proj.title}</h3>
                  <p className="project-entry__tagline">{proj.tagline}</p>
                  <div className="project-entry__tags">
                    {proj.tags.map((t: string) => (
                      <span className="project-entry__tag-pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-btn"
                    >
                      Inspect Source Code →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            09. COMMUNITY COLLAGE
            ============================================================ */}
        <section className="section-padding section-alt site-container" id="community">
          <div className="section-meta-strip">
            <span className="section-meta-num">08 / COMMUNITY</span>
            <span className="section-meta-name">Reader Dispatches & Proof</span>
          </div>

          <div className="community-editorial__collage">
            {personalData.communityQuotes.map((q: { quote: string; author: string }, i: number) => (
              <div className="community-editorial__card photo-framed" key={i}>
                <div className="photo-tape" aria-hidden="true" />
                <p className="community-editorial__quote">“{q.quote}”</p>
                <span className="community-editorial__author">{q.author}</span>
              </div>
            ))}
          </div>

          <p style={{ fontStyle: 'italic', color: 'var(--muted)', textAlign: 'center' }}>
            [PHOTO COLLAGE PLACEHOLDER: 3-5 candid photographs of campus hackathon delegations, student meetings, and brand partners.]
          </p>
        </section>

        {/* ============================================================
            10. TECH STACK (FLOWING PROSE + TWO-COLUMN LIST)
            ============================================================ */}
        <section className="section-padding site-container" id="stack">
          <div className="section-meta-strip">
            <span className="section-meta-num">09 / TOOLING</span>
            <span className="section-meta-name">Technical Arsenal</span>
          </div>

          <div className="stack-editorial__flowing-prose">
            I build in{' '}
            <span className="stack-editorial__tool-word">Python</span>,{' '}
            <span className="stack-editorial__tool-word">React 19</span> and{' '}
            <span className="stack-editorial__tool-word">AWS Cloud</span>, and I'm learning to ship
            faster than I think.
          </div>

          <div className="stack-editorial__grid">
            {personalData.techStackCategories.map((cat: { title: string; items: Array<{ name: string; note: string }> }) => (
              <div key={cat.title}>
                <h4 className="stack-editorial__col-header">{cat.title}</h4>
                <div className="stack-editorial__item-list">
                  {cat.items.map((item: { name: string; note: string }) => (
                    <div className="stack-editorial__item" key={item.name}>
                      <strong>{item.name}</strong>
                      <span className="stack-editorial__item-note">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            11. CONTACT / FOOTER
            ============================================================ */}
        <footer className="footer-editorial" id="contact">
          <div className="site-container">
            <span className="mono" style={{ color: 'var(--accent)', marginBottom: '16px', display: 'block' }}>
              10 / CORRESPONDENCE
            </span>

            <h2 className="footer-editorial__giant-heading">Let's build something.</h2>

            <a
              href={`mailto:${personalData.email}`}
              className="footer-editorial__email-link"
            >
              {personalData.email}
            </a>

            <div className="footer-editorial__bottom-row">
              <div className="footer-editorial__socials">
                {personalData.socials.map((s: { label: string; url: string }) => (
                  <a
                    href={s.url}
                    key={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-editorial__social-link"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>

              <span>Bengaluru Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

              <button
                type="button"
                className="footer-editorial__back-to-top"
                onClick={() => scrollTo('hero')}
              >
                Top of Page ↑
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
