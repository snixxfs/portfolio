import { useEffect, useRef } from 'react'
import { getLenis } from '../utils/scroll'

interface MarqueeProps {
  items: readonly string[]
  variant?: 'default' | 'brands'
  /** Pixels per second at rest. */
  speed?: number
  reduced: boolean
  label: string
}

/**
 * Continuous marquee whose speed and direction react to scroll velocity.
 * Two copies are rendered; the second is hidden from assistive technology.
 */
export function Marquee({ items, variant = 'default', speed = 46, reduced, label }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef(false)

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    let width = group.getBoundingClientRect().width
    const resize = new ResizeObserver(() => {
      width = group.getBoundingClientRect().width
    })
    resize.observe(group)

    // On touch/mobile devices or when reduced motion, use pure CSS animation for 120 FPS
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches
    if (isTouch) {
      track.dataset.driver = 'css'
      return () => {
        resize.disconnect()
      }
    }

    let offset = 0
    let velocity = 0
    let lastY = window.scrollY
    let lastScrollTs = performance.now()
    let isVisible = true

    const onScroll = () => {
      if (!isVisible) return
      const now = performance.now()
      const dy = window.scrollY - lastY
      const dt = Math.max(now - lastScrollTs, 8)
      velocity += ((dy / dt) * 1000) / 34
      velocity = Math.max(-1.6, Math.min(1.6, velocity))
      lastY = window.scrollY
      lastScrollTs = now
    }

    const lenis = getLenis()
    if (lenis) lenis.on('scroll', onScroll)
    else window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    let last = performance.now()

    const frame = (now: number) => {
      if (!isVisible) {
        raf = 0
        return
      }

      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      velocity *= 0.94
      const base = hoverRef.current ? 0 : -speed
      const px = (base + velocity * 240) * dt
      offset += px

      if (width > 0) {
        if (offset <= -width) offset += width
        if (offset > 0) offset -= width
      }

      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`
      raf = requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        const wasVisible = isVisible
        isVisible = entry.isIntersecting
        if (isVisible && !wasVisible && !raf) {
          last = performance.now()
          raf = requestAnimationFrame(frame)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(track)

    raf = requestAnimationFrame(frame)

    const onEnter = () => {
      hoverRef.current = true
    }
    const onLeave = () => {
      hoverRef.current = false
    }
    track.addEventListener('pointerenter', onEnter)
    track.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      observer.disconnect()
      lenis?.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
      track.style.transform = ''
    }
  }, [reduced, speed])

  const content = (isDuplicate: boolean) => (
    <div className="marquee__group" ref={isDuplicate ? undefined : groupRef} aria-hidden={isDuplicate || undefined}>
      {items.map((item, index) => (
        <span className="marquee__set" key={`${item}-${index}`}>
          <span className="marquee__item">
            <span className="marquee__item-text">{item}</span>
            <span className="marquee__star" aria-hidden="true">
              ✦
            </span>
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee${variant === 'brands' ? ' marquee--brands' : ''}`} role="marquee" aria-label={label}>
      <div className="marquee__track" ref={trackRef} data-driver={reduced ? 'static' : 'gsap'}>
        {content(false)}
        {content(true)}
      </div>
    </div>
  )
}
