import { vcSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function VentureCapital() {
  const featuredCount = vcSection.entities.filter((entity) => entity.featured).length

  return (
    <section className="section" id="vc" aria-labelledby="vc-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={vcSection.kicker}
          heading={vcSection.heading}
          caption={vcSection.caption}
          id="vc-heading"
        />

        <div className="vc-grid reveal" role="list" aria-label="Ecosystem organisations">
          {vcSection.entities.map((entity) => (
            <div
              key={entity.name}
              role="listitem"
              className={`vc-card corner-brackets${entity.featured ? ' vc-card--featured' : ''}`}
            >
              <div className="vc-card__dot" aria-hidden="true" />
              <div className="vc-card__info">
                <h3 className="vc-card__name">{entity.name}</h3>
                {entity.tag ? <span className="vc-card__tag">{entity.tag}</span> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="vc-meta reveal">
          <div className="vc-meta__item">
            <span className="vc-meta__val">{vcSection.entities.length}</span>
            <span className="vc-meta__lbl">Active Institutional Nodes</span>
          </div>
          <div className="vc-meta__divider" aria-hidden="true" />
          <div className="vc-meta__item">
            <span className="vc-meta__val">{featuredCount}</span>
            <span className="vc-meta__lbl">Key Institutional Partners</span>
          </div>
          <div className="vc-meta__divider" aria-hidden="true" />
          <div className="vc-meta__item">
            <span className="vc-meta__val">Bengaluru</span>
            <span className="vc-meta__lbl">Epicentre of Venture Capital</span>
          </div>
        </div>
      </div>
    </section>
  )
}
