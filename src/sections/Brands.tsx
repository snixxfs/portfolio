import { brandsSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { Marquee } from '../components/Marquee'

interface BrandsProps {
  reduced: boolean
}

export function Brands({ reduced }: BrandsProps) {
  const brandNames = brandsSection.brands.map((b) => b.name)

  return (
    <section className="section brands" id="brands" aria-labelledby="brands-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={brandsSection.kicker}
          heading={brandsSection.heading}
          caption={brandsSection.caption}
          id="brands-heading"
        />

        <div className="brands__grid reveal">
          {brandsSection.brands.map((brand) => (
            <div className="brand-card corner-brackets" key={brand.name}>
              <span className="brand-card__name">{brand.name}</span>
              <span className="brand-card__category">{brand.category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="brands__ticker-wrap">
        <Marquee
          items={brandNames}
          variant="brands"
          speed={50}
          reduced={reduced}
          label="Sponsors signed at Kalpavikas 1.0 and 2.0"
        />
      </div>

      <div className="section__inner">
        <p className="brands__hint">
          Closed via cold outreach, stakeholder negotiations, and executive proposals across 30-day sprint cycles.
        </p>
      </div>
    </section>
  )
}
