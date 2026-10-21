import { useCallback, useEffect, useRef, useState } from 'react'
import { profile, projectsSection } from '../data/content'
import { discover } from '../hooks/useEasterEggs'
import { restoreFocus, trapFocus } from '../utils/accessibility'
import { lockScroll, scrollToId } from '../utils/scroll'

type LineTone = 'plain' | 'echo' | 'muted' | 'accent' | 'success' | 'warn'

interface Line {
  id: number
  text: string
  tone: LineTone
}

interface TerminalProps {
  open: boolean
  reduced: boolean
  onClose: () => void
  onThemeCycle: () => void
}

const HELP = `Available system commands:

  whoami         executive profile & bio
  roles          current leadership & ecosystem appointments
  projects       browse shipped technical builds
  hackathons     hackathon track record & organizing achievements
  sponsors       enterprise brand partners closed (₹13L+)
  contact        direct communication channels
  theme          cycle cinematic color accent
  sudo hire      initiate priority collaboration
  clear          purge console output
  exit           close this terminal session`

export function Terminal({ open, reduced, onClose, onThemeCycle }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const windowRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const nextId = useRef(0)

  const push = useCallback((text: string, tone: LineTone = 'plain') => {
    nextId.current += 1
    const id = nextId.current
    setLines((current) => [...current, { id, text, tone }].slice(-150))
  }, [])

  useEffect(() => {
    if (!open) return
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    discover('terminal')
    lockScroll(true)
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      cancelAnimationFrame(raf)
      lockScroll(false)
      restoreFocus(returnFocusRef.current)
    }
  }, [open])

  useEffect(() => {
    if (!open || !windowRef.current) return
    return trapFocus(windowRef.current)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [lines, open])

  useEffect(() => {
    if (!open) return
    if (lines.length === 0) {
      push('====================================================================', 'muted')
      push(`  AYUSH S KULKARNI // SECURE SHELL v2.4`, 'accent')
      push(`  AI Systems & Machine Learning Engineering · Venture Operations`, 'muted')
      push('====================================================================', 'muted')
      push(`Type "help" for a list of commands. Press [ESC] to exit.`, 'muted')
    }
  }, [open, lines.length, push])

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim()
      const normalized = command.toLowerCase().replace(/\s+/g, ' ')

      if (normalized === '') return

      push(`user@ask:~$ ${command}`, 'echo')

      switch (normalized) {
        case 'help':
          push(HELP)
          break
        case 'whoami':
          push(`${profile.name} — ${profile.tagline}`, 'accent')
          push(`Location: ${profile.location} · University: ${profile.university}`)
          push(`Degree: ${profile.degree} (Minor: ${profile.minor})`)
          push(profile.pitch.replace(/\*\*/g, '').replace(/_/g, ''))
          break
        case 'resume':
        case 'cv':
          push('Launching official resume document (/ayush_resume.pdf)...', 'success')
          window.open('/ayush_resume.pdf', '_blank')
          break
        case 'roles':
        case 'experience':
        case 'leadership':
          push('Verified Experience & Track Record:', 'accent')
          push('  [1] President | ECell, RV University (Jun 2025 – Present)')
          push('  [2] Core Member | AWS Student Builders Group')
          push('  [3] Project Executive | CEDAT (Jun 2026 – Present)')
          push('  [4] Head of Sponsorships | Kalpavikas 1.0 & 2.0 (₹13L Closed from 20 Brands)')
          push('  [5] Main Coordinator | ARGONYX ’26 (Sep 2026 · 220+ Teams from 5 Countries)')
          push('  [6] Organizing Team | Startup World Cup – Bengaluru Regional Finale (Aug 2026)')
          push('  [7] Community Builder | Telegram (10K+ Subscribers)')
          push('  [8] Placement Coordinator | RV University')
          push('  [9] Board Member | RUDRA – RVU Data Analytics (Oct 2024 – Oct 2025)')
          push('  [10] Technical Team Member | GDG On Campus (Oct 2024 – Oct 2025)')
          break
        case 'hackathons':
          push('Hackathon & Competitive Record:', 'accent')
          push('  🏆 Domain Winner at AI Build Sprint (one of 5 winners among 60+ teams)')
          push("  ⚡ Argonyx '26 — ONE OF THREE MAIN COORDINATORS (24h Hackathon, 220+ teams from 5 countries)")
          push('  🔬 RIFT 2026 (PW IOI) — Finalist (Built PharmaGuard in 24 hours)')
          push('  🤖 Vision Rover — 3rd Place (24h hardware IoT sprint at KLE)')
          break
        case 'sponsors':
        case 'brands':
          push('Corporate Partnerships Closed: ₹13L+ across 20 brands', 'accent')
          push('  Tier-1 Corporates: Mercedes-Benz, Cisco, TVS Motors, Red Bull, Nokia, HP, Mahindra')
          push('  Tech & EdTech: ixigo, CodeChef, Physics Wallah, JustVend, RunAnywhere, MileTech')
          push('  Strategy: 100% direct cold outreach, stakeholder negotiations, delivered on-time.')
          break
        case 'projects': {
          const titles = projectsSection.projects.map((p, idx) => `  ${idx + 1}. ${p.title} (${p.headline})`).join('\n')
          push(`Navigating to projects. Catalog overview:\n${titles}`)
          onClose()
          window.setTimeout(() => scrollToId('work', reduced), 150)
          break
        }
        case 'contact':
          push(`Direct Communications:`, 'accent')
          push(`  Email:    ${profile.email}`)
          push(`  Phone:    ${profile.phone}`)
          push(`  LinkedIn: ${profile.socials[0]?.href ?? ''}`)
          push(`  GitHub:   ${profile.socials[1]?.href ?? ''}`)
          break
        case 'sudo hire':
        case 'sudo hire-ayush':
          push('Authorization granted. Launching direct mail pipeline...', 'success')
          window.location.href = `mailto:${profile.email}?subject=Collaboration%20with%20Ayush%20S%20Kulkarni`
          break
        case 'sudo':
          push('usage: sudo hire', 'warn')
          break
        case 'theme':
          onThemeCycle()
          discover('theme')
          push('Chromatic system accent cycled successfully.', 'success')
          break
        case 'clear':
        case 'cls':
          setLines([])
          break
        case 'exit':
        case 'quit':
        case 'q':
          onClose()
          break
        default:
          push(`command not recognized: ${command}`)
          push('Type "help" to view executable commands.', 'muted')
      }
    },
    [onClose, onThemeCycle, push, reduced],
  )

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const command = value
    if (command.trim() !== '') {
      setHistory((current) => [command, ...current].slice(0, 40))
    }
    setHistoryIndex(-1)
    setValue('')
    run(command)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setValue(history[next] ?? '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setValue('')
        return
      }
      const next = historyIndex - 1
      setHistoryIndex(next)
      setValue(history[next] ?? '')
    }
  }

  if (!open) return null

  return (
    <div className="terminal" role="dialog" aria-modal="true" aria-label="Terminal Shell">
      <div className="terminal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="terminal__window" ref={windowRef}>
        <div className="terminal__bar">
          <div className="terminal__dots" aria-hidden="true">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
          </div>
          <span className="terminal__title">ayush@mainframe ~ zsh</span>
          <button type="button" className="terminal__close" onClick={onClose}>
            ✕ ESC
          </button>
        </div>

        <div className="terminal__body" ref={bodyRef} role="log" aria-live="polite">
          {lines.map((line) => (
            <div key={line.id} className={`terminal__line terminal__line--${line.tone}`}>
              {line.text}
            </div>
          ))}
        </div>

        <form className="terminal__form" onSubmit={onSubmit}>
          <label htmlFor="terminal-input" className="terminal__prompt">
            user@ask:~$
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            className="terminal__input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </form>

        <div className="terminal__footer">
          <span>Press ESC to exit</span>
          <span>Use ↑ and ↓ for command history</span>
        </div>
      </div>
    </div>
  )
}
