import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/content'
import { scrollToId } from '../utils/scroll'
import { useSecrets } from '../hooks/useEasterEggs'

interface NavigationProps {
  reduced: boolean
  currentAccent?: string
  onOpenTerminal?: () => void
  onCycleAccent?: () => void
}

export function Navigation({
  reduced,
  currentAccent = 'gold',
  onOpenTerminal,
  onCycleAccent,
}: NavigationProps) {
  const [active, setActive] = useState<string>('hero')
  const [open, setOpen] = useState(false)
  const { count } = useSecrets()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = ['hero', ...navLinks.map((link) => link.id)]
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: [0, 0.15, 0.4, 0.75] },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id, reduced)
  }

  return (
    <nav className="nav" aria-label="Main" ref={navRef}>
      <div className="nav__inner">
        <a
          className="nav__mark"
          href="#hero"
          onClick={(event) => {
            event.preventDefault()
            go('hero')
          }}
        >
          <span className="nav__mark-dot" aria-hidden="true" />
          <span className="nav__mark-text">AYUSH.SK</span>
        </a>

        <div className="nav__links" data-open={open}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`nav__link${active === link.id ? ' nav__link--active' : ''}`}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault()
                go(link.id)
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav__controls">
          {onOpenTerminal ? (
            <button
              type="button"
              className="nav__ctrl-btn"
              onClick={onOpenTerminal}
              title="Open Terminal (` or ~)"
              aria-label="Open Terminal Shell"
              data-cursor="view"
            >
              <span className="nav__ctrl-prompt">~</span>
              <span className="nav__ctrl-label">SHELL</span>
            </button>
          ) : null}

          {onCycleAccent ? (
            <button
              type="button"
              className="nav__accent-btn"
              onClick={onCycleAccent}
              title={`Cycle Accent (Current: ${currentAccent})`}
              aria-label="Cycle Accent Color"
              data-cursor="view"
            >
              <span className={`nav__accent-dot nav__accent-dot--${currentAccent}`} />
            </button>
          ) : null}

          {count > 0 ? (
            <span className="nav__secrets" title="Discovered Easter Eggs">
              SECRETS {count}/6
            </span>
          ) : null}

          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}
