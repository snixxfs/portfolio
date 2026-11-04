import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { impactSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface ImpactProps {
  reduced: boolean
}

export function Impact({ reduced }: ImpactProps) {
  const ledgerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ledgerRef.current
    if (!root || reduced) return

    const rows = Array.from(root.querySelectorAll<HTMLElement>('.ledger-row'))
    const context = gsap.context(() => {
      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',
              once: true,
            },
          }
        )
      })
    }, root)

    return () => context.revert()
  }, [reduced])

  return (
    <section className="section impact-section" id="impact" aria-labelledby="impact-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={impactSection.kicker}
          heading={impactSection.heading}
          caption={impactSection.caption}
          id="impact-heading"
        />

        {/* Monumental Typographic Ledger — Open Editorial Architecture (No Boxes) */}
        <div className="impact-ledger" ref={ledgerRef}>
          {/* Item 01: Enterprise Sponsorships */}
          <article className="ledger-row" tabIndex={0}>
            <div className="ledger-row__meta">
              <span className="ledger-row__index">01</span>
              <span className="ledger-row__domain">ENTERPRISE CAPITAL</span>
            </div>

            <div className="ledger-row__figure">
              <span className="ledger-row__stat">₹13,00,000+</span>
              <span className="ledger-row__badge">KALPAVIKAS 1.0 & 2.0</span>
            </div>

            <div className="ledger-row__content">
              <h3 className="ledger-row__title">Sponsorships Led Across 20 Enterprise Brands</h3>
              <p className="ledger-row__desc">
                Closed ₹13 lakh in total sponsorships comprising ₹2.8 lakh in direct cash and ₹10.2 lakh in high-value in-kind contributions via 100% cold outreach and founder deal negotiations.
              </p>
              <div className="ledger-row__brands">
                <span className="ledger-brand-tag">Mercedes-Benz</span>
                <span className="ledger-brand-tag">Cisco</span>
                <span className="ledger-brand-tag">Mahindra</span>
                <span className="ledger-brand-tag">Red Bull</span>
                <span className="ledger-brand-tag">TVS Motors</span>
                <span className="ledger-brand-tag">Nokia</span>
                <span className="ledger-brand-tag">HP</span>
                <span className="ledger-brand-tag">ixigo</span>
                <span className="ledger-brand-tag">+12 more</span>
              </div>
            </div>

            <div className="ledger-row__action" aria-hidden="true">
              <span className="ledger-row__arrow">→</span>
            </div>
          </article>

          {/* Item 02: AI Build Sprint */}
          <article className="ledger-row" tabIndex={0}>
            <div className="ledger-row__meta">
              <span className="ledger-row__index">02</span>
              <span className="ledger-row__domain">MACHINE LEARNING</span>
            </div>

            <div className="ledger-row__figure">
              <span className="ledger-row__stat">DOMAIN WINNER</span>
              <span className="ledger-row__badge ledger-row__badge--gold">TOP 5 OF 60+ TEAMS</span>
            </div>

            <div className="ledger-row__content">
              <h3 className="ledger-row__title">National AI Build Sprint Winner</h3>
              <p className="ledger-row__desc">
                Domain Winner at AI Build Sprint (one of 5 winners among 60+ national competing teams). Architected and deployed production machine learning workflows evaluating financial dealflow intelligence.
              </p>
              <div className="ledger-row__metrics-strip">
                <span className="ledger-metric-chip">60+ National Teams</span>
                <span className="ledger-metric-chip">5 Winning Domain Tracks</span>
                <span className="ledger-metric-chip">End-to-End LLM Architecture</span>
              </div>
            </div>

            <div className="ledger-row__action" aria-hidden="true">
              <span className="ledger-row__arrow">→</span>
            </div>
          </article>

          {/* Item 03: Argonyx '26 */}
          <article className="ledger-row" tabIndex={0}>
            <div className="ledger-row__meta">
              <span className="ledger-row__index">03</span>
              <span className="ledger-row__domain">HACKATHON LEADERSHIP</span>
            </div>

            <div className="ledger-row__figure">
              <span className="ledger-row__stat">ARGONYX ’26</span>
              <span className="ledger-row__badge">220+ TEAMS · 5 COUNTRIES</span>
            </div>

            <div className="ledger-row__content">
              <h3 className="ledger-row__title">One of Three Main Coordinators</h3>
              <p className="ledger-row__desc">
                Co-led a 24-hour national hackathon featuring 220+ registered teams across 5 countries. Orchestrated outreach, institutional sponsorships, judge curation, and on-ground deployment.
              </p>
              <div className="ledger-row__judges-strip">
                <span className="ledger-judge-label">Judged by Leadership from:</span>
                <span className="ledger-judge-pill">JPMorgan Chase</span>
                <span className="ledger-judge-pill">Morgan Stanley</span>
                <span className="ledger-judge-pill">Google</span>
                <span className="ledger-judge-pill">NASSCOM</span>
              </div>
            </div>

            <div className="ledger-row__action" aria-hidden="true">
              <span className="ledger-row__arrow">→</span>
            </div>
          </article>

          {/* Item 04: Community Builder */}
          <article className="ledger-row" tabIndex={0}>
            <div className="ledger-row__meta">
              <span className="ledger-row__index">04</span>
              <span className="ledger-row__domain">COMMUNITY & SCALE</span>
            </div>

            <div className="ledger-row__figure">
              <span className="ledger-row__stat">10,000+</span>
              <span className="ledger-row__badge">SUBSCRIBERS</span>
            </div>

            <div className="ledger-row__content">
              <h3 className="ledger-row__title">Founder & Mentor Community</h3>
              <p className="ledger-row__desc">
                Scaled an organic digital ecosystem to 10,000+ subscribers, connecting student founders with seasoned operators across real estate, aviation, wealth, and cross-border taxation.
              </p>
            </div>

            <div className="ledger-row__action" aria-hidden="true">
              <span className="ledger-row__arrow">→</span>
            </div>
          </article>

          {/* Item 05: Startup World Cup */}
          <article className="ledger-row" tabIndex={0}>
            <div className="ledger-row__meta">
              <span className="ledger-row__index">05</span>
              <span className="ledger-row__domain">VENTURE OPERATIONS</span>
            </div>

            <div className="ledger-row__figure">
              <span className="ledger-row__stat">STARTUP WORLD CUP</span>
              <span className="ledger-row__badge">PEGASUS TECH VENTURES</span>
            </div>

            <div className="ledger-row__content">
              <h3 className="ledger-row__title">Bengaluru Regional Finale Organizing Team</h3>
              <p className="ledger-row__desc">
                Supported event operations and ecosystem management for the regional finale hosted by Pegasus Tech Ventures in collaboration with CEDAT, interfacing with top venture capital partners and founders.
              </p>
            </div>

            <div className="ledger-row__action" aria-hidden="true">
              <span className="ledger-row__arrow">→</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
