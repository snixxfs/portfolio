import { useRef, useState } from 'react'
import { hatsSection, type HatKey } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Hats() {
  const [selected, setSelected] = useState<HatKey>('build')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const active = hatsSection.tabs.find((tab) => tab.id === selected) ?? hatsSection.tabs[0]

  const focusTab = (index: number) => {
    const next = (index + hatsSection.tabs.length) % hatsSection.tabs.length
    const tab = hatsSection.tabs[next]
    if (!tab) return
    setSelected(tab.id)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        focusTab(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        focusTab(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusTab(0)
        break
      case 'End':
        event.preventDefault()
        focusTab(hatsSection.tabs.length - 1)
        break
      default:
        break
    }
  }

  return (
    <section className="section" id="hats" aria-labelledby="hats-heading">
      <div className="section__inner">
        <SectionHeading kicker={hatsSection.kicker} heading={hatsSection.heading} id="hats-heading" />

        {/* Tab Switcher */}
        <div className="hats__tabs" role="tablist" aria-label="Core Strengths">
          {hatsSection.tabs.map((tab, index) => {
            const isSelected = tab.id === selected
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`hat-tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`hat-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={`hat-tab${isSelected ? ' hat-tab--active' : ''}`}
                onClick={() => setSelected(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="hat-tab__number">
                  0{index + 1} // {tab.small}
                </span>
                <span className="hat-tab__label">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Visible Active Panel */}
        {active ? (
          <div
            key={active.id}
            className="hats__panel"
            role="tabpanel"
            id={`hat-panel-${active.id}`}
            aria-labelledby={`hat-tab-${active.id}`}
            tabIndex={0}
          >
            <div className="hats__grid">
              {active.panels.map((panel, pIdx) => (
                <article
                  className={`hat-card corner-brackets${pIdx === 0 ? ' hat-card--hero' : ''}`}
                  key={panel.title}
                >
                  <div className="hat-card__badge-wrap">
                    <span className="hat-card__badge">{panel.big}</span>
                  </div>
                  <h3 className="hat-card__title">{panel.title}</h3>
                  <p className="hat-card__text">{panel.text}</p>
                  <div className="hat-card__tags">
                    {panel.tags.map((tag) => (
                      <span className="hat-card__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
