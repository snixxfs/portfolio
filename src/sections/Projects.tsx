import { useMemo, useState } from 'react'
import { projectsSection, type Project, type ProjectCategory } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

interface ProjectsProps {
  reduced: boolean
}

type FilterKey = ProjectCategory

function matches(project: Project, filter: FilterKey): boolean {
  if (filter === 'all') return true
  return project.categories.includes(filter)
}

export function Projects({ reduced: _reduced }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  // By default, open the first featured project
  const [expandedId, setExpandedId] = useState<string>(projectsSection.projects[0]?.id ?? '')

  const visible = useMemo<Project[]>(
    () => (projectsSection.projects as Project[]).filter((project) => matches(project, filter)),
    [filter],
  )

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id))
  }

  return (
    <section className="section projects-section" id="work" aria-labelledby="work-heading">
      <div className="section__inner">
        <SectionHeading
          kicker={projectsSection.kicker}
          heading={projectsSection.heading}
          caption={projectsSection.caption}
          id="work-heading"
        />

        {/* Minimalist Filter Bar */}
        <div className="proj-filter-bar reveal" role="tablist" aria-label="Project domains">
          {projectsSection.filters.map((opt) => {
            const isSelected = filter === opt.key
            const count = projectsSection.projects.filter((p) => matches(p, opt.key)).length
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                id={`filter-${opt.key}`}
                aria-selected={isSelected}
                className={`proj-filter-btn ${isSelected ? 'proj-filter-btn--active' : ''}`}
                onClick={() => setFilter(opt.key)}
              >
                <span>{opt.label}</span>
                <span className="proj-filter-count">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Full-Width Studio Project Index — Zero Box Aesthetic */}
        <div className="proj-index" role="list">
          {visible.map((project, index) => {
            const isExpanded = expandedId === project.id
            const displayIndex = String(index + 1).padStart(2, '0')

            return (
              <div
                key={project.id}
                role="listitem"
                className={`proj-row ${isExpanded ? 'proj-row--expanded' : ''}`}
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  className="proj-row__header"
                  onClick={() => toggleExpand(project.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`proj-drawer-${project.id}`}
                >
                  <div className="proj-row__index-col">
                    <span className="proj-row__index">{displayIndex}</span>
                  </div>

                  <div className="proj-row__title-col">
                    <h3 className="proj-row__title">{project.title}</h3>
                    <p className="proj-row__tagline">{project.headline}</p>
                  </div>

                  <div className="proj-row__category-col">
                    <span className="proj-row__category">
                      {project.categories.join(' · ').toUpperCase()}
                    </span>
                  </div>

                  <div className="proj-row__action-col">
                    <span className="proj-row__toggle-icon" aria-hidden="true">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {/* Inline Architectural Drawer */}
                {isExpanded && (
                  <div
                    className="proj-drawer"
                    id={`proj-drawer-${project.id}`}
                    role="region"
                    aria-labelledby={`proj-${project.id}`}
                  >
                    <div className="proj-drawer__grid">
                      {/* Column 1: Core Problem */}
                      <div className="proj-drawer__col">
                        <span className="proj-drawer__col-label">01 // CORE PROBLEM</span>
                        <p className="proj-drawer__text">{project.problem}</p>
                      </div>

                      {/* Column 2: System Architecture */}
                      <div className="proj-drawer__col">
                        <span className="proj-drawer__col-label">02 // ARCHITECTURE & ENGINEERING</span>
                        <p className="proj-drawer__text">{project.solution}</p>
                      </div>

                      {/* Column 3: Verified Impact & Sizing */}
                      <div className="proj-drawer__col">
                        <span className="proj-drawer__col-label">03 // VERIFIED IMPACT</span>
                        <div className="proj-drawer__impact-badge">
                          <span className="proj-drawer__impact-dot" />
                          <span>{project.impact}</span>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="proj-drawer__stack">
                          {project.stack.map((item) => (
                            <span key={item} className="proj-drawer__stack-tag">
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Action Channels */}
                        <div className="proj-drawer__links">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proj-drawer__link-btn"
                            >
                              <span>SOURCE [GITHUB]</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proj-drawer__link-btn proj-drawer__link-btn--primary"
                            >
                              <span>VIEW LIVE</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
