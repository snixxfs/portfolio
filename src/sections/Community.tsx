import { communitySection } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

interface CommunityProps {
  reduced?: boolean
}

export function Community({ reduced: _reduced = false }: CommunityProps) {
  return (
    <section className="section community-section" id="community" aria-labelledby="community-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={communitySection.kicker}
          heading={communitySection.heading}
          caption={communitySection.caption}
          id="community-heading"
        />

        {/* Telegram Community Context Telemetry Bar */}
        <div className="community__telemetry reveal" aria-label="Community statistics">
          <div className="community__telemetry-item">
            <span className="community__telemetry-dot" aria-hidden="true" />
            <span className="community__telemetry-label">ECOSYSTEM // 10,000+ READERS</span>
          </div>
          <div className="community__telemetry-sep" aria-hidden="true">/</div>
          <div className="community__telemetry-item">
            <svg className="community__telemetry-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            <span className="community__telemetry-label">TELEGRAM BROADCAST CHANNEL</span>
          </div>
          <div className="community__telemetry-sep" aria-hidden="true">/</div>
          <div className="community__telemetry-item community__telemetry-item--highlight">
            <span className="community__telemetry-label">UNFILTERED PERSPECTIVE · FINANCIAL IQ · ACTION</span>
          </div>
        </div>

        {/* Main Testimonial Editorial Grid (11-12 Cards) */}
        <div className="community__grid" role="list">
          {communitySection.testimonials.map((item) => (
            <article
              key={item.id}
              className={`community-card reveal ${item.featured ? 'community-card--featured' : ''}`}
              role="listitem"
              tabIndex={0}
              aria-label={`Testimonial from ${item.author}`}
            >
              {/* Card Meta Header */}
              <div className="community-card__header">
                <div className="community-card__index-tag">
                  <span className="community-card__index-num">#{item.number}</span>
                  <span className="community-card__tag">{item.tag}</span>
                </div>
                <time className="community-card__date">{item.date}</time>
              </div>

              {/* Quotation Body */}
              <div className="community-card__body">
                <span className="community-card__quote-mark" aria-hidden="true">“</span>
                <blockquote className="community-card__quote">
                  <p>{item.quote}</p>
                </blockquote>
              </div>

              {/* Author & Verification Footer */}
              <div className="community-card__footer">
                <div className="community-card__avatar" aria-hidden="true">
                  <span>{item.initials}</span>
                </div>
                <div className="community-card__author-info">
                  <span className="community-card__author-name">{item.author}</span>
                  <div className="community-card__verification">
                    <svg className="community-card__badge-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0c-.4 0-.8.2-1.1.5L5.7 1.7 4 1.4c-.4-.1-.9.1-1.2.4-.3.3-.4.8-.4 1.2l.3 1.7-1.2 1.2c-.3.3-.5.7-.5 1.1s.2.8.5 1.1l1.2 1.2-.3 1.7c0 .4.1.9.4 1.2.3.3.8.4 1.2.4l1.7-.3 1.2 1.2c.3.3.7.5 1.1.5s.8-.2 1.1-.5l1.2-1.2 1.7.3c.4 0 .9-.1 1.2-.4.3-.3.4-.8.4-1.2l-.3-1.7 1.2-1.2c.3-.3.5-.7.5-1.1s-.2-.8-.5-1.1l-1.2-1.2.3-1.7c0-.4-.1-.9-.4-1.2-.3-.3-.8-.4-1.2-.4l-1.7.3-1.2-1.2c-.3-.3-.7-.5-1.1-.5zm3.2 5.3l-4 4c-.2.2-.4.3-.7.3s-.5-.1-.7-.3l-1.5-1.5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l.8.8 3.3-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4z" />
                    </svg>
                    <span className="community-card__badge-text">Channel Reader</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Short Testimonial Strip Header */}
        <div className="community-strip__banner reveal">
          <div className="community-strip__badge">
            <span className="community-strip__badge-dot" aria-hidden="true" />
            <span>COMMUNITY PULSE // DIRECT DISPATCHES</span>
          </div>
          <span className="community-strip__hint" aria-hidden="true">Swipe or scroll to inspect</span>
        </div>

        {/* Short Testimonial Horizontal Strip / Carousel (3 quotes) */}
        <div className="community-strip reveal" role="region" aria-label="Short community quotes">
          <div className="community-strip__track" tabIndex={0}>
            {communitySection.shortStrip.map((short) => (
              <div className="community-strip__card" key={short.id} role="article">
                <div className="community-strip__card-avatar" aria-hidden="true">
                  <span>{short.initials}</span>
                </div>
                <div className="community-strip__card-content">
                  <p className="community-strip__card-quote">“{short.quote}”</p>
                  <div className="community-strip__card-meta">
                    <span className="community-strip__card-author">{short.author}</span>
                    <span className="community-strip__card-sep" aria-hidden="true">·</span>
                    <time className="community-strip__card-date">{short.date}</time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
