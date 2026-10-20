import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutSection, RICH_MARKERS } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  reduced: boolean
}

type WordKind = 'plain' | 'bold' | 'em'

interface Word {
  text: string
  kind: WordKind
}

function toWords(text: string): Word[] {
  const segments = text.split(RICH_MARKERS).filter(Boolean)
  const words: Word[] = []

  for (const segment of segments) {
    let kind: WordKind = 'plain'
    let body = segment
    if (segment.startsWith('**') && segment.endsWith('**')) {
      kind = 'bold'
      body = segment.slice(2, -2)
    } else if (segment.startsWith('_') && segment.endsWith('_') && segment.length > 2) {
      kind = 'em'
      body = segment.slice(1, -1)
    }
    for (const token of body.split(/\s+/).filter(Boolean)) {
      words.push({ text: token, kind })
    }
  }
  return words
}

export function About({ reduced }: AboutProps) {
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = copyRef.current
    if (!root) return

    const words = Array.from(root.querySelectorAll<HTMLElement>('.word'))
    if (reduced) {
      words.forEach((word) => word.classList.add('is-lit'))
      root.classList.remove('about__copy--scrub')
      return
    }

    root.classList.add('about__copy--scrub')

    const state = { lit: 0 }
    const total = words.length

    const setLit = (count: number) => {
      const clamped = Math.max(0, Math.min(total, Math.round(count)))
      if (clamped === state.lit) return
      const from = Math.min(state.lit, clamped)
      const to = Math.max(state.lit, clamped)
      for (let i = from; i < to; i += 1) {
        words[i]?.classList.toggle('is-lit', i < clamped)
      }
      state.lit = clamped
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 78%',
      end: 'bottom 55%',
      onUpdate: (self) => setLit(self.progress * total * 1.05),
      onLeave: () => setLit(total),
      onLeaveBack: () => setLit(0),
    })

    return () => {
      trigger.kill()
      root.classList.remove('about__copy--scrub')
    }
  }, [reduced])

  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={aboutSection.kicker}
          heading={aboutSection.editorialTitle}
          id="about-heading"
        />

        <div className="about">
          <div className="about__editorial">
            <h2 className="about__editorial-title">
              {aboutSection.headline}
            </h2>
            <div className="about__copy" ref={copyRef}>
              {aboutSection.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>
                  {toWords(paragraph).map((word, index) => (
                    <span
                      key={`${pIndex}-${index}`}
                      className={`word${word.kind === 'em' ? ' rt-em' : ''}${word.kind === 'bold' ? ' rt-b' : ''}`}
                    >
                      {word.text}{' '}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          <aside className="about__terminal reveal corner-brackets" aria-labelledby="terminal-heading">
            <div className="about__terminal-header">
              <div className="about__terminal-dots">
                <span className="about__terminal-dot about__terminal-dot--red" />
                <span className="about__terminal-dot about__terminal-dot--yellow" />
                <span className="about__terminal-dot about__terminal-dot--green" />
              </div>
              <h3 className="about__terminal-title" id="terminal-heading">
                {aboutSection.terminalHeading}
              </h3>
              <span className="about__terminal-status">
                <span className="about__terminal-status-dot" />
                {aboutSection.terminalStatus}
              </span>
            </div>

            {/* Current Executive Roles */}
            <div className="about__roles">
              <div className="about__subhead">OFFICIAL CURRENT APPOINTMENTS</div>
              <div className="about__roles-list">
                {aboutSection.roles.map((role) => (
                  <div className="about__role-item" key={role.org}>
                    <span className="about__role-badge">{role.period}</span>
                    <div className="about__role-detail">
                      <strong className="about__role-title">{role.title}</strong>
                      <span className="about__role-org">{role.org}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Initiatives Feed */}
            <div className="about__live-now">
              <div className="about__subhead">ACTIVE FOCUS & DISPATCHES</div>
              <ul className="about__terminal-list">
                {aboutSection.now.map((item, index) => (
                  <li key={item}>
                    <span className="about__terminal-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="about__terminal-item">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
