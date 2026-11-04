import { fitSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Fit() {
  return (
    <section className="section fit-section" id="fit" aria-labelledby="fit-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={fitSection.kicker}
          heading={fitSection.heading}
          caption={fitSection.caption}
          id="fit-heading"
        />

        {/* Architectural 3-Column Editorial Split (No Boxed Cards) */}
        <div className="fit-columns reveal">
          {fitSection.columns.map((column, colIdx) => (
            <div
              className={`fit-col fit-col--${column.accent}`}
              key={column.title}
            >
              <div className="fit-col__header">
                <span className="fit-col__index">0{colIdx + 1} // DISCIPLINE</span>
                <span className="fit-col__tag">{column.tag}</span>
              </div>
              <h3 className="fit-col__title">{column.title}</h3>
              <ul className="fit-col__list">
                {column.items.map((item) => (
                  <li className="fit-col__item" key={item}>
                    <span className="fit-col__dash" aria-hidden="true">—</span>
                    <span className="fit-col__text">{item}</span>
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
