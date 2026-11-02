import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { impactSection, type Stat } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface ImpactProps {
  reduced: boolean
}

function formatCount(stat: Stat, value: number): string {
  return `${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`
}

export function Impact({ reduced }: ImpactProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = gridRef.current
    if (!root || reduced) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('.impact__card'))
    const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'))

    const context = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: 'top 82%',
          once: true,
        },
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          for (const node of counters) {
            const target = Number(node.dataset.count ?? '0')
            const statValue = node.dataset.value
            const stat = impactSection.stats.find((item) => item.value === statValue)
            if (!stat || isNaN(target)) continue

            const proxy = { value: 0 }
            gsap.to(proxy, {
              value: target,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                node.textContent = formatCount(stat, Math.round(proxy.value))
              },
              onComplete: () => {
                node.textContent = stat.value
              },
            })
          }
        },
      })
    }, root)

    return () => context.revert()
  }, [reduced])

  return (
    <section className="section" id="impact" aria-labelledby="impact-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={impactSection.kicker}
          heading={impactSection.heading}
          caption={impactSection.caption}
          id="impact-heading"
        />

        <div className="impact__bento" ref={gridRef}>
          {/* Card 0: 2x2 Hero Bento — ₹13L+ Sponsorships */}
          <article className="impact__bento-card impact__bento-card--hero corner-brackets">
            <div className="impact__bento-top">
              <span className="impact__bento-tag">01 // ENTERPRISE CAPITAL</span>
              <span className="impact__bento-badge">KALPAVIKAS 1.0 & 2.0</span>
            </div>
            
            <div className="impact__bento-value-wrap">
              <span className="impact__bento-value" data-count={13} data-value="₹13L+">
                ₹13L+
              </span>
            </div>

            <h3 className="impact__bento-title">Sponsorships Led Across 20 Brands</h3>
            <p className="impact__bento-desc">
              Secured ₹13 lakh in sponsorships comprising ₹2.8 lakh in cash and ₹10.2 lakh in-kind contributions via 100% direct cold outreach and executive negotiations.
            </p>

            <div className="impact__bento-brands">
              <span className="impact__bento-brand">Mercedes-Benz</span>
              <span className="impact__bento-brand">Cisco</span>
              <span className="impact__bento-brand">Mahindra</span>
              <span className="impact__bento-brand">Red Bull</span>
              <span className="impact__bento-brand">TVS Motors</span>
              <span className="impact__bento-brand">Nokia</span>
              <span className="impact__bento-brand">HP</span>
              <span className="impact__bento-brand">CodeChef</span>
            </div>
          </article>

          {/* Card 1: Tall 1x2 Bento — Domain Winner AI Sprint */}
          <article className="impact__bento-card impact__bento-card--tall corner-brackets">
            <div className="impact__bento-top">
              <span className="impact__bento-tag">02 // AI BUILD SPRINT</span>
              <span className="impact__bento-badge impact__bento-badge--gold">TOP 5 / 60+</span>
            </div>

            <div className="impact__bento-value-wrap">
              <span className="impact__bento-value">Domain Winner</span>
            </div>

            <h3 className="impact__bento-title">AI Insurance Claim Platform</h3>
            <p className="impact__bento-desc">
              Domain Winner at AI Build Sprint (one of 5 winners among 60+ teams / 180+ developers) with live computer vision damage evaluation, fraud risk triage, and rule engines.
            </p>

            <div className="impact__bento-chips">
              <span className="impact__bento-chip">Computer Vision</span>
              <span className="impact__bento-chip">Fraud Scoring</span>
              <span className="impact__bento-chip">FastAPI</span>
            </div>
          </article>

          {/* Card 2: Wide 2x1 Panoramic Bento — Argonyx '26 */}
          <article className="impact__bento-card impact__bento-card--wide corner-brackets">
            <div className="impact__bento-top">
              <span className="impact__bento-tag">03 // NATIONAL HACKATHON</span>
              <span className="impact__bento-badge impact__bento-badge--cyan">24H FLAGSHIP</span>
            </div>

            <div className="impact__bento-wide-body">
              <div>
                <div className="impact__bento-value-wrap">
                  <span className="impact__bento-value">220+ Teams / 5 Countries</span>
                </div>
                <h3 className="impact__bento-title">One of Three Main Coordinators: Argonyx '26</h3>
                <p className="impact__bento-desc">
                  Co-led a 24-hour national hackathon featuring 220+ registered teams across 5 countries; coordinated event operations, sponsorships, and judges from JPMC, Morgan Stanley, Google, and NASSCOM.
                </p>
              </div>
            </div>
          </article>

          {/* Card 3: 1x1 Compact Bento — 10K+ Community */}
          <article className="impact__bento-card impact__bento-card--compact corner-brackets">
            <div className="impact__bento-top">
              <span className="impact__bento-tag">04 // DISTRIBUTION</span>
            </div>
            <div className="impact__bento-value-wrap">
              <span className="impact__bento-value" data-count={10} data-value="10K+">
                10K+
              </span>
            </div>
            <h3 className="impact__bento-title">Telegram Community Scaled</h3>
            <p className="impact__bento-desc">
              Built and grew an active 10,000+ subscriber network with mentors across real estate, aviation, and international taxation.
            </p>
          </article>

          {/* Card 4: 1x1 Compact Bento — Startup World Cup */}
          <article className="impact__bento-card impact__bento-card--compact corner-brackets">
            <div className="impact__bento-top">
              <span className="impact__bento-tag">05 // VENTURE OPS</span>
            </div>
            <div className="impact__bento-value-wrap">
              <span className="impact__bento-value">$1M Global</span>
            </div>
            <h3 className="impact__bento-title">Startup World Cup</h3>
            <p className="impact__bento-desc">
              Supported Bengaluru Regional Finale operations organized by Pegasus Tech Ventures in collaboration with CEDAT.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
