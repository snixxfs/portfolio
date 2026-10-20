import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsSection, type Project, type ProjectCategory } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

interface ProjectsProps {
  reduced: boolean
}

type FilterKey = ProjectCategory

function matches(project: Project, filter: FilterKey): boolean {
  if (filter === 'all') return true
  return project.categories.includes(filter)
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const render = () => {
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
      card.style.transform = `perspective(1000px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg) translateY(${targetX === 0 && targetY === 0 ? 0 : -5}px)`
      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      targetX = (0.5 - y) * 8
      targetY = (x - 0.5) * 10
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      kick()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      kick()
    }

    card.addEventListener('pointermove', onMove, { passive: true })
    card.addEventListener('pointerleave', onLeave)

    return () => {
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
      card.style.transform = ''
    }
  }, [])

  const toneClass =
    project.badge?.tone === 'gold'
      ? ' project-card__badge--gold'
      : project.badge?.tone === 'cyan'
        ? ' project-card__badge--cyan'
        : project.badge?.tone === 'emerald'
          ? ' project-card__badge--emerald'
          : ''

  return (
    <article
      className={`project-card corner-brackets${project.featured ? ' project-card--featured' : ''}`}
      ref={cardRef}
      data-cursor="view"
    >
      <div className="project-card__header">
        <span className="project-card__index">
          0{index + 1} // SYS-ARCH
        </span>
        {project.badge ? (
          <span className={`project-card__badge${toneClass}`}>{project.badge.text}</span>
        ) : null}
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__headline">{project.headline}</p>

      {project.metrics && project.metrics.length > 0 ? (
        <div className="project-card__metrics">
          {project.metrics.map((metric) => (
            <div className="project-card__metric" key={metric.label}>
              <span className="project-card__metric-val">{metric.value}</span>
              <span className="project-card__metric-lbl">{metric.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="project-card__details">
        <div className="project-card__detail-row">
          <span className="project-card__detail-tag">PROBLEM:</span>
          <span className="project-card__detail-text">{project.problem}</span>
        </div>
        <div className="project-card__detail-row">
          <span className="project-card__detail-tag">SOLUTION:</span>
          <span className="project-card__detail-text">{project.solution}</span>
        </div>
        <div className="project-card__detail-row">
          <span className="project-card__detail-tag">IMPACT:</span>
          <span className="project-card__detail-text">{project.impact}</span>
        </div>
      </div>

      <div className="project-card__footer">
        <div className="project-card__tags">
          {project.stack.map((tag) => (
            <span className="project-card__tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            data-cursor="open"
          >
            <span>Live System</span>
            <span className="project-card__link-arrow">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}

export function Projects({ reduced }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([])

  const visible = useMemo(
    () => projectsSection.projects.filter((project) => matches(project, filter)),
    [filter],
  )

  const counts = useMemo(() => {
    const map = new Map<FilterKey, number>()
    for (const option of projectsSection.filters) {
      map.set(
        option.key,
        projectsSection.projects.filter((project) => matches(project, option.key)).length,
      )
    }
    return map
  }, [])

  useEffect(() => {
    if (reduced || !gridRef.current) return
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.project-card'))
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      },
    )
  }, [filter, reduced])

  const onFilterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = projectsSection.filters.length
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % total
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + total) % total
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = total - 1
    else return

    event.preventDefault()
    const target = projectsSection.filters[next]
    if (target) {
      setFilter(target.key)
      filterRefs.current[next]?.focus()
    }
  }

  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={projectsSection.kicker}
          heading={projectsSection.heading}
          caption={projectsSection.caption}
          id="work-heading"
        />

        {/* Filter Navigation */}
        <div className="projects__filter-bar reveal" role="tablist" aria-label="Project categories">
          {projectsSection.filters.map((opt, index) => {
            const isSelected = filter === opt.key
            return (
              <button
                key={opt.key}
                ref={(node) => {
                  filterRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`filter-${opt.key}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`projects__filter-btn${isSelected ? ' projects__filter-btn--active' : ''}`}
                onClick={() => setFilter(opt.key)}
                onKeyDown={(event) => onFilterKeyDown(event, index)}
              >
                <span>{opt.label}</span>
                <span className="projects__filter-count">{counts.get(opt.key) ?? 0}</span>
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid" ref={gridRef}>
          {visible.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
