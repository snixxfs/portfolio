import React, { useState, useRef, useEffect, useCallback } from 'react'
import { soundEngine } from '../utils/audioEngine'
import { dealRoomData } from '../data/dealRoomData'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

interface BiometricVaultProps {
  onInteractiveEnter?: (label: string) => void
  onInteractiveLeave?: () => void
}

export const BiometricVault: React.FC<BiometricVaultProps> = ({
  onInteractiveEnter,
  onInteractiveLeave,
}) => {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [isSealed, setIsSealed] = useState(false)
  const [cipherText, setCipherText] = useState('AUTHORIZATION_REQUIRED')
  const [authToken, setAuthToken] = useState('')
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [overdriveActive, setOverdriveActive] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const holdStartTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  // Generate unique authorization token once
  useEffect(() => {
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
    setAuthToken(`AK-AUTH-${randomHex}-RVU`)
  }, [])

  // Canvas Oscilloscope & Particle Explosion
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let angle = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      // 1. Draw Oscilloscope Wave Ring
      const radius = isHolding ? 140 : 130
      const segments = 72
      ctx.beginPath()
      for (let i = 0; i <= segments; i++) {
        const rad = (i / segments) * Math.PI * 2
        const wave = isHolding
          ? Math.sin(rad * 8 + angle * 4) * (8 + (progress / 100) * 12)
          : Math.sin(rad * 4 + angle) * 3
        const r = radius + wave
        const x = cx + Math.cos(rad) * r
        const y = cy + Math.sin(rad) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = isHolding ? 'rgba(184, 151, 90, 0.85)' : 'rgba(184, 151, 90, 0.25)'
      ctx.lineWidth = isHolding ? 2 : 1
      ctx.stroke()

      angle += isHolding ? 0.08 : 0.02

      // 2. Render & Update Particle Explosion if sealed
      if (particlesRef.current.length > 0) {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i]
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.08 // slight gravity
          p.life++
          p.alpha = Math.max(0, 1 - p.life / p.maxLife)

          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color.replace('ALPHA', p.alpha.toString())
          ctx.shadowBlur = 8
          ctx.shadowColor = '#B8975A'
          ctx.fill()
          ctx.restore()

          if (p.life >= p.maxLife) {
            particlesRef.current.splice(i, 1)
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isHolding, progress])

  // Trigger Particle Burst
  const triggerExplosion = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const particles: Particle[] = []
    const count = 120

    const colors = [
      'rgba(184, 151, 90, ALPHA)',
      'rgba(212, 182, 122, ALPHA)',
      'rgba(237, 232, 220, ALPHA)',
      'rgba(255, 255, 255, ALPHA)',
    ]

    for (let i = 0; i < count; i++) {
      const rad = Math.random() * Math.PI * 2
      const speed = Math.random() * 9 + 2
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(rad) * speed,
        vy: Math.sin(rad) * speed,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 60) + 40,
      })
    }
    particlesRef.current = particles
  }, [])

  // Hold Progress Loop
  useEffect(() => {
    if (!isHolding || isSealed) return

    soundEngine.startHold()
    holdStartTimeRef.current = performance.now()
    const duration = 1800 // 1.8 seconds to seal

    const timer = setInterval(() => {
      if (!holdStartTimeRef.current) return
      const elapsed = performance.now() - holdStartTimeRef.current
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)

      // Random cipher characters while holding
      const runes = '018X#$∆Ω§█▓'
      const scramble = Array.from({ length: 18 }, () => runes[Math.floor(Math.random() * runes.length)]).join('')
      setCipherText(scramble)

      // Haptic pulse on mobile
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        if (pct % 25 === 0) {
          navigator.vibrate([15, 20])
        }
      }

      if (pct >= 100) {
        clearInterval(timer)
        soundEngine.stopHold()
        soundEngine.dealSealedChime()
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([80, 50, 120])
        }
        setIsSealed(true)
        setIsHolding(false)
        setCipherText('DEAL_AUTHORIZED_VERIFIED')
        triggerExplosion()
      }
    }, 25)

    return () => {
      clearInterval(timer)
      soundEngine.stopHold()
    }
  }, [isHolding, isSealed, triggerExplosion])

  const handleStartHold = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (isSealed) return
    setIsHolding(true)
    soundEngine.tick()
  }

  const handleEndHold = () => {
    if (isSealed) return
    setIsHolding(false)
    setProgress(0)
    soundEngine.stopHold()
    setCipherText('HOLD_ABORTED_RETRY')
  }

  const handleCopyPhone = () => {
    soundEngine.tick()
    navigator.clipboard.writeText(dealRoomData.profile.phone.replace(/\s+/g, '')).then(() => {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2400)
    })
  }

  const toggleOverdrive = () => {
    soundEngine.dealSealedChime()
    const next = !overdriveActive
    setOverdriveActive(next)
    if (next) {
      document.documentElement.classList.add('overdrive-mode')
    } else {
      document.documentElement.classList.remove('overdrive-mode')
    }
  }

  const handleResetVault = () => {
    soundEngine.tick()
    setIsSealed(false)
    setProgress(0)
    setCipherText('AUTHORIZATION_REQUIRED')
  }

  return (
    <section className="deal-section deal-section--obsidian biometric-vault-section" id="chapter-06">
      <div className="deal-container">
        {/* Chapter Strip */}
        <div className="chapter-label-strip">
          <span className="chapter-label-num">Chapter 06 / The vault</span>
          <span className="chapter-label-name">Biometric Authorization & Direct Line</span>
        </div>

        <div className="vault-header">
          <span className="small-caps vault-status-tag">
            {isSealed ? '● DEAL SEALED // VIP HOTLINE LIVE' : '○ TOUCH & HOLD TO EXECUTE DISPATCH'}
          </span>
          <h2 className="serif vault-headline">
            {isSealed ? (
              <>
                Deal <span className="brass-italic">authorized</span>.
              </>
            ) : (
              <>
                Seal the <span className="brass-italic">agreement</span>.
              </>
            )}
          </h2>
          <p className="vault-subheadline">
            {isSealed
              ? 'Executive credentials verified. Priority direct access to Ayush S Kulkarni is now unlocked.'
              : 'Hold the biometric seal below to initiate encrypted handshake and unlock the direct mobile telephone and WhatsApp line.'}
          </p>
        </div>

        {/* VAULT INTERACTIVE HUB */}
        <div className="vault-hub">
          {!isSealed ? (
            <div className="vault-scanner-wrap">
              {/* Background Oscilloscope & Particles Canvas */}
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="vault-oscilloscope-canvas"
                aria-hidden="true"
              />

              {/* Rotating Gear Rings */}
              <div
                className={`vault-rotating-ring vault-rotating-ring--outer ${isHolding ? 'is-fast' : ''}`}
                aria-hidden="true"
              />
              <div
                className={`vault-rotating-ring vault-rotating-ring--inner ${isHolding ? 'is-reverse' : ''}`}
                aria-hidden="true"
              />

              {/* Biometric Thumbprint Interactive Target */}
              <div
                className={`vault-thumb-target ${isHolding ? 'is-holding' : ''}`}
                onMouseDown={handleStartHold}
                onMouseUp={handleEndHold}
                onTouchStart={handleStartHold}
                onTouchEnd={handleEndHold}
                onTouchCancel={handleEndHold}
                role="button"
                tabIndex={0}
                aria-label="Touch and hold to authorize deal"
                onMouseEnter={() => onInteractiveEnter && onInteractiveEnter('Hold')}
                onMouseLeave={() => {
                  handleEndHold()
                  if (onInteractiveLeave) onInteractiveLeave()
                }}
              >
                {/* Thumbprint SVG */}
                <svg
                  className="vault-thumb-svg"
                  viewBox="0 0 100 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 15C32 15 20 28 20 46C20 66 28 88 50 105C72 88 80 66 80 46C80 28 68 15 50 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                  />
                  <path
                    d="M50 25C37 25 28 35 28 48C28 64 36 82 50 95C64 82 72 64 72 48C72 35 63 25 50 25Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 35C42 35 36 41 36 50C36 62 42 74 50 82C58 74 64 62 64 50C64 41 58 35 50 35Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 45C46 45 43 48 43 53C43 60 47 66 50 70C53 66 57 60 57 53C57 48 54 45 50 45Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Laser scan line while holding */}
                {isHolding && <div className="vault-laser-line" />}

                {/* Ring progress indicator */}
                <svg className="vault-progress-svg" viewBox="0 0 160 160">
                  <circle
                    className="vault-progress-bg"
                    cx="80"
                    cy="80"
                    r="74"
                    fill="none"
                    stroke="rgba(184, 151, 90, 0.15)"
                    strokeWidth="3"
                  />
                  <circle
                    className="vault-progress-bar"
                    cx="80"
                    cy="80"
                    r="74"
                    fill="none"
                    stroke="#B8975A"
                    strokeWidth="4"
                    strokeDasharray="465"
                    strokeDashoffset={465 - (465 * progress) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="vault-thumb-label">
                  <span className="vault-pct tabular">{isHolding ? `${progress}%` : 'HOLD'}</span>
                </div>
              </div>

              {/* Real-time Telemetry Readout */}
              <div className="vault-telemetry">
                <span className="vault-telemetry-item tabular">CIPHER: {cipherText}</span>
                <span className="vault-telemetry-item tabular">HASH: {authToken}</span>
              </div>
            </div>
          ) : (
            /* SEALED & UNLOCKED STATE */
            <div className="vault-unlocked-card">
              {/* Golden Wax / Foil Seal Stamp */}
              <div className="vault-seal-stamp" aria-label="Official executive deal seal">
                <div className="vault-seal-inner">
                  <span className="vault-seal-star">★</span>
                  <span className="vault-seal-text">AYUSH S KULKARNI</span>
                  <span className="vault-seal-sub">DEAL AUTHORIZED</span>
                  <span className="vault-seal-star">★</span>
                </div>
              </div>

              <div className="vault-card-body">
                <div className="vault-card-badge">
                  <span className="pulse-dot" /> LIVE DIRECT DISPATCH HOTLINE
                </div>

                <h3 className="vault-card-title">Priority Channel Unlocked</h3>
                <p className="vault-card-desc">
                  This line connects directly to Ayush S Kulkarni on mobile. Suitable for founders,
                  engineering leaders, and enterprise partners ready to move.
                </p>

                {/* VIP ACTION BUTTONS */}
                <div className="vault-actions-grid">
                  {/* DIRECT PHONE CALL */}
                  <a
                    href={`tel:${dealRoomData.profile.phone.replace(/\s+/g, '')}`}
                    className="vault-action-btn vault-action-btn--primary"
                    onClick={() => soundEngine.tick()}
                  >
                    <span className="vault-btn-icon">📞</span>
                    <span className="vault-btn-text">
                      <span className="vault-btn-label">Direct Mobile Call</span>
                      <strong className="vault-btn-val tabular">{dealRoomData.profile.phone}</strong>
                    </span>
                    <span className="vault-btn-arrow">↗</span>
                  </a>

                  {/* WHATSAPP DIRECT */}
                  <a
                    href={dealRoomData.profile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vault-action-btn vault-action-btn--secondary"
                    onClick={() => soundEngine.tick()}
                  >
                    <span className="vault-btn-icon">💬</span>
                    <span className="vault-btn-text">
                      <span className="vault-btn-label">Instant WhatsApp</span>
                      <strong className="vault-btn-val">Chat with Ayush</strong>
                    </span>
                    <span className="vault-btn-arrow">↗</span>
                  </a>
                </div>

                {/* SECONDARY ROW: COPY NUMBER & EMAIL */}
                <div className="vault-secondary-row">
                  <button
                    type="button"
                    className="vault-link-pill"
                    onClick={handleCopyPhone}
                  >
                    {copiedPhone ? '✓ Number copied to clipboard' : 'Copy phone number'}
                  </button>
                  <span className="proof-bar__sep">·</span>
                  <a
                    href={`mailto:${dealRoomData.profile.email}`}
                    className="vault-link-pill"
                    onClick={() => soundEngine.tick()}
                  >
                    Send priority email ({dealRoomData.profile.email})
                  </a>
                </div>

                {/* DEAL CERTIFICATE TICKET */}
                <div className="vault-ticket">
                  <div className="vault-ticket-col">
                    <span className="small-caps" style={{ color: 'var(--brass)' }}>Certificate</span>
                    <span className="tabular" style={{ color: 'var(--bone)', fontSize: '13px' }}>
                      {authToken}
                    </span>
                  </div>
                  <div className="vault-ticket-col">
                    <span className="small-caps" style={{ color: 'var(--stone)' }}>Jurisdiction</span>
                    <span style={{ color: 'var(--bone)', fontSize: '13px' }}>Bengaluru, India</span>
                  </div>
                  <div className="vault-ticket-col">
                    <span className="small-caps" style={{ color: 'var(--stone)' }}>Clearance</span>
                    <span style={{ color: 'var(--brass)', fontSize: '13px', fontWeight: 600 }}>
                      Level 1 Deal Partner
                    </span>
                  </div>
                </div>

                {/* EXTRA CRAZY INTERACTION: OVERDRIVE HUD TOGGLE & RESET */}
                <div className="vault-footer-tools">
                  <button
                    type="button"
                    className={`vault-overdrive-btn ${overdriveActive ? 'is-active' : ''}`}
                    onClick={toggleOverdrive}
                  >
                    ⚡ {overdriveActive ? 'Deactivate Radar Mode' : 'Activate Golden Radar Mode'}
                  </button>
                  <button
                    type="button"
                    className="vault-reset-btn"
                    onClick={handleResetVault}
                  >
                    Reset & Seal Again ↺
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
