import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experienceSection, type ExperienceItem } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceProps {
  reduced: boolean
}

type CategoryFilter = 'all' | 'leadership' | 'tech' | 'venture'

export function Experience({ reduced }: ExperienceProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all')
  const streamRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const filteredItems = useMemo(() => {
    if (filter === 'all') return experienceSection.items
    return experienceSection.items.filter((item) => item.category === filter)
  }, [filter])

  const counts = useMemo(() => {
    const total = experienceSection.items.length
    const leadership = experienceSection.items.filter((i) => i.category === 'leadership').length
    const tech = experienceSection.items.filter((i) => i.category === 'tech').length
    const venture = experienceSection.items.filter((i) => i.category === 'venture').length
    return { all: total, leadership, tech, venture }
  }, [])

  useEffect(() => {
    if (reduced) return
    const stream = streamRef.current
    if (!stream) return

    const cards = Array.from(stream.querySelectorAll<HTMLElement>('.exp-card'))
    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
            clearProps: 'opacity,transform',
          }
        )
      })
    }, stream)

    return () => context.revert()
  }, [reduced, filteredItems])

  return (
    <section className="section experience" id="exp" aria-labelledby="exp-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={experienceSection.kicker}
          heading={experienceSection.heading}
          caption={experienceSection.caption}
          id="exp-heading"
        />

        <div className="exp-layout">
          {/* Left Column: Sticky Command Console */}
          <aside className="exp-sidebar" aria-label="Timeline navigation and executive summary">
            <div className="exp-sidebar__sticky">
              <div className="exp-sidebar__header">
                <div className="exp-sidebar__telemetry">
                  <span className="exp-sidebar__dot" aria-hidden="true" />
                  <span className="exp-sidebar__label">CHRONO STREAM // LIVE</span>
                </div>
                <h3 className="exp-sidebar__title">Command Stream</h3>
                <p className="exp-sidebar__desc">
                  Active mandates, institutional leadership, and technical track record across Bangalore's venture & builder ecosystem.
                </p>
              </div>

              {/* Active Current Mandates Spotlight */}
              <div className="exp-mandates">
                <div className="exp-mandates__header">
                  <span className="exp-mandates__dot" />
                  <span>ACTIVE APPOINTMENTS</span>
                </div>
                <div className="exp-mandates__list">
                  <div className="exp-mandates__item">
                    <span className="exp-mandates__role">President</span>
                    <span className="exp-mandates__org">ECell, RV University</span>
                  </div>
                  <div className="exp-mandates__item">
                    <span className="exp-mandates__role">Core Member</span>
                    <span className="exp-mandates__org">AWS Student Builders</span>
                  </div>
                  <div className="exp-mandates__item">
                    <span className="exp-mandates__role">Project Executive</span>
                    <span className="exp-mandates__org">CEDAT Venture Ecosystem</span>
                  </div>
                </div>
              </div>

              {/* Interactive Category Filter Tabs */}
              <div className="exp-filters" role="tablist" aria-label="Experience domains">
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'all'}
                  className={`exp-filter__btn ${filter === 'all' ? 'exp-filter__btn--active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  <span>All Tracks</span>
                  <span className="exp-filter__count">{counts.all}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'leadership'}
                  className={`exp-filter__btn ${filter === 'leadership' ? 'exp-filter__btn--active' : ''}`}
                  onClick={() => setFilter('leadership')}
                >
                  <span>Leadership & Founder</span>
                  <span className="exp-filter__count">{counts.leadership}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'tech'}
                  className={`exp-filter__btn ${filter === 'tech' ? 'exp-filter__btn--active' : ''}`}
                  onClick={() => setFilter('tech')}
                >
                  <span>Tech & Cloud (AWS)</span>
                  <span className="exp-filter__count">{counts.tech}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'venture'}
                  className={`exp-filter__btn ${filter === 'venture' ? 'exp-filter__btn--active' : ''}`}
                  onClick={() => setFilter('venture')}
                >
                  <span>Venture & Capital</span>
                  <span className="exp-filter__count">{counts.venture}</span>
                </button>
              </div>

              <div className="exp-sidebar__badge">
                <span>RV UNIVERSITY // VERIFIED PORTFOLIO</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Fluid Milestone Stream */}
          <main className="exp-stream" ref={streamRef}>
            <div className="exp-stream__rail" ref={railRef} aria-hidden="true" />

            <div className="exp-stream__cards">
              {filteredItems.map((item: ExperienceItem, idx: number) => {
                const isCurrent = item.date.includes('Present') || item.date.includes('CURRENT')
                return (
                  <article
                    key={`${item.title}-${item.org}-${idx}`}
                    className={`exp-card ${isCurrent ? 'exp-card--current' : ''}`}
                  >
                    <div className="exp-card__connector" aria-hidden="true">
                      <div className={`exp-card__node ${isCurrent ? 'exp-card__node--current' : ''}`} />
                    </div>

                    <div className="exp-card__inner">
                      <div className="exp-card__header">
                        <div className="exp-card__meta-left">
                          <span className="exp-card__date">{item.date}</span>
                          {isCurrent && (
                            <span className="exp-card__live-pill">
                              <span className="exp-card__pulse" />
                              CURRENT
                            </span>
                          )}
                        </div>

                        <div className="exp-card__meta-right">
                          <span className="exp-card__category">#{item.category.toUpperCase()}</span>
                          {item.badge && (
                            <span className="exp-card__badge">{item.badge}</span>
                          )}
                        </div>
                      </div>

                      <div className="exp-card__title-wrap">
                        <h4 className="exp-card__title">{item.title}</h4>
                        <p className="exp-card__org">{item.org}</p>
                      </div>

                      <ul className="exp-card__bullets">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="exp-card__bullet-item">
                            <span className="exp-card__bullet-arrow" aria-hidden="true">▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
