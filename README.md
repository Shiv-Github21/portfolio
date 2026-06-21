# Debapratim OS — A Desktop-Inspired Portfolio

A personal portfolio site styled like a macOS-style desktop: a menu bar, draggable
glass windows, a terminal that introduces me, an "Activity Monitor" that shows my
skills as live bars, and a dock to jump between sections.

**Live site:** _add your GitHub Pages URL here once deployed_
**Author:** Debapratim Mishra · [LinkedIn](https://www.linkedin.com/in/debapratim-mishra-9700a17b/) · [GitHub](https://github.com/debapratimmishra)

---

## Why this project

I'm a beginner in DevOps, and instead of just reading about CI/CD I wanted to
practice it on something real: this repository deploys itself. Every push to
`main` triggers a GitHub Actions workflow that builds and publishes the site to
GitHub Pages automatically — no manual upload step. That pipeline
(`.github/workflows/deploy.yml`) is the actual DevOps part of this project; the
desktop UI is just the front door.

## Tech stack

- **HTML / CSS / JavaScript** — no framework, no build step, so the whole
  pipeline stays easy to understand while learning.
- **GitHub Actions** — continuous deployment to GitHub Pages on every push.
- **Google Fonts** — JetBrains Mono (terminal/display) + Inter (body text).

## Project structure

```
.
├── index.html                  # page structure (windows, dock, menu bar)
├── css/style.css                # design tokens + all styling
├── js/script.js                 # CONFIG object + all interactivity
├── .github/workflows/deploy.yml # CI/CD: auto-deploy to GitHub Pages
├── LICENSE
└── README.md
```

## Customizing this for yourself

Almost everything you'd want to change lives in **one place**:
`js/script.js`, inside the `CONFIG` object at the top of the file.

```js
const CONFIG = {
  name: "Debapratim Mishra",
  role: "Aspiring DevOps Engineer",
  bio: "...",
  github: "https://github.com/debapratimmishra",
  linkedin: "https://www.linkedin.com/in/debapratim-mishra-9700a17b/",
  email: "your-email@example.com",
  resumeUrl: "#",
  skills: [ { name: "Docker", percent: 40 }, ... ],
  projects: [ { name: "project-one", desc: "...", tags: [...], url: "#" }, ... ],
};
```

Edit the values, save, and refresh — no other file needs to change for content
updates. Colors and fonts live in `css/style.css` under the `:root` block if you
want to restyle it.

## Running it locally

No build tools or dependencies are required. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve it locally (recommended, avoids some browser file-access quirks):
   ```bash
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```

## Deployment

This repo deploys itself via GitHub Actions — see the step-by-step setup guide
provided separately. In short: push to `main`, enable GitHub Pages with
"GitHub Actions" as the source (Settings → Pages), and the workflow handles
the rest.

## Roadmap / things I plan to add

- [ ] Replace placeholder projects with real ones
- [ ] Add a real resume PDF and link it
- [ ] Fill in honest skill percentages as I learn
- [ ] Add a custom domain (optional)
