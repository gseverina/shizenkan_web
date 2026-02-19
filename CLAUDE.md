# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page React application for a traditional Okinawan Karate school (Shorin Ryu Shizenkan). Built with Vite, React, Tailwind CSS, and Framer Motion. All content is in Spanish, including dojo information, news, class schedules, Japanese vocabulary, kata descriptions, and contact details.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

**Single-file component structure**: The entire application lives in `src/App.jsx` (~520 lines). This is intentional for simplicity - all sections, components, and data are co-located in one file.

**Main sections** (in order of appearance):
- `Navbar` - Sticky navigation with mobile menu
- `Hero` - Header with dojo name, logo, sensei info
- `SchoolObjectives` - 5 principles with Japanese numbering
- `News` - Dojo announcements (currently empty state)
- `Classes` - Schedule grid
- `VocabKatas` - Collapsible vocabulary and kata listings
- `Contact` - Contact form and location details

**Data constants** (top of App.jsx):
- `DOJO_INFO` - School name, sensei, description
- `NEWS` - Array of news items (currently unused, showing empty state)
- `CLASSES` - Class schedule
- `VOCAB` - Japanese terminology organized by category
- `KATAS` - Complete kata list with meanings and creators
- `SCHOOL_OBJECTIVES` - 5 principles in Spanish
- `JAPANESE_NUMBERS` - Kanji, romaji, meanings for 1-5

**Reusable components**:
- `Container` - Max-width wrapper with responsive padding
- `Card` - White card with border and shadow
- `SectionTitle` - Icon + title + optional subtitle pattern

## Styling Approach

- **Tailwind CSS** for all styling (configured in `tailwind.config.js`)
- **Framer Motion** for entrance animations (Hero and SchoolObjectives sections)
- **Responsive design** with mobile-first approach (`sm:`, `lg:` breakpoints)
- **Color scheme**: White backgrounds, blue accents, red for objectives section (Okinawan authenticity)
- Custom font class `.font-japanese` used for kanji display (not defined in codebase, relies on system fonts)

## Content Updates

When modifying content:
- Edit the data constants at the top of `src/App.jsx`
- Logo changes: Replace `src/assets/logo-dojo.png`
- The contact form is placeholder only (no backend submission configured)

## Deployment

Configured for static site deployment (Vercel/Netlify):
- Build command: `npm run build`
- Output directory: `dist/`
- No environment variables or backend required
