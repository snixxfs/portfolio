import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from './components/Navigation'
import { Preloader } from './components/Preloader'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { FilmGrain } from './components/FilmGrain'
import { Marquee } from './components/Marquee'
import { Terminal } from './components/Terminal'
import { Toast, type ToastState } from './components/Toast'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Impact } from './sections/Impact'
import { Fit } from './sections/Fit'
import { Hats } from './sections/Hats'
import { Experience } from './sections/Experience'
import { VentureCapital } from './sections/VentureCapital'
import { Brands } from './sections/Brands'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'
import { Contact } from './sections/Contact'
import { profile } from './data/content'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useKonamiCode } from './hooks/useKonamiCode'
import { discover } from './hooks/useEasterEggs'
import { initSmoothScroll, refreshWhenReady } from './utils/scroll'
import { burstConfetti } from './effects/Confetti'
import { isTypingTarget } from './utils/accessibility'
import { copyText } from './utils/storage'

gsap.registerPlugin(ScrollTrigger)

type Accent = 'gold' | 'cyan' | 'emerald'
const ACCENTS: Accent[] = ['gold', 'cyan', 'emerald']

export default function App() {
  const reduced = useReducedMotion()

  const [toast, setToast] = useState<ToastState | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [accent, setAccent] = useState<Accent>('gold')
  const [godMode, setGodMode] = useState(false)
  const [preloaderDone, setPreloaderDone] = useState(true)
  const [showPreloader, setShowPreloader] = useState(false)

  const toastId = useRef(0)
  const godTimer = useRef<number>(0)
  const terminalOpenRef = useRef(false)
  terminalOpenRef.current = terminalOpen

  const notify = useCallback((message: string, actionLabel?: string, onAction?: () => void) => {
    toastId.current += 1
    setToast({ id: toastId.current, message, actionLabel, onAction })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  /* ---------- smooth scroll lifecycle ---------- */
  useEffect(() => {
    if (reduced) return
    const teardown = initSmoothScroll()
    return teardown
  }, [reduced])

  useEffect(() => {
    refreshWhenReady()
  }, [preloaderDone])

  /* ---------- document-level flags ---------- */
  useEffect(() => {
    document.documentElement.dataset.accent = accent
  }, [accent])

  useEffect(() => {
    document.documentElement.dataset.glitch = glitch ? 'true' : 'false'
  }, [glitch])

  useEffect(() => {
    document.documentElement.dataset.godmode = godMode ? 'true' : 'false'
    if (godMode) {
      godTimer.current = window.setTimeout(() => setGodMode(false), 6000)
    }
    return () => window.clearTimeout(godTimer.current)
  }, [godMode])

  /* ---------- reveal animation (progressively enhanced with guaranteed fallback) ---------- */
  useEffect(() => {
    if (reduced || !preloaderDone) return
    const context = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.reveal')
      for (const target of targets) {
        gsap.fromTo(
          target,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 92%',
              once: true,
              onEnter: () => {
                target.style.opacity = '1'
                target.style.transform = 'none'
              },
            },
            clearProps: 'opacity,transform',
          }
        )
      }
    })

    // Fail-safe: guarantee all content is 100% visible even if ScrollTrigger is slow or bypassed
    const safetyTimer = window.setTimeout(() => {
      const targets = document.querySelectorAll<HTMLElement>('.reveal')
      targets.forEach((el) => {
        if (el.style.opacity === '0') {
          el.style.opacity = '1'
          el.style.transform = 'none'
        }
      })
    }, 1500)

    return () => {
      window.clearTimeout(safetyTimer)
      context.revert()
    }
  }, [reduced, preloaderDone])

  /* ---------- terminal hotkey (` or ~) ---------- */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '`' && event.key !== '~') return
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      event.preventDefault()
      setTerminalOpen((value) => !value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeTerminal = useCallback(() => setTerminalOpen(false), [])

  const cycleAccent = useCallback(() => {
    setAccent((current) => {
      const index = ACCENTS.indexOf(current)
      return ACCENTS[(index + 1) % ACCENTS.length] ?? 'gold'
    })
  }, [])

  /* ---------- Konami code easter egg (↑ ↑ ↓ ↓ ← → ← → B A) ---------- */
  const handleKonami = useCallback(() => {
    discover('konami')
    setGodMode(true)
    notify('⚡ OVERDRIVE GOD MODE: Chromatic spectrum online for six seconds!')
    burstConfetti({ duration: 3200, count: 200 })
  }, [notify])

  useKonamiCode(handleKonami)

  /* ---------- "hire" typing easter egg ---------- */
  useEffect(() => {
    let buffer = ''
    let resetTimer = 0

    const onKey = (event: KeyboardEvent) => {
      // Ignore if typing inside input, textarea, select or active terminal
      if (isTypingTarget(event.target) || terminalOpenRef.current) {
        buffer = ''
        return
      }

      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (event.key.length !== 1) return

      window.clearTimeout(resetTimer)
      buffer = (buffer + event.key.toLowerCase()).slice(-4)

      resetTimer = window.setTimeout(() => {
        buffer = ''
      }, 2500)

      if (buffer === 'hire') {
        buffer = ''
        discover('hire')
        notify(`Direct channel: ${profile.email}`, 'Copy Email', () => {
          void copyText(profile.email).then((ok) => {
            notify(ok ? `Copied ${profile.email}` : `Reach out to ${profile.email}`)
          })
        })
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(resetTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [notify])

  /* ---------- DevTools greeting + detection ---------- */
  useEffect(() => {
    console.log(
      `%c${profile.name} // SYSTEM ONLINE\n%cPresident of ECell | AWS Student Builders Group | AI Builder\nBuilt with Vite, React 19, TypeScript, Three.js, GSAP.\nTerminal available via \` or the top navigation bar.\nDirect contact: ${profile.email} · ${profile.phone}`,
      'color:#f59e0b;font-size:18px;font-weight:700;letter-spacing:-0.5px;font-family:monospace',
      'color:#94a3b8;font-size:12px;line-height:1.6;font-family:monospace',
    )

    const check = () => {
      const widthGap = window.outerWidth - window.innerWidth
      const heightGap = window.outerHeight - window.innerHeight
      if (widthGap > 165 || heightGap > 165) discover('devtools')
    }
    const timer = window.setTimeout(check, 1200)
    window.addEventListener('resize', check)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', check)
    }
  }, [])

  /* ---------- tab visibility title easter egg ---------- */
  useEffect(() => {
    const original = document.title
    const onVisibility = () => {
      document.title = document.visibilityState === 'hidden' ? 'come back to ask 👀' : original
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.title = original
    }
  }, [])

  const handlePreloaderDone = useCallback(() => {
    setShowPreloader(false)
    setPreloaderDone(true)
  }, [])

  useEffect(() => {
    if (reduced) {
      setShowPreloader(false)
      setPreloaderDone(true)
    }
  }, [reduced])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {showPreloader && !reduced ? (
        <Preloader reduced={reduced} onDone={handlePreloaderDone} />
      ) : null}

      <Navigation
        reduced={reduced}
        currentAccent={accent}
        onOpenTerminal={() => setTerminalOpen(true)}
        onCycleAccent={cycleAccent}
      />
      <ScrollProgress />
      <FilmGrain />
      <CustomCursor reduced={reduced} />

      <main className="site-main" id="main-content">
        {/* 01. Hero */}
        <Hero
          reduced={reduced}
          glitch={glitch}
          onNameGlitch={() => setGlitch((value) => !value)}
          onNotify={notify}
        />

        {/* Global Marquee Ticker */}
        <Marquee items={profile.heroMarquee} reduced={reduced} label="Core capability spectrum" />

        {/* 02. About */}
        <About reduced={reduced} />

        {/* 03. Impact */}
        <Impact reduced={reduced} />

        {/* 04. Fit */}
        <Fit />

        {/* 05. Hats (Strengths) */}
        <Hats />

        {/* 06. Experience (Leadership & Track Record) */}
        <Experience reduced={reduced} />

        {/* 07. Venture Capital & Network */}
        <VentureCapital />

        {/* 08. Enterprise Brands Signed */}
        <Brands reduced={reduced} />

        {/* 09. Projects (Things Built & Shipped) */}
        <Projects reduced={reduced} />

        {/* 10. Tech Stack & Arsenal */}
        <Stack />

        {/* 11. Contact */}
        <Contact reduced={reduced} notify={notify} />
      </main>

      <Footer reduced={reduced} />

      <Terminal
        open={terminalOpen}
        reduced={reduced}
        onClose={closeTerminal}
        onThemeCycle={cycleAccent}
      />
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}
