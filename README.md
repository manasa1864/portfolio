# Manasa Gopisetty — Classified Portfolio

A single-page Vite, React and TypeScript portfolio styled as a restrained declassified dossier. All editable portfolio copy lives in [`src/content.ts`](src/content.ts).

## Run and build

```bash
npm install
npm run dev
npm run build
```

Production output is written to `dist/`. The production base is `/portfolio/`. If the repository is renamed to `manasa1864.github.io`, change the production base in `vite.config.ts` to `/`.

## Deploy to GitHub Pages

1. Push the repository to GitHub as `portfolio`.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`.

`.github/workflows/deploy.yml` installs, builds, uploads `dist/` with `actions/upload-pages-artifact`, and deploys with `actions/deploy-pages`.

## Content and assets

- Edit text, links, projects, skills and achievements in `src/content.ts`.
- Add a portrait at `public/photo.webp` (4:5 crop). An accessible silhouette appears until it exists.
- Google Fonts use `display=swap` and include system fallbacks.

## Accessibility

The portfolio includes semantic landmarks, one H1, labelled fields, visible focus, 44px targets, reduced-motion support, a skip link, and keyboard-accessible controls. Open the dossier with Enter or Space. Navigate sections with J/K or arrow keys. Decorative redactions never obscure content.

## Usability Self-Audit

| Nielsen heuristic | Score | Verifiable evidence |
|---|---:|---|
| Visibility of system status | 5/5 | Opening state, scroll progress, active navigation, copied and form feedback. |
| Match with the real world | 5/5 | Paper/stamp metaphors pair every dossier label with plain English. |
| User control and freedom | 5/5 | Skip, reseal, back to top, Escape-to-close, and no autoplay audio. |
| Consistency and standards | 5/5 | Repeated cards/chips, standard navigation, links, and external-link marks. |
| Error prevention | 4/5 | Inline validation, disabled invalid submit, and unsent-message warning. |
| Recognition rather than recall | 5/5 | Sticky navigation repeats section names and section numbers. |
| Flexibility and efficiency | 5/5 | Skip link, anchors, keyboard shortcuts, copy email, resume shortcut. |
| Aesthetic and minimalist design | 5/5 | One parchment, restrained accent, two typefaces, limited ornament. |
| Error recovery | 4/5 | Plain field errors, portrait fallback, and custom 404. |
| Help and documentation | 5/5 | In-app “?” briefing and this setup/deployment guide. |

## Placeholders still to fill

1. `public/photo.webp` — Manasa’s portrait.
3. Maison live demo URL.
4. Secret Loyalties paper PDF URL.
5. ICR DPO Kaggle dataset URL.
6. Confirmed description and scope for INSURANCE.
7. LinkedIn details: About, Hash Engineering Fellowship, IET MPSTME, certifications, honors, and volunteering.
8. Optional public hackathons: AParT collusion, AWS Bharat Builds Delhi, and Nebius × NVIDIA routing.

## Final review

Test keyboard-only and screen-reader navigation, 200% zoom, reduced motion, and widths of 390, 768, 1024, and 1440px. Compress the final portrait to WebP, then run Lighthouse against the deployed URL.
