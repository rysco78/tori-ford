# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a single-page static author website for Tori Ford, a romance author. There is no build system, framework, or package manager — everything lives in one `index.html` file with all CSS embedded in a `<style>` block in the `<head>`.

## Development

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8080
```

No build, lint, or test commands exist.

## Architecture

**Single file:** All HTML structure and CSS are in `index.html`. There is no JavaScript and no external CSS file.

**Assets:**
- `bg-pattern.jpg` — repeating texture used as a fixed background overlay
- `cover-title.png` — the "Fallin' Tides" title lettering overlaid on the book cover
- `Tori-Ford-Photo.jpg` — author headshot displayed as a circle over the book cover

**CSS design tokens** are defined as CSS custom properties at `:root` — all colors should reference these variables rather than hardcoded hex values where possible.

**Layout pattern:** The book cover floats left (`.book-section .book-wrapper { float: left }`), and the blurb content flows around it as normal text. This is intentional — do not convert to flexbox/grid or the text-wrap-around effect breaks.

**Book cover** is rendered entirely in CSS/HTML (`.book-cover`) — it is not an `<img>` tag. The cover title image (`cover-title.png`) is layered inside it via `.cover-title-area`. The author photo (`.author-photo`) is `position: absolute` inside `.book-cover-wrap` and uses `z-index: 9999` to sit above all other elements.

**Fonts loaded from Google Fonts:** Outfit (body), Notable (hero name), Homemade Apple (tagline and "Coming August" line), Sacramento, Dancing Script, and several others that are loaded but not currently in use.

**Responsive breakpoint** is at `max-width: 680px` — at mobile widths the float is cleared, the book wrapper centers, and CTA buttons go full width.
