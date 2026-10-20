import { stackSection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={stackSection.kicker}
          heading={stackSection.heading}
          caption={stackSection.caption}
          id="stack-heading"
        />

        {/* Skill Clusters Grid */}
        <div className="stack__grid reveal">
          {stackSection.groups.map((group, index) => (
            <div
              className={`stack-cluster corner-brackets stack-cluster--${group.accent}`}
              key={group.category}
            >
              <div className="stack-cluster__header">
                <span className="stack-cluster__index">0{index + 1} // DOMAIN</span>
                <h3 className="stack-cluster__title">{group.category}</h3>
              </div>
              <div className="stack-cluster__pills">
                {group.skills.map((skill) => (
                  <span className="stack-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Verified Credentials / Certifications Row */}
        <div className="stack__certs-wrap reveal">
          <div className="stack__certs-heading">
            <span className="stack__certs-tag">VERIFIED CREDENTIALS & SPRINT PROGRAMS</span>
          </div>
          <div className="stack__certs-grid">
            {stackSection.certifications.map((cert) => (
              <div className="cert-card corner-brackets" key={cert.name}>
                <span className="cert-card__icon" aria-hidden="true">
                  {cert.icon}
                </span>
                <div className="cert-card__body">
                  <h4 className="cert-card__name">{cert.name}</h4>
                  <span className="cert-card__issuer">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
