import { useEffect, useRef } from 'react'
import { contactSection, profile } from '../data/content'
import { attachMagnetic } from '../effects/Magnetic'
import { copyText } from '../utils/storage'

interface ContactProps {
  reduced: boolean
  notify: (message: string, actionLabel?: string, onAction?: () => void) => void
}

export function Contact({ reduced, notify }: ContactProps) {
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const row = actionsRef.current
    if (!row) return
    const cleanups = Array.from(row.querySelectorAll<HTMLElement>('.btn')).map((element) =>
      attachMagnetic(element, { strength: 0.18, max: 7 }),
    )
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [reduced])

  const copyEmail = async () => {
    const ok = await copyText(profile.email)
    notify(ok ? `Copied ${profile.email}` : `Could not copy. Write to ${profile.email}.`)
  }

  const copyPhone = async () => {
    const ok = await copyText(profile.phone)
    notify(ok ? `Copied ${profile.phone}` : `Call ${profile.phone}.`)
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="section__inner">
        <p className="kicker glowable">{contactSection.kicker}</p>

        <div className="contact__layout reveal">
          <div className="contact__main">
            <h2 className="contact__heading" id="contact-heading">
              <span className="contact__title-line">Let’s Build Something</span>
              <span className="contact__title-line contact__title-line--accent">Formidable.</span>
            </h2>
            <p className="contact__caption">{contactSection.caption}</p>

            <div className="contact__actions" ref={actionsRef}>
              <a className="btn btn--fill" href={`mailto:${profile.email}`} data-cursor="email">
                <span className="magnetic-inner">Email Directly</span>
              </a>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => void copyEmail()}
                data-cursor="copy"
              >
                <span className="magnetic-inner">Copy Email</span>
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => void copyPhone()}
                data-cursor="copy"
              >
                <span className="magnetic-inner">Copy Phone</span>
              </button>
            </div>
          </div>

          <div className="contact__channels">
            <div className="contact__channel-header">
              <span className="contact__channel-status-dot" aria-hidden="true" />
              <span>DIRECT CHANNELS // BENGALURU, IN</span>
            </div>

            <div className="contact__channel-list">
              {contactSection.channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-channel-card corner-brackets"
                  data-cursor="open"
                >
                  <div className="contact-channel-card__info">
                    <span className="contact-channel-card__label">{ch.label}</span>
                    <span className="contact-channel-card__val">{ch.value}</span>
                  </div>
                  <span className="contact-channel-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
