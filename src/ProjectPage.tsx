import { useEffect } from "react"
import { content } from "./content"
import { ExternalLink, projectHref } from "./ui"

export default function ProjectPage({ slug }: { slug: string }) {
  const projects = content.projects
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useEffect(() => {
    window.scrollTo(0, 0)
    const previous = document.title
    document.title = project
      ? `${project.name} | Manasa Gopisetty`
      : "Project not found | Manasa Gopisetty"
    return () => {
      document.title = previous
    }
  }, [slug, project])

  if (!project) {
    return (
      <div className="portfolio">
        <main className="paper project-page" id="main-content">
          <section className="project-hero">
            <p className="eyebrow">ERROR // 404</p>
            <h1>File not found</h1>
            <p className="summary">That mission is not in the dossier.</p>
            <a className="button" href="#missions">
              Back to missions
            </a>
          </section>
        </main>
      </div>
    )
  }

  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="portfolio">
      <header className="site-header">
        <div className="header-inner project-header">
          <a className="wordmark" href="#top">
            M.G. <span>// DOSSIER</span>
          </a>
          <a className="back-link" href="#missions">
            ← All missions
          </a>
          <div className="header-actions">
            <a
              className="button small-button"
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download
            >
              Resume
            </a>
          </div>
        </div>
      </header>
      <main className="paper project-page" id="main-content">
        <section className="project-hero">
          <p className="eyebrow">
            MISSION // {project.id}
            {"event" in project && project.event ? ` · ${project.event}` : ""}
          </p>
          <h1>{project.name}</h1>
          <p className="role">{project.summary}</p>
          <div className="project-tags">
            {project.featured && <span className="featured">Featured</span>}
            {"status" in project && project.status && (
              <span className="dev-tag">{project.status}</span>
            )}
            {"role" in project && project.role && (
              <span className="role-tag">My role: {project.role}</span>
            )}
          </div>
          <div className="hero-actions">
            {project.code && (
              <a
                className="button"
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                View code
              </a>
            )}
            {"demo" in project && project.demo && (
              <a
                className="button outline"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
              </a>
            )}
          </div>
        </section>

        {"results" in project && project.results && (
          <div
            className="results"
            style={{ gridTemplateColumns: `repeat(${Math.min(project.results.length, 4)}, 1fr)` }}
          >
            {project.results.map((m) => (
              <article key={m.label}>
                <strong>{m.value}</strong>
                <p>{m.label}</p>
              </article>
            ))}
          </div>
        )}

        <section className="project-section">
          <p className="eyebrow">Briefing</p>
          <h2>What it is</h2>
          {project.overview.map((paragraph) => (
            <p className="project-lead" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {"quote" in project && project.quote && (
            <blockquote className="project-quote">
              <p>“{project.quote.text}”</p>
              <cite>{project.quote.by}</cite>
            </blockquote>
          )}
        </section>

        <section className="project-section">
          <p className="eyebrow">Key details</p>
          <h2>What makes it work</h2>
          <div className="highlights">
            {project.highlights.map((item, i) => (
              <article key={item.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {"flow" in project && project.flow && (
          <section className="project-section">
            <p className="eyebrow">Procedure</p>
            <h2>How it works</h2>
            <ol className="flow">
              {project.flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {"sections" in project &&
          project.sections?.map((section) => (
            <section className="project-section" key={section.title}>
              <p className="eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <ul className="notes detail-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

        <section className="project-section">
          <p className="eyebrow">Equipment</p>
          <h2>Stack &amp; methods</h2>
          <div className="chips large">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        {"notes" in project && project.notes && (
          <section className="project-section">
            <p className="eyebrow">Field notes</p>
            <h2>Good to know</h2>
            <ul className="notes">
              {project.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {"documents" in project && project.documents && (
          <section className="project-section">
            <p className="eyebrow">Documents</p>
            <h2>Certificates &amp; letters</h2>
            <ul className="documents">
              {project.documents.map((doc) => (
                <li key={doc.url}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <span>PDF</span>
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {"links" in project && project.links && (
          <section className="project-section">
            <p className="eyebrow">Evidence</p>
            <h2>Links</h2>
            <div className="project-links">
              {project.links.map((link) => (
                <ExternalLink href={link.url} key={link.url}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </section>
        )}

        <nav className="project-nav" aria-label="Other missions">
          <a href={projectHref(prev.slug)}>
            <span>← Previous</span>
            <strong>{prev.name}</strong>
          </a>
          <a href="#missions" className="all">
            All missions
          </a>
          <a href={projectHref(next.slug)}>
            <span>Next →</span>
            <strong>{next.name}</strong>
          </a>
        </nav>
      </main>
      <footer>
        <p>END OF FILE · © 2026 Manasa Gopisetty</p>
        <a href="#missions">Back to missions ↑</a>
      </footer>
    </div>
  )
}
