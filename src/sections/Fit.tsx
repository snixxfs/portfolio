import { fitSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Fit() {
  return (
    <section className="section" id="fit" aria-labelledby="fit-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={fitSection.kicker}
          heading={fitSection.heading}
          caption={fitSection.caption}
          id="fit-heading"
        />

        <div className="fit__pillars reveal">
          {fitSection.columns.map((column, colIdx) => (
            <div
              className={`fit__pillar fit__pillar--${column.accent} corner-brackets`}
              key={column.title}
              style={{ animationDelay: `${colIdx * 0.15}s` }}
            >
              <div className="fit__pillar-header">
                <span className="fit__pillar-tag">{column.tag}</span>
                <span className="fit__pillar-index">0{colIdx + 1}</span>
              </div>
              <h3 className="fit__pillar-title">{column.title}</h3>
              <ul className="fit__pillar-list">
                {column.items.map((item) => (
                  <li className="fit__pillar-item" key={item}>
                    <span className="fit__pillar-dot" aria-hidden="true" />
                    <span className="fit__pillar-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
