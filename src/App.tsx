import { useEffect, useState } from "react"
import { content, type Project } from "./content"

const sections = ["profile", "missions", "skills", "intel", "contact"] as const

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 5h8v8M15 5 5 15" />
  </svg>
)

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      className="external"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow />
    </a>
  )
}

function Stamp({ small = false }: { small?: boolean }) {
  return (
    <span className={`stamp ${small ? "small" : ""}`} aria-hidden="true">
      <span className="stamp-ring">
        <b>CLASSIFIED</b>
        <i>★ · ★ · ★</i>
        <b>PUBLIC RELEASE</b>
      </span>
      <strong>TOP SECRET</strong>
    </span>
  )
}

function Landing({
  opening,
  open,
  skip,
}: {
  opening: boolean
  open: () => void
  skip: () => void
}) {
  return (
    <div className={`landing ${opening ? "opening" : ""}`}>
      <div className="grain" />
      <div className="letter">
        <div className="fold left" />
        <div className="fold center">
          <span className="file-no">PERSONNEL FILE · 001</span>
          <button
            className="stamp-button"
            onClick={open}
            aria-label="Open classified portfolio"
            title="Open file"
            disabled={opening}
          >
            <Stamp />
          </button>
          <p className="landing-caption">
            FILE: M. GOPISETTY | CLEARANCE: PUBLIC VIEWING
            <strong>
              {opening ? "Opening file…" : "Tap the stamp to open"}
            </strong>
          </p>
        </div>
        <div className="fold right" />
      </div>
      <button className="skip-button" onClick={skip}>
        Skip animation
      </button>
    </div>
  )
}

function SectionHeader({
  number,
  label,
  title,
  subtitle,
}: {
  number: string
  label: string
  title: string
  subtitle: string
}) {
  return (
    <div className="section-header">
      <span>{number}</span>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <i aria-hidden="true" />
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <div>
          <p className="card-index">MISSION // {project.id}</p>
          <h3>{project.name}</h3>
        </div>
        {project.featured && <span className="featured">Featured</span>}
        {project.status && <span className="dev-tag">{project.status}</span>}
      </div>
      <p className="project-summary">{project.summary}</p>
      <ul>
        {project.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <div className="chips">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="card-actions">
        {project.code && (
          <ExternalLink href={project.code}>View code</ExternalLink>
        )}
        {project.demo && (
          <ExternalLink href={project.demo}>Live demo</ExternalLink>
        )}
      </div>
    </article>
  )
}

function Photo() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="photo">
      <span className="paperclip" aria-hidden="true" />
      <div className="photo-image">
        {!failed ? (
          <img
            src={`${import.meta.env.BASE_URL}photo.jpeg`}
            alt="Portrait of Manasa Gopisetty"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="photo-placeholder"
            role="img"
            aria-label="Portrait placeholder for Manasa Gopisetty"
          >
            <i />
            <b />
            <small>PHOTO PENDING</small>
          </div>
        )}
      </div>
      <div className="photo-caption">
        <strong>Subject photo</strong>
        <span>CASE 001 · ID/MG-26</span>
      </div>
    </div>
  )
}

function Header({
  active,
  progress,
  reseal,
}: {
  active: string
  progress: number
  reseal: () => void
}) {
  const [menu, setMenu] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top">
          M.G. <span>// DOSSIER</span>
        </a>
        <button
          className="menu"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {menu ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <nav className={menu ? "open" : ""} aria-label="Primary navigation">
          {content.navigation.map((item) => (
            <a
              key={item.id}
              className={active === item.id ? "active" : ""}
              href={`#${item.id}`}
              onClick={() => setMenu(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={reseal}>
            Reseal file
          </button>
          <a
            className="button small-button"
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download
          >
            Resume
          </a>
        </div>
      </div>
      <div className="progress">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </header>
  )
}

function Portfolio({ reseal }: { reseal: () => void }) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState("profile")
  const [help, setHelp] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? Math.min((scrollY / max) * 100, 100) : 0)
      let current: string = sections[0]
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY + innerHeight * 0.35) current = id
      })
      setActive(current)
    }
    scroll()
    addEventListener("scroll", scroll, { passive: true })
    return () => removeEventListener("scroll", scroll)
  }, [])
  useEffect(() => {
    const keys = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName))
        return
      if (event.key === "Escape") setHelp(false)
      if (!["j", "k", "ArrowDown", "ArrowUp"].includes(event.key)) return
      const index = sections.indexOf(active as typeof sections[number])
      const next = Math.max(
        0,
        Math.min(
          sections.length - 1,
          index + (event.key === "j" || event.key === "ArrowDown" ? 1 : -1),
        ),
      )
      if (next !== index) {
        event.preventDefault()
        document
          .getElementById(sections[next])
          ?.scrollIntoView({ behavior: "smooth" })
      }
    }
    addEventListener("keydown", keys)
    return () => removeEventListener("keydown", keys)
  }, [active])
  const copy = async () => {
    await navigator.clipboard.writeText(content.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header active={active} progress={progress} reseal={reseal} />
      <button
        className="help-button"
        onClick={() => setHelp(true)}
        aria-label="How to read this file"
        title="How to read this file"
      >
        ?
      </button>
      {help && (
        <div className="dialog-backdrop" onMouseDown={() => setHelp(false)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="dialog-close"
              onClick={() => setHelp(false)}
              aria-label="Close help"
            >
              ×
            </button>
            <p className="eyebrow">Reader briefing</p>
            <h2 id="help-title">How to read this file</h2>
            <p>
              The dossier language is visual storytelling. Every code name
              includes a plain-English explanation, and nothing real is hidden.
            </p>
            <p>
              Use the sticky navigation, or press J/K and arrow keys to move
              between sections. “Reseal file” returns to the cover.
            </p>
          </div>
        </div>
      )}
      <main className="paper" id="main-content">
        <span className="holes" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">CASE FILE No. 001 · SUBJECT</p>
            <h1>
              Manasa
              <br />
              Gopisetty
            </h1>
            <p className="role">{content.profile.role}</p>
            <p className="summary">{content.profile.summary}</p>
            <div className="hero-actions">
              <a className="button" href="#missions">
                View missions
              </a>
              <a
                className="button outline"
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download
              >
                Download resume
              </a>
            </div>
            <div className="status">
              <i />
              {content.profile.status}
            </div>
          </div>
          <Photo />
          <div className="scroll-cue" aria-hidden="true">
            SCROLL TO DECLASSIFY <i />
          </div>
        </section>
        <div className="facts">
          {content.facts.map((fact, i) => (
            <article key={fact.label}>
              <span>0{i + 1}</span>
              <strong>{fact.value}</strong>
              <p>{fact.label}</p>
            </article>
          ))}
        </div>
        <section id="profile" className="content-section">
          <SectionHeader
            number="01"
            label="Subject profile"
            title="Profile"
            subtitle="Background, focus areas and current objective"
          />
          <div className="profile-grid">
            <div className="lead">
              <p>{content.profile.longSummary}</p>
            </div>
            <dl>
              {content.profileDetails.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section id="missions" className="content-section">
          <SectionHeader
            number="02"
            label="Mission briefings"
            title="Selected projects"
            subtitle="AI research and software built to solve real problems"
          />
          <div className="projects">
            {content.projects.map((project) => (
              <ProjectCard project={project} key={project.name} />
            ))}
          </div>
          <div className="field-ops">
            <p className="eyebrow">Field operations · Hackathons</p>
            {content.operations.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </section>
        <section id="skills" className="content-section">
          <SectionHeader
            number="03"
            label="Skills inventory"
            title="Technical toolkit"
            subtitle="Languages, frameworks and methods used in the field"
          />
          <div className="skills">
            {Object.entries(content.skills).map(([group, items]) => (
              <div key={group}>
                <h3>{group}</h3>
                <div className="chips large">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="intel" className="content-section">
          <SectionHeader
            number="04"
            label="Intel reports"
            title="Research & achievements"
            subtitle="Evidence gathered through research, building and collaboration"
          />
          <div className="intel-layout">
            <div className="timeline">
              {content.achievements.map((item, i) => (
                <article key={item.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{item.meta}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.links && (
                      <div>
                        {item.links.map((link) => (
                          <ExternalLink href={link.url} key={link.label}>
                            {link.label}
                          </ExternalLink>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <aside className="education">
              <p className="eyebrow">Training record</p>
              <h3>Education</h3>
              {content.education.map((item) => (
                <article key={item.degree}>
                  <span>{item.years}</span>
                  <strong>{item.degree}</strong>
                  <p>{item.school}</p>
                </article>
              ))}
              <Stamp small />
            </aside>
          </div>
        </section>
        <section id="contact" className="content-section">
          <SectionHeader
            number="05"
            label="Establish contact"
            title="Start a conversation"
            subtitle="Research, engineering and collaboration enquiries are welcome"
          />
          <div className="contact-layout">
            <div className="contact-card">
              <p className="eyebrow">Secure channels · Public</p>
              <h3>Let’s build something useful.</h3>
              <p>
                I’m open to AI research, software engineering and thoughtful
                open-source collaborations.
              </p>
              <div className="contact-links">
                <div>
                  <span>Email</span>
                  <a href={`mailto:${content.contact.email}`}>
                    {content.contact.email}
                  </a>
                  <button onClick={copy}>
                    {copied ? "Copied!" : "Copy email"}
                  </button>
                </div>
                <div>
                  <span>GitHub</span>
                  <ExternalLink href={content.contact.github}>
                    @manasa1864
                  </ExternalLink>
                </div>
                <div>
                  <span>LinkedIn</span>
                  <ExternalLink href={content.contact.linkedin}>
                    Manasa Gopisetty
                  </ExternalLink>
                </div>
              </div>
            </div>
            <aside className="open-to">
              <p className="eyebrow">Open to</p>
              <h3>Where I can help</h3>
              <ul>
                {content.contact.openTo.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
              <div className="open-to-footer">
                <div>
                  <span>Based in</span>
                  <strong>{content.profileDetails[2].value}</strong>
                </div>
                <a
                  className="button outline"
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download
                >
                  Download resume
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <footer>
        <p>
          END OF FILE · Fictional styling for a real portfolio · © 2026 Manasa
          Gopisetty
        </p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default function App() {
  const [opened, setOpened] = useState(
    () => sessionStorage.getItem("dossier-opened") === "true",
  )
  const [opening, setOpening] = useState(false)
  const open = (skip = false) => {
    if (opening) return
    setOpening(true)
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    setTimeout(
      () => {
        setOpened(true)
        setOpening(false)
        sessionStorage.setItem("dossier-opened", "true")
        scrollTo(0, 0)
      },
      skip ? 0 : reduced ? 300 : 1800,
    )
  }
  const reseal = () => {
    sessionStorage.removeItem("dossier-opened")
    scrollTo(0, 0)
    setOpened(false)
  }
  useEffect(() => {
    document.body.classList.toggle("locked", !opened)
    return () => document.body.classList.remove("locked")
  }, [opened])
  return opened ? (
    <Portfolio reseal={reseal} />
  ) : (
    <Landing opening={opening} open={() => open()} skip={() => open(true)} />
  )
}
