import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenis
}

/**
 * High-performance Lenis smooth scroll.
 * Automatically disabled on touch/mobile devices to preserve native 120Hz momentum scroll.
 */
export function initSmoothScroll(): () => void {
  if (lenis) return () => undefined

  // Only enable Lenis on desktop pointer devices
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none) or (pointer: coarse)').matches
  if (isTouch) {
    return () => undefined
  }

  const instance = new Lenis({
    duration: 0.9,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1,
    autoRaf: false,
  })
  lenis = instance

  const onScroll = () => ScrollTrigger.update()
  instance.on('scroll', onScroll)

  const tick = (time: number) => instance.raf(time * 1000)
  gsap.ticker.add(tick)
  // Enable smooth recovery from frame drops: prevents browser hanging
  gsap.ticker.lagSmoothing(500, 33)

  return () => {
    gsap.ticker.remove(tick)
    instance.off('scroll', onScroll)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}

export function lockScroll(locked: boolean): void {
  if (locked) {
    lenis?.stop()
    document.documentElement.classList.add('is-locked')
  } else {
    lenis?.start()
    document.documentElement.classList.remove('is-locked')
  }
}

export function scrollToId(id: string, reduced: boolean): void {
  const target = document.getElementById(id)
  if (!target) return

  if (lenis && !reduced) {
    lenis.scrollTo(target, { offset: -16, duration: 0.9 })
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY - 16
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

/** Refresh ScrollTrigger once fonts load so trigger positions are exact. */
export function refreshWhenReady(): void {
  if (typeof document === 'undefined') return
  const run = () => ScrollTrigger.refresh()
  if (document.fonts?.ready) {
    void document.fonts.ready.then(run)
  } else {
    window.setTimeout(run, 400)
  }
}
