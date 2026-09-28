# Hossam Ashraf — Video Editor Portfolio Landing Page

Modern, dark/blue single-page portfolio for **Hossam Ashraf — Video Editor & Visual Storyteller**. Bilingual (English / Arabic with RTL), fully responsive, with an in-page video lightbox.

## ✅ Completed Features
- **Hero** — name, role, intro, CTAs, animated counters, floating phone mockups with real view counts
- **Tools marquee** — Premiere Pro, CapCut, Reels/Shorts, Color Grading, Motion Graphics, Sound Design, Generative AI
- **About Me** — bio, key strengths, skills chips
- **Core Services** — Short-Form & Reels, AI-Driven Visual Production, Brand Videos & Color Grading
- **Portfolio** — filterable (All / Reels / Videos / AI Videos), auto YouTube & Google Drive thumbnails, vertical (9:16) and wide (16:9) grids, video plays in a lightbox (Esc / backdrop closes)
- **My Own Show — التَّارِيخُ يُحْكَى** — dedicated purple section for Hossam's YouTube history series (collage style), episode cards (Hatshepsut, Zodiac) playable in the lightbox; also referenced in About
- **Results** — 19 real view-count screenshots in a 4-column grid, auto-sorted by industry (Restaurants → Fashion Stores → Furniture Showrooms → Factories → Stores → Beauty Salons → Cosmetics → Clinics → AI Reels) then by views; filterable by industry; stats (2M+ total / 1M+ on shown reels / 200+ projects). Digits and units share the same size, unit tinted blue
- **Testimonials** — 3 placeholder quotes (marked as samples) until real ones arrive
- **Contact** — WhatsApp, Instagram, Facebook cards + a form that opens WhatsApp with a pre-filled message (no backend)
- **Language toggle** EN ⇄ AR (saved in `localStorage`), direction flips to RTL, Cairo font for Arabic. Arabic copy is written in a friendly, neutral "white" dialect (no heavy fusḥa, no local slang)
- Sticky header, mobile burger menu, active-section highlight, scroll reveal animations, floating WhatsApp button
- SEO/OG meta tags, semantic HTML, accessibility labels, reduced-motion support

## 🔗 Entry Points
| Path | Description |
|------|-------------|
| `index.html` | The full landing page (anchors: `#hero-section`, `#about-section`, `#services-section`, `#portfolio-section`, `#results-section`, `#testimonials-section`, `#contact-section`) |

## 📁 Structure
```
index.html          main page
css/style.css       theme, layout, RTL, responsive
js/data.js          PROJECTS / RESULTS / TESTIMONIALS  ← edit content here
js/i18n.js          EN/AR translation strings
js/main.js          rendering, filters, lightbox, i18n, counters, WhatsApp form
images/views/       view-count screenshots used in hero / about / results
```

## ✏️ How to Edit Content
- **Add a project**: append an object to `PROJECTS` in `js/data.js`
  - YouTube: `{ type: 'youtube', ytId: 'VIDEO_ID', orientation: 'vertical' | 'wide', category: 'reels' | 'videos' | 'ai', title: {en, ar}, role: {en, ar} }`
  - Google Drive file: `{ type: 'drive', driveId: 'FILE_ID', ... }` (file must be shared "Anyone with the link")
  - External link/folder: `{ type: 'link', url: '...' }` (opens in new tab)
- **Testimonials**: replace the placeholder entries in `TESTIMONIALS`
- **Results screenshots**: `RESULTS` in `js/data.js` — cards display the **industry** (never the client name; client names live in Portfolio). `industry` sets the filter tab, the printed card label (`RESULT_INDUSTRIES[].card`) and the sort group; `pos: 'left' | 'right'` crops one half of a side-by-side screenshot. New screenshots just need `img`, `views`, `industry` (+ optional internal `note`)
- **History episodes**: append to `HISTORY_SERIES.episodes` in `js/data.js`
- **Profile photo**: `images/hossam.jpg`
- **Text**: edit strings in `js/i18n.js`
- **Colors**: CSS variables at the top of `css/style.css` (`--accent`, `--bg`, …)

## 🚧 Not Yet Implemented / Notes
- Testimonials are placeholders (labelled as samples) — awaiting real client quotes
- Google Drive thumbnails/preview depend on the file's sharing being public

## 💡 Recommended Next Steps
1. Add a 30–60s **showreel** to embed in the hero
3. Provide real testimonials (name, role, quote)
4. Optionally add a custom domain via the Publish tab

## 🗄️ Data / Storage
Static site — no database. All content lives in `js/data.js` and `js/i18n.js`. Contact form uses `wa.me` deep-link (client-side only).
