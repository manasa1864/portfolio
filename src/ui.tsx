import { useEffect, useState } from "react"

export const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 5h8v8M15 5 5 15" />
  </svg>
)

export function ExternalLink({
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

const PREFIX = "#/project/"

export const projectHref = (slug: string) => `${PREFIX}${slug}`

const readSlug = () =>
  window.location.hash.startsWith(PREFIX)
    ? decodeURIComponent(window.location.hash.slice(PREFIX.length))
    : null

/** Returns the slug when the URL hash is #/project/<slug>, otherwise null. */
export function useProjectRoute() {
  const [slug, setSlug] = useState(readSlug)
  useEffect(() => {
    const onChange = () => setSlug(readSlug())
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return slug
}
