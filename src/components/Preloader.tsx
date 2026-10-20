import { useCallback, useEffect, useRef, useState } from 'react'
import { getSession, readJSON, writeJSON } from '../utils/storage'

const STORAGE_KEY = 'ask-preloader-v2'
const DURATION = 1200
const HARD_STOP = 1600

interface PreloaderProps {
  reduced: boolean
  onDone: () => void
}

function seenBefore(): boolean {
  const session = getSession()
  if (!session) return false
  return readJSON<boolean>(session, STORAGE_KEY, (value) => (value === true ? true : null)) === true
}

export function Preloader({ reduced, onDone }: PreloaderProps) {
  const [visible] = useState(() => !reduced && !seenBefore())
  const [leaving, setLeaving] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  const finish = useCallback(() => {
    const session = getSession()
    if (session) writeJSON(session, STORAGE_KEY, true)
    setLeaving(true)
    window.setTimeout(onDone, 380)
  }, [onDone])

  useEffect(() => {
    if (!visible) {
      onDone()
      return
    }

    let raf = 0
    let hardStop = 0
    let finished = false
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 2.2)
      const value = Math.round(eased * 100)
      if (countRef.current) countRef.current.textContent = String(value).padStart(3, '0')
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${eased})`

      if (progress < 1 && !finished) {
        raf = requestAnimationFrame(step)
      } else if (!finished) {
        finished = true
        window.setTimeout(finish, 100)
      }
    }

    raf = requestAnimationFrame(step)
    hardStop = window.setTimeout(() => {
      if (!finished) {
        finished = true
        finish()
      }
    }, HARD_STOP)

    const skip = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      window.clearTimeout(hardStop)
      finish()
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta') return
      skip()
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', skip)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(hardStop)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', skip)
    }
  }, [visible, finish, onDone])

  if (!visible) return null

  return (
    <div
      className="preloader"
      data-leaving={leaving}
      style={{ opacity: leaving ? 0 : 1, transition: 'opacity .35s cubic-bezier(.16,1,.3,1)' }}
      role="status"
      aria-label="Initializing portfolio system"
    >
      <div className="preloader__top">
        <span className="preloader__brand">AYUSH S KULKARNI // SECURE REPOSITORY</span>
        <span className="preloader__status">INITIALIZING SYSTEM TELEMETRY...</span>
      </div>

      <div className="preloader__center">
        <span className="preloader__count" ref={countRef}>
          000
        </span>
        <span className="preloader__title">
          AI Systems Builder · Venture Strategist · Engineer
        </span>
        <div className="preloader__rail" aria-hidden="true">
          <div className="preloader__fill" ref={fillRef} />
        </div>
      </div>

      <div className="preloader__bottom">
        <span>Click anywhere or press any key to bypass sequence</span>
        <span>RV UNIVERSITY // BENGALURU</span>
      </div>
    </div>
  )
}
