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

export function Projects({ reduced }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [activeId, setActiveId] = useState<string>(projectsSection.projects[0]?.id ?? '')
  const [activeTab, setActiveTab] = useState<'architecture' | 'problem' | 'impact'>('architecture')

  const stageRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([])

  const visible = useMemo(
    () => projectsSection.projects.filter((project) => matches(project, filter)),
    [filter],
  )

  // Ensure activeId is always valid within visible projects
  const activeProject = useMemo(() => {
    return visible.find((p) => p.id === activeId) ?? visible[0] ?? projectsSection.projects[0]
  }, [visible, activeId])

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

  // Animate stage when active project switches
  useEffect(() => {
    if (reduced || !stageRef.current) return
    gsap.fromTo(
      stageRef.current,
      { opacity: 0.6, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
    )
  }, [activeProject.id, reduced])

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

        {/* PANORAMIC SHOWCASE STAGE */}
        <div className="projects__stage corner-brackets reveal" ref={stageRef}>
          <div className="projects__stage-top">
            <div className="projects__stage-identity">
              <span className="projects__stage-tag">SYSTEM BLUEPRINT // 0{projectsSection.projects.indexOf(activeProject) + 1}</span>
              {activeProject.badge ? (
                <span className="projects__stage-badge">{activeProject.badge.text}</span>
              ) : null}
            </div>
            {activeProject.liveUrl ? (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="projects__stage-live-btn"
                data-cursor="open"
              >
                <span>LIVE SYSTEM</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>

          <h3 className="projects__stage-title">{activeProject.title}</h3>
          <p className="projects__stage-headline">{activeProject.headline}</p>

          {/* Metrics Bar */}
          {activeProject.metrics && activeProject.metrics.length > 0 ? (
            <div className="projects__stage-metrics">
              {activeProject.metrics.map((m) => (
                <div className="projects__stage-metric" key={m.label}>
                  <span className="projects__stage-metric-val">{m.value}</span>
                  <span className="projects__stage-metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Interactive Inspection Tabs */}
          <div className="projects__stage-nav">
            <button
              type="button"
              className={`projects__stage-tab${activeTab === 'architecture' ? ' projects__stage-tab--active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              SOLUTION & ARCHITECTURE
            </button>
            <button
              type="button"
              className={`projects__stage-tab${activeTab === 'problem' ? ' projects__stage-tab--active' : ''}`}
              onClick={() => setActiveTab('problem')}
            >
              CORE PROBLEM
            </button>
            <button
              type="button"
              className={`projects__stage-tab${activeTab === 'impact' ? ' projects__stage-tab--active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              VERIFIED IMPACT
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="projects__stage-content">
            {activeTab === 'architecture' ? (
              <p className="projects__stage-desc">{activeProject.solution}</p>
            ) : activeTab === 'problem' ? (
              <p className="projects__stage-desc">{activeProject.problem}</p>
            ) : (
              <p className="projects__stage-desc">{activeProject.impact}</p>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="projects__stage-footer">
            <span className="projects__stage-stack-label">ENGINEERING STACK:</span>
            <div className="projects__stage-tags">
              {activeProject.stack.map((tag) => (
                <span className="projects__stage-tag-pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* HORIZONTAL SELECTOR STRIP */}
        <div className="projects__strip-header">
          <span>SELECT SYSTEM TO INSPECT ({visible.length} BUILDS):</span>
        </div>
        <div className="projects__strip" ref={stripRef} role="tablist" aria-label="Build catalog">
          {visible.map((proj, idx) => {
            const isCurrent = proj.id === activeProject.id
            return (
              <button
                key={proj.id}
                type="button"
                className={`projects__strip-card corner-brackets${isCurrent ? ' projects__strip-card--active' : ''}`}
                onClick={() => setActiveId(proj.id)}
                aria-selected={isCurrent}
              >
                <div className="projects__strip-top">
                  <span className="projects__strip-num">0{idx + 1}</span>
                  {proj.badge ? (
                    <span className="projects__strip-badge">{proj.badge.text}</span>
                  ) : null}
                </div>
                <h4 className="projects__strip-title">{proj.title}</h4>
                <div className="projects__strip-tags">
                  {proj.stack.slice(0, 3).map((st) => (
                    <span key={st}>{st}</span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
