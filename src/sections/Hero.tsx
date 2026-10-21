import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { profile } from '../data/content'
import { RichText } from '../components/RichText'
import { attachMagnetic } from '../effects/Magnetic'
import { discover } from '../hooks/useEasterEggs'

const HeroScene = lazy(() => import('../effects/HeroScene'))

gsap.registerPlugin(SplitText)

interface HeroProps {
  reduced: boolean
  glitch: boolean
  onNameGlitch: () => void
  onNotify: (message: string, actionLabel?: string, onAction?: () => void) => void
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function Hero({ reduced, glitch, onNameGlitch, onNotify }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const ctaRowRef = useRef<HTMLDivElement>(null)

  const [webglReady, setWebglReady] = useState(false)
  const [enableScene, setEnableScene] = useState(false)

  const clickCount = useRef(0)
  const clickTimer = useRef<number>(0)
  const scatterTimeline = useRef<gsap.core.Timeline | null>(null)

  /* ---------- lazy WebGL: only when supported and non-reduced ---------- */
  useEffect(() => {
    if (reduced) return
    const mq = window.matchMedia('(min-width: 768px)')
    if (!mq.matches || !supportsWebGL()) return

    const enable = () => setEnableScene(true)
    let cancel: () => void

    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(enable, { timeout: 1200 })
      cancel = () => window.cancelIdleCallback(handle)
    } else {
      const handle = window.setTimeout(enable, 300)
      cancel = () => window.clearTimeout(handle)
    }

    return cancel
  }, [reduced])

  /* ---------- SplitText reveal ---------- */
  useEffect(() => {
    if (reduced || !titleRef.current) return
    const title = titleRef.current
    const splits: SplitText[] = []
    const context = gsap.context(() => {
      const lines = Array.from(title.querySelectorAll<HTMLElement>('.hero__word'))
      for (const line of lines) {
        const split = new SplitText(line, { type: 'chars', charsClass: 'char' })
        splits.push(split)
        gsap.set(split.chars, { yPercent: 120, opacity: 0, rotate: 3 })
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.02,
          delay: 0.1,
        })
      }
    })

    return () => {
      for (const split of splits) split.revert()
      context.revert()
    }
  }, [reduced])

  /* ---------- letter scatter on hover ---------- */
  useEffect(() => {
    if (reduced) return
    const name = nameRef.current
    if (!name) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    let split: SplitText | null = null
    const onEnter = () => {
      split?.revert()
      split = new SplitText(name, { type: 'chars', charsClass: 'scatter-char' })
      scatterTimeline.current?.kill()
      const timeline = gsap.timeline()
      for (const char of split.chars) {
        timeline.to(
          char,
          {
            x: gsap.utils.random(-24, 24),
            y: gsap.utils.random(-28, 20),
            rotate: gsap.utils.random(-14, 14),
            scale: gsap.utils.random(0.92, 1.1),
            duration: 0.55,
            ease: 'power3.out',
          },
          0,
        )
      }
      scatterTimeline.current = timeline
    }

    const onLeave = () => {
      if (!split) return
      const chars = split.chars
      scatterTimeline.current?.kill()
      const timeline = gsap.timeline({
        onComplete: () => {
          split?.revert()
          split = null
        },
      })
      timeline.to(chars, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.45)',
        stagger: { each: 0.008, from: 'random' },
      })
      scatterTimeline.current = timeline
    }

    name.addEventListener('pointerenter', onEnter)
    name.addEventListener('pointerleave', onLeave)

    return () => {
      name.removeEventListener('pointerenter', onEnter)
      name.removeEventListener('pointerleave', onLeave)
      scatterTimeline.current?.kill()
      split?.revert()
    }
  }, [reduced])

  /* ---------- magnetic CTAs ---------- */
  useEffect(() => {
    if (reduced) return
    const row = ctaRowRef.current
    if (!row) return
    const cleanups = Array.from(row.querySelectorAll<HTMLElement>('.btn')).map((button) =>
      attachMagnetic(button, { strength: 0.2, max: 8 }),
    )
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [reduced])

  /* ---------- typed headline stream ---------- */
  useEffect(() => {
    const node = typedRef.current
    if (!node) return
    const phrases = profile.typedPhrases
    if (reduced) {
      node.textContent = phrases[0] ?? ''
      return
    }

    let phrase = 0
    let index = 0
    let deleting = false
    let timer = 0

    const tick = () => {
      const current = phrases[phrase] ?? ''
      index += deleting ? -1 : 1
      node.textContent = current.slice(0, Math.max(index, 0))

      let delay = deleting ? 25 : 55
      if (!deleting && index >= current.length) {
        deleting = true
        delay = 1800
      } else if (deleting && index <= 0) {
        deleting = false
        phrase = (phrase + 1) % phrases.length
        delay = 350
      }
      timer = window.setTimeout(tick, delay)
    }

    timer = window.setTimeout(tick, 600)
    return () => window.clearTimeout(timer)
  }, [reduced])

  /* ---------- five-click easter egg glitch ---------- */
  const onNameClick = useCallback(() => {
    clickCount.current += 1
    window.clearTimeout(clickTimer.current)

    if (clickCount.current >= 5) {
      clickCount.current = 0
      discover('glitch')
      onNameGlitch()
      onNotify('Glitch mode activated. Click five times again to stabilize.')
      return
    }

    clickTimer.current = window.setTimeout(() => {
      clickCount.current = 0
    }, 2200)
  }, [onNameGlitch, onNotify])

  useEffect(() => () => window.clearTimeout(clickTimer.current), [])

  const handleSceneReady = useCallback(() => setWebglReady(true), [])
  const showScene = useMemo(() => enableScene && !reduced, [enableScene, reduced])

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__fallback" aria-hidden="true" />
      {showScene ? (
        <div className="hero__scene glitchable" data-ready={webglReady} aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene light={window.innerWidth < 1100} onReady={handleSceneReady} />
          </Suspense>
        </div>
      ) : null}

      <div className="hero__inner">
        {/* HUD Telemetry Header */}
        <div className="hero__hud">
          <div className="hero__hud-pill">
            <span className="hero__hud-dot" aria-hidden="true" />
            <span className="hero__hud-status">STATUS // ONLINE</span>
          </div>
          <div className="hero__hud-roles">
            <span className="hero__badge hero__badge--gold">AI & SYSTEMS BUILDER</span>
            <span className="hero__badge hero__badge--cyan">VENTURE & ECOSYSTEM STRATEGY</span>
            <span className="hero__badge hero__badge--neutral">RV UNIVERSITY // BLR</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="hero__title" id="hero-title" ref={titleRef}>
          <span className="hero__line">
            <span
              className={`hero__word${glitch ? ' hero__word--glitch' : ''}`}
              ref={nameRef}
              onClick={onNameClick}
              data-cursor="view"
              role="button"
              tabIndex={0}
              aria-label="Ayush S Kulkarni (Click five times for glitch mode)"
            >
              AYUSH S KULKARNI
            </span>
          </span>
        </h1>

        {/* Interactive Typed Terminal Prompt */}
        <div className="hero__typed" aria-label="What I do">
          <span className="hero__typed-prompt" aria-hidden="true">
            root@ask:~$
          </span>
          <span className="hero__typed-text" ref={typedRef} aria-live="off" />
          <span className="hero__caret" aria-hidden="true" />
        </div>

        {/* Narrative Pitch */}
        <p className="hero__pitch">
          <RichText text={profile.pitch} />
        </p>

        {/* Call to Actions */}
        <div className="hero__ctas" ref={ctaRowRef}>
          {profile.heroCtas.map((cta) => (
            <a
              key={cta.href}
              className={`btn ${cta.variant === 'fill' ? 'btn--fill' : 'btn--outline'}`}
              href={cta.href}
              data-cursor="view"
              onClick={(event) => {
                event.preventDefault()
                const id = cta.href.replace('#', '')
                const target = document.getElementById(id)
                if (target) {
                  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
                }
              }}
            >
              <span className="magnetic-inner">{cta.label}</span>
            </a>
          ))}
        </div>

        {/* Hero Metrics Strip */}
        <div className="hero__stats-strip">
          <div className="hero__stat-card">
            <span className="hero__stat-num">₹13L+</span>
            <span className="hero__stat-lbl">Led in sponsorships from 20 brands</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-num">20+</span>
            <span className="hero__stat-lbl">Tier-1 Enterprise Brands Closed</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-num">Top 5</span>
            <span className="hero__stat-lbl">Domain Winner at AI Build Sprint (one of 5 winners among 60+ teams)</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-num">10K+</span>
            <span className="hero__stat-lbl">Telegram Community Scaled</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-text">EXPLORE SYSTEM</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
