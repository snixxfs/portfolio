import { useMemo, useState } from 'react'
import { experienceSection, type ExperienceItem } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

interface ExperienceProps {
  reduced: boolean
}

type CategoryFilter = 'all' | 'leadership' | 'tech' | 'venture'

export function Experience({ reduced: _reduced }: ExperienceProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all')

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

  return (
    <section className="section experience-section" id="exp" aria-labelledby="exp-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={experienceSection.kicker}
          heading={experienceSection.heading}
          caption={experienceSection.caption}
          id="exp-heading"
        />

        {/* Minimalist Executive Domain Filter */}
        <div className="exp-ledger-filters" role="tablist" aria-label="Experience tracks">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={`exp-ledger-tab ${filter === 'all' ? 'exp-ledger-tab--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span>All Mandates</span>
            <span className="exp-ledger-tab__count">({counts.all})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'leadership'}
            className={`exp-ledger-tab ${filter === 'leadership' ? 'exp-ledger-tab--active' : ''}`}
            onClick={() => setFilter('leadership')}
          >
            <span>Executive & Leadership</span>
            <span className="exp-ledger-tab__count">({counts.leadership})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'tech'}
            className={`exp-ledger-tab ${filter === 'tech' ? 'exp-ledger-tab--active' : ''}`}
            onClick={() => setFilter('tech')}
          >
            <span>Cloud & Tech (AWS/GDG)</span>
            <span className="exp-ledger-tab__count">({counts.tech})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'venture'}
            className={`exp-ledger-tab ${filter === 'venture' ? 'exp-ledger-tab--active' : ''}`}
            onClick={() => setFilter('venture')}
          >
            <span>Venture & Capital</span>
            <span className="exp-ledger-tab__count">({counts.venture})</span>
          </button>
        </div>

        {/* Chronological Executive Ledger (Zero Box Architecture) */}
        <div className="exp-ledger" role="list">
          {filteredItems.map((item: ExperienceItem, idx: number) => {
            const isCurrent = item.date.includes('Present') || item.date.includes('CURRENT')

            return (
              <article
                key={`${item.title}-${item.org}-${idx}`}
                role="listitem"
                className={`exp-ledger-row ${isCurrent ? 'exp-ledger-row--current' : ''}`}
              >
                {/* Column 1: Date & Status */}
                <div className="exp-ledger-row__date-col">
                  <span className="exp-ledger-row__date">{item.date}</span>
                  {isCurrent && (
                    <span className="exp-ledger-row__live-badge">
                      <span className="exp-ledger-row__live-dot" />
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Column 2: Role & Organization */}
                <div className="exp-ledger-row__title-col">
                  <h3 className="exp-ledger-row__role">{item.title}</h3>
                  <p className="exp-ledger-row__org">{item.org}</p>
                  {item.badge && (
                    <span className="exp-ledger-row__badge">{item.badge}</span>
                  )}
                </div>

                {/* Column 3: Mandate Bullets */}
                <div className="exp-ledger-row__details-col">
                  <ul className="exp-ledger-row__bullets">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="exp-ledger-row__bullet">
                        <span className="exp-ledger-row__bullet-icon" aria-hidden="true">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: Track Tag */}
                <div className="exp-ledger-row__track-col">
                  <span className="exp-ledger-row__track-tag">
                    #{item.category.toUpperCase()}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
