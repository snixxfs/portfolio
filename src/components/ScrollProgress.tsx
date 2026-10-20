import { useEffect, useRef } from 'react'
import { getLenis } from '../utils/scroll'

/** A 2px bar driven by scroll position; no React state per frame. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let raf = 0
    let dirty = false

    const update = () => {
      dirty = false
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0
      bar.style.transform = `scaleX(${progress.toFixed(4)})`
    }

    const request = () => {
      if (dirty) return
      dirty = true
      raf = requestAnimationFrame(update)
    }

    const lenis = getLenis()
    if (lenis) {
      lenis.on('scroll', request)
    } else {
      window.addEventListener('scroll', request, { passive: true })
    }
    window.addEventListener('resize', request, { passive: true })
    update()

    return () => {
      cancelAnimationFrame(raf)
      lenis?.off('scroll', request)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <div className="progress__bar" ref={barRef} />
    </div>
  )
}
