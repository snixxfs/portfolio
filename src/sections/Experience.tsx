import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experienceSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceProps {
  reduced: boolean
}

export function Experience({ reduced }: ExperienceProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    const items = Array.from(list.querySelectorAll<HTMLElement>('.timeline__item'))

    const context = gsap.context(() => {
      gsap.set(fill, { scaleY: 0 })

      gsap.to(fill, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: list,
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: 0.5,
        },
      })

      items.forEach((item, index) => {
        const fromLeft = index % 2 === 0
        gsap.fromTo(
          item,
          { opacity: 0, y: 25, x: fromLeft ? -15 : 15 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              once: true,
              onEnter: () => {
                item.style.opacity = '1'
                item.style.transform = 'none'
              },
            },
            clearProps: 'opacity,transform',
          }
        )
      })
    }, list)

    // Fail-safe: ensure timeline items are never stuck invisible
    const safetyTimer = window.setTimeout(() => {
      items.forEach((item) => {
        if (item.style.opacity === '0') {
          item.style.opacity = '1'
          item.style.transform = 'none'
        }
      })
    }, 1500)

    return () => {
      window.clearTimeout(safetyTimer)
      context.revert()
    }
  }, [reduced])

  return (
    <section className="section" id="exp" aria-labelledby="exp-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={experienceSection.kicker}
          heading={experienceSection.heading}
          caption={experienceSection.caption}
          id="exp-heading"
        />

        <div className="timeline">
          <div className="timeline__rail" aria-hidden="true">
            <div className="timeline__rail-fill" ref={fillRef} />
          </div>

          <ol className="timeline__list" ref={listRef}>
            {experienceSection.items.map((item) => {
              const isCurrent = item.date.includes('Present') || item.date.includes('CURRENT')
              return (
                <li
                  className={`timeline__item corner-brackets${isCurrent ? ' timeline__item--current' : ''}`}
                  key={`${item.title}-${item.org}`}
                >
                  <div className="timeline__header">
                    <span className="timeline__date">
                      {item.date}
                    </span>
                    {item.badge ? (
                      <span className="timeline__badge">{item.badge}</span>
                    ) : null}
                  </div>

                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__org">{item.org}</p>

                  <ul className="timeline__bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
