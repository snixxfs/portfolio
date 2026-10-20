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

        <div className="impact__grid" ref={gridRef}>
          {impactSection.stats.map((stat, index) => {
            const isFeatured = index === 0
            return (
              <article
                className={`impact__card corner-brackets${isFeatured ? ' impact__card--featured' : ''}`}
                key={stat.label}
              >
                <div className="impact__card-top">
                  <span className="impact__card-index">0{index + 1} // VERIFIED</span>
                  {stat.sublabel ? <span className="impact__card-tag">{stat.sublabel}</span> : null}
                </div>

                <div className="impact__card-value-wrap">
                  <span
                    className="impact__card-value"
                    data-count={stat.count}
                    data-value={stat.value}
                  >
                    {stat.value}
                  </span>
                </div>

                <h3 className="impact__card-label">{stat.label}</h3>
                <p className="impact__card-description">{stat.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
