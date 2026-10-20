interface ConfettiOptions {
  duration?: number
  count?: number
}

const COLORS = ['#dfba6a', '#f5e4bd', '#ffffff', '#34d399', '#c59f4e']

interface Piece {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  spin: number
  color: string
  life: number
}

/**
 * Hand-rolled confetti burst on a canvas. No dependency, no DOM nodes
 * per particle, and a hard stop() so the caller can tear it down.
 */
export function burstConfetti({ duration = 2600, count = 160 }: ConfettiOptions = {}): () => void {
  const canvas = document.createElement('canvas')
  canvas.className = 'confetti-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '999999'

  const context = canvas.getContext('2d')
  if (!context) return () => undefined

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  context.scale(dpr, dpr)
  document.body.appendChild(canvas)

  const pieces: Piece[] = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 3 + Math.random() * 9
    return {
      x: width / 2 + (Math.random() - 0.5) * width * 0.5,
      y: height * 0.42 + (Math.random() - 0.5) * 120,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 5 + Math.random() * 8,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#c6ff3d',
      life: 1,
    }
  })

  let frame = 0
  let stopped = false
  let last = performance.now()
  const started = last

  const draw = (now: number) => {
    if (stopped) return
    const elapsed = now - started
    const delta = Math.min((now - last) / 16.67, 3)
    last = now

    context.clearRect(0, 0, width, height)

    for (const piece of pieces) {
      piece.vy += 0.28 * delta
      piece.vx *= 0.992
      piece.x += piece.vx * delta
      piece.y += piece.vy * delta
      piece.rotation += piece.spin * delta
      piece.life = Math.max(0, 1 - elapsed / duration)

      context.save()
      context.globalAlpha = piece.life
      context.translate(piece.x, piece.y)
      context.rotate(piece.rotation)
      context.fillStyle = piece.color
      context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2)
      context.restore()
    }

    if (elapsed < duration) {
      frame = requestAnimationFrame(draw)
    } else {
      stop()
    }
  }

  const stop = () => {
    if (stopped) return
    stopped = true
    cancelAnimationFrame(frame)
    canvas.remove()
  }

  frame = requestAnimationFrame(draw)
  return stop
}
