import { profile } from '../data/content'
import { scrollToId } from '../utils/scroll'

interface FooterProps {
  reduced: boolean
}

export function Footer({ reduced }: FooterProps) {
  return (
    <footer className="footer" id="colophon">
      <div className="footer__inner">
        <div className="footer__top-row">
          <div className="footer__identity">
            <h3 className="footer__name">{profile.name}</h3>
            <p className="footer__sub">
              Computer Science & Engineering (AI/ML) · RV University, Bengaluru
            </p>
          </div>

          <div className="footer__channels">
            <span className="footer__col-heading">DIRECT CHANNELS</span>
            <a href={`mailto:${profile.email}`} className="footer__link" data-cursor="email">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="footer__link" data-cursor="copy">
              {profile.phone}
            </a>
            <div className="footer__socials">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-pill"
                  data-cursor="open"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom-row">
          <p className="footer__meta">
            © 2026 Ayush S Kulkarni · Production Vite + React 19 + TypeScript on Vercel
          </p>
          <a
            className="footer__top"
            href="#hero"
            onClick={(event) => {
              event.preventDefault()
              scrollToId('hero', reduced)
            }}
            data-cursor="view"
          >
            RETURN TO TOP <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
