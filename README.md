# Ubuntu Simulation

Yes, it's exactly what it sounds like—an interactive Ubuntu desktop in your browser. No, you can't actually do your work in it (yet). But you *can* pretend you're doing very technical things while block-style Minecraft aesthetics distract everyone around you.

## Features That Probably Matter

- **Fully interactive desktop simulation** — drag windows, open apps, run actual terminal commands
- **Minecraft x Ubuntu fever dream** — because why pick one when you can have both?
- **Working terminal** — supports `cd`, `ls`, `pwd`, `mkdir`, `clear`, and some custom commands
- **Real applications** — Firefox (resume), VS Code (GitHub viewer), Spotify, Settings, Calculator
- **Contact form** — spam me if you want

## How to Run

```bash
# Get it
git clone https://github.com/gorghs/ubuntu-simulation.git
cd ubuntu-simulation

# Install deps
npm install

# Dev mode (watch & reload)
npm run dev

# Production build
npm run build
npm start

# Export static (for GitHub Pages, etc.)
npm run export
```

Open [http://localhost:3000](http://localhost:3000) and enjoy your new desktop.

## Theme Options

Everything is configurable if you squint at the right files:

- **Background images** — swap these in `components/util components/background-image.js`
- **Colors/styling** — Tailwind CSS in `styles/` and component files
- **Apps** — add/remove from `apps.config.js`
- **Terminal commands** — edit `components/apps/terminal.js`

## What You Actually Get

- Next.js + React
- Tailwind CSS for styling
- React-Draggable for window chaos
- FormSubmit.co for contact forms
- React-GA4 because metrics matter
- jQuery (because sometimes you need it)

## Why?

It's a portfolio that doesn't bore you to death. That's it.

---

Built by [Karthick](https://github.com/gorghs). See the source on [GitHub](https://github.com/gorghs/ubuntu-simulation).
