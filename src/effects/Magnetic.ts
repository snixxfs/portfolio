/**
 * Subtle cursor attraction for buttons. The element keeps its real hitbox:
 * only an inner wrapper is translated, and clicks land on the actual control.
 */

interface MagneticOptions {
  strength?: number
  max?: number
}

export function attachMagnetic(element: HTMLElement, options: MagneticOptions = {}): () => void {
  const strength = options.strength ?? 0.22
  const max = options.max ?? 10
  const inner = element.querySelector<HTMLElement>('.magnetic-inner') ?? element
  let frame = 0
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0

  const render = () => {
    currentX += (targetX - currentX) * 0.18
    currentY += (targetY - currentY) * 0.18
    inner.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      frame = requestAnimationFrame(render)
    } else {
      frame = 0
    }
  }

  const kick = () => {
    if (!frame) frame = requestAnimationFrame(render)
  }

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return
    const rect = element.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5
    targetX = Math.max(-max, Math.min(max, relX * rect.width * strength))
    targetY = Math.max(-max, Math.min(max, relY * rect.height * strength))
    kick()
  }

  const onLeave = () => {
    targetX = 0
    targetY = 0
    kick()
  }

  element.addEventListener('pointermove', onMove, { passive: true })
  element.addEventListener('pointerleave', onLeave)

  return () => {
    element.removeEventListener('pointermove', onMove)
    element.removeEventListener('pointerleave', onLeave)
    cancelAnimationFrame(frame)
    inner.style.transform = ''
  }
}
