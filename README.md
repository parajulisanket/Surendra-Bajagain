# Surendra Bajagain — Personal Website

Static, framework-free site (HTML + CSS + vanilla JS) with folder-based routing.

```
/
├── index.html            → /            Home
├── about/index.html      → /about/      Biography, quick facts, education, principles
├── career/index.html     → /career/     Experience timeline, expertise
├── media/index.html      → /media/      Gallery (lightbox), press coverage, press kit
├── contact/index.html    → /contact/    Contact details + validated form
├── 404.html
├── assets/
│   ├── css/style.css     All styles (design tokens at the top)
│   ├── js/main.js        Nav, scroll reveal, lightbox, copy-bio, form
│   └── img/              Optimised photos, favicon, social share image
├── robots.txt
└── sitemap.xml
```

## Run locally

Any static server works, e.g. VS Code Live Server, or:

```
npx serve .        # or: python3 -m http.server
```

Opening index.html directly from disk also works (main.js rewrites folder links to index.html under file://).

## Before launch — please confirm with the client

- Email: `hello@surendrabajagain.com` is a placeholder (footer, contact page, form `data-to`).
- Domain: `https://surendrabajagain.com` is used in canonical/OG tags, robots.txt and sitemap.xml.
- Dates: the Kathmandu Metropolitan City role and newsroom years have no confirmed start/end dates; labelled generically.
- Contact form opens the visitor's email app (mailto). To store submissions, point the form at Formspree / Netlify Forms / a PHP endpoint.
- Content was compiled from public news coverage because LinkedIn blocks automated access; cross-check against the LinkedIn profile.

## Photos

Two of the supplied desk photos show a legible whiteboard with phone numbers and case notes. They are not used; the blue-blazer desk shot is cropped so the board is out of frame (`at-work.jpg`).

## Design & cut-outs (redesign, Nov 2026)

- Dark editorial theme: black framed page, Archivo (wide, uppercase) headings, Poppins body, signature in Mrs Saint Delafield. Tokens at the top of `assets/css/style.css`.
- `*-cutout.webp` files are background-removed versions of the portraits (transparent WebP, made with macOS Vision foreground segmentation, edges softened 1px). Originals are kept for the gallery and press-kit downloads.
- `at-work.jpg` was not cut out: segmentation kept the chair and desk bowl, so it is used as a normal photo.
