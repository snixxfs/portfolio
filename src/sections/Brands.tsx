import { useState } from 'react'
import { brandsSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { Marquee } from '../components/Marquee'

interface BrandsProps {
  reduced: boolean
}

export function Brands({ reduced }: BrandsProps) {
  const brandNames = brandsSection.brands.map((b) => b.name)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    'all',
    'Tech & Telecom',
    'Automotive & Industrial',
    'Lifestyle & F&B',
  ]

  const categorizedBrands = brandsSection.brands.filter((b) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'Tech & Telecom') {
      return ['Enterprise Networking', 'Telecommunications', 'Computing & Tech', 'Travel Tech', 'EdTech & Dev', 'EdTech Unicorn', 'Enterprise Solutions', 'Smart Retail IoT'].includes(b.category)
    }
    if (activeCategory === 'Automotive & Industrial') {
      return ['Luxury Automotive', 'Industrial & Auto', 'Automotive OEM'].includes(b.category)
    }
    if (activeCategory === 'Lifestyle & F&B') {
      return ['Energy & Lifestyle', 'Performance Apparel', 'Health & Fitness', 'F&B Retail', 'Gourmet Culinary', 'Hospitality & Dining', 'Premium Sweets', 'Specialty Coffee'].includes(b.category)
    }
    return true
  })

  return (
    <section className="section brands" id="brands" aria-labelledby="brands-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={brandsSection.kicker}
          heading={brandsSection.heading}
          caption={brandsSection.caption}
          id="brands-heading"
        />

        {/* Dual Marquee Ticker */}
        <div className="brands__marquee-stage">
          <div className="brands__marquee-label">MARQUEE PARTNER STREAM // KALPAVIKAS 1.0 & 2.0</div>
          <Marquee
            items={brandNames}
            variant="brands"
            speed={45}
            reduced={reduced}
            label="Sponsors signed at Kalpavikas 1.0 and 2.0"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="brands__filters" role="tablist" aria-label="Brand categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`brands__filter-pill ${activeCategory === cat ? 'brands__filter-pill--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All 20 Brands' : cat}
            </button>
          ))}
        </div>

        {/* Dynamic Brand Showcase Grid */}
        <div className="brands__directory" role="list">
          {categorizedBrands.map((brand) => (
            <div className="brand-chip" key={brand.name} role="listitem">
              <div className="brand-chip__corner" aria-hidden="true" />
              <div className="brand-chip__inner">
                <span className="brand-chip__name">{brand.name}</span>
                <span className="brand-chip__category">{brand.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Deal Sourcing Executive Footer */}
        <div className="brands__summary-bar">
          <div className="brands__summary-item">
            <span className="brands__summary-value">₹13,00,000</span>
            <span className="brands__summary-caption">Total Sponsorship Value Led</span>
          </div>
          <div className="brands__summary-divider" aria-hidden="true" />
          <div className="brands__summary-item">
            <span className="brands__summary-value">₹2.8L + ₹10.2L</span>
            <span className="brands__summary-caption">Cash + High-Value In-Kind</span>
          </div>
          <div className="brands__summary-divider" aria-hidden="true" />
          <div className="brands__summary-item">
            <span className="brands__summary-value">30-Day Cycles</span>
            <span className="brands__summary-caption">Cold Outreach & Executive Pitches</span>
          </div>
        </div>
      </div>
    </section>
  )
}
