import { useEffect, useRef } from 'react'

/**
 * Robust Konami code detector:
 * ↑ ↑ ↓ ↓ ← → ← → B A
 * Works with both event.key and event.code.
 * Prevents page scroll during input and automatically resets after 3.5s.
 */
export function useKonamiCode(onUnlock: () => void, enabled = true): void {
  const progress = useRef(0)
  const timer = useRef(0)
  const callback = useRef(onUnlock)
  callback.current = onUnlock

  useEffect(() => {
    if (!enabled) return

    const matchKey = (index: number, event: KeyboardEvent): boolean => {
      const k = event.key
      const c = event.code

      switch (index) {
        case 0:
        case 1:
          return k === 'ArrowUp' || c === 'ArrowUp'
        case 2:
        case 3:
          return k === 'ArrowDown' || c === 'ArrowDown'
        case 4:
        case 6:
          return k === 'ArrowLeft' || c === 'ArrowLeft'
        case 5:
        case 7:
          return k === 'ArrowRight' || c === 'ArrowRight'
        case 8:
          return k.toLowerCase() === 'b' || c === 'KeyB'
        case 9:
          return k.toLowerCase() === 'a' || c === 'KeyA'
        default:
          return false
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return
      }

      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        progress.current = 0
      }, 3500)

      if (matchKey(progress.current, event)) {
        if (progress.current > 0 || event.key.startsWith('Arrow')) {
          event.preventDefault()
        }
        progress.current += 1
        if (progress.current === 10) {
          progress.current = 0
          callback.current()
        }
        return
      }

      // Check if this key restarts the sequence (ArrowUp)
      progress.current = matchKey(0, event) ? 1 : 0
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [enabled])
}
