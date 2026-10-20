import { useEffect, useRef } from 'react'

interface CustomCursorProps {
  reduced: boolean
}

const LABELS: Record<string, string> = {
  view: 'view',
  email: 'email',
  drag: 'drag',
  open: 'open',
  copy: 'copy',
}

export function CustomCursor({ reduced }: CustomCursorProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduced) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    const node = nodeRef.current
    const label = labelRef.current
    if (!node || !label) return

    document.documentElement.classList.add('has-custom-cursor')
    let raf = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let lastText = ''
    let lastState = ''

    const render = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      node.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      targetX = event.clientX
      targetY = event.clientY
      node.style.opacity = '1'

      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null
      const raw = target?.getAttribute('data-cursor') ?? ''
      const text = LABELS[raw] ?? ''
      const state = text ? 'active' : 'idle'

      if (text !== lastText) {
        label.textContent = text
        lastText = text
      }
      if (state !== lastState) {
        node.dataset.state = state
        lastState = state
      }
    }

    const onDown = () => {
      node.dataset.state = 'press'
      lastState = 'press'
    }
    const onUp = () => {
      node.dataset.state = lastText ? 'active' : 'idle'
      lastState = lastText ? 'active' : 'idle'
    }
    const onLeave = () => {
      node.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className="cursor" ref={nodeRef} data-state="idle" aria-hidden="true" style={{ opacity: 0 }}>
      <div className="cursor__ring" />
      <div className="cursor__dot" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  )
}
