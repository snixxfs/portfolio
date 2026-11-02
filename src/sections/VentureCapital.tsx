import { vcSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function VentureCapital() {
  const featuredEntities = vcSection.entities.filter((entity) => entity.featured)
  const regularEntities = vcSection.entities.filter((entity) => !entity.featured)

  return (
    <section className="section vc-constellation" id="vc" aria-labelledby="vc-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={vcSection.kicker}
          heading={vcSection.heading}
          caption={vcSection.caption}
          id="vc-heading"
        />

        {/* Tier 1: Core Institutional Anchors */}
        <div className="vc-anchors">
          <div className="vc-anchors__kicker">
            <span className="vc-anchors__dot" aria-hidden="true" />
            <span>PRIMARY VENTURE & INSTITUTIONAL ANCHORS</span>
          </div>

          <div className="vc-anchors__grid">
            {featuredEntities.map((entity) => (
              <div key={entity.name} className="vc-anchor-card">
                <div className="vc-anchor-card__glow" aria-hidden="true" />
                <div className="vc-anchor-card__content">
                  <div className="vc-anchor-card__badge">FEATURED PARTNER</div>
                  <h3 className="vc-anchor-card__name">{entity.name}</h3>
                  <p className="vc-anchor-card__tag">{entity.tag}</p>
                </div>
                <div className="vc-anchor-card__status" aria-hidden="true">
                  <span className="vc-anchor-card__signal" />
                  <span className="vc-anchor-card__label">CONNECTED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Ecosystem & Angel Syndicates Constellation */}
        <div className="vc-ecosystem">
          <div className="vc-ecosystem__kicker">
            <span className="vc-ecosystem__dot" aria-hidden="true" />
            <span>SYNDICATES, ACCELERATORS & ECOSYSTEM NODES</span>
          </div>

          <div className="vc-constellation-cloud" role="list">
            {regularEntities.map((entity) => (
              <div key={entity.name} role="listitem" className="vc-pill-node">
                <span className="vc-pill-node__dot" aria-hidden="true" />
                <div className="vc-pill-node__info">
                  <span className="vc-pill-node__name">{entity.name}</span>
                  {entity.tag && <span className="vc-pill-node__tag">{entity.tag}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="vc-meta reveal">
          <div className="vc-meta__item">
            <span className="vc-meta__val">{vcSection.entities.length}</span>
            <span className="vc-meta__lbl">Active Institutional Nodes</span>
          </div>
          <div className="vc-meta__divider" aria-hidden="true" />
          <div className="vc-meta__item">
            <span className="vc-meta__val">{featuredEntities.length}</span>
            <span className="vc-meta__lbl">Tier-1 Venture Anchors</span>
          </div>
          <div className="vc-meta__divider" aria-hidden="true" />
          <div className="vc-meta__item">
            <span className="vc-meta__val">Bengaluru</span>
            <span className="vc-meta__lbl">Ecosystem Epicentre</span>
          </div>
        </div>
      </div>
    </section>
  )
}
