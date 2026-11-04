import { stackSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Stack() {
  return (
    <section className="section stack-section" id="stack" aria-labelledby="stack-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={stackSection.kicker}
          heading={stackSection.heading}
          caption={stackSection.caption}
          id="stack-heading"
        />

        {/* Architectural Blueprint Specification (No Boxed Cards) */}
        <div className="stack-blueprint reveal">
          {stackSection.groups.map((group, index) => (
            <div
              className={`stack-spec-row stack-spec-row--${group.accent}`}
              key={group.category}
            >
              <div className="stack-spec-row__domain">
                <span className="stack-spec-row__index">0{index + 1}</span>
                <h3 className="stack-spec-row__title">{group.category}</h3>
              </div>

              <div className="stack-spec-row__skills">
                {group.skills.map((skill) => (
                  <span className="stack-spec-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Verified Credentials Stream */}
        <div className="stack-creds-strip reveal">
          <div className="stack-creds-strip__header">
            <span className="stack-creds-strip__tag">VERIFIED CREDENTIALS & SPRINT PROGRAMS</span>
          </div>
          <div className="stack-creds-strip__items">
            {stackSection.certifications.map((cert) => (
              <div className="cred-item" key={cert.name}>
                <span className="cred-item__icon" aria-hidden="true">
                  {cert.icon}
                </span>
                <div className="cred-item__info">
                  <h4 className="cred-item__name">{cert.name}</h4>
                  <span className="cred-item__issuer">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
