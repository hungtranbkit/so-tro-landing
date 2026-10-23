# Sổ Trọ — public landing

Live: **https://hungtranbkit.github.io/so-tro-landing/**

Public **feature announcement and interactive billing illustration only**. This is not the completed Sổ Trọ app and cannot access real landlord/tenant data.

- Vietnamese, responsive website for desktop and mobile.
- Prospective product capabilities: room/occupancy management, meter readings, invoice transparency, rent payments/debt tracking, direct-to-landlord VietQR, offline drafts (under investigation).
- Client-side calculator uses sample amounts, stores nothing and calls no API.
- No sign-up, analytics, production system, tenant information or bank access.
- Project codename only; brand/store name pending clearance.

## Operation

GitHub Pages publishes the root of this public repository's `main` branch. HTML/CSS/JS/SVG have no third-party runtime dependencies. For feature changes, edit the source under the private product repository `landing/`, review, then synchronize only the landing assets to this public repo. Never copy secrets or private product files.

## Verification record (2026-10-23)

GitHub Pages legacy build: built. Public index/styles/main/favicon/share image all returned HTTP 200; Node.js JavaScript syntax check passed. Chromium browser navigation returned PASS with HTTP 200, no page/console/network errors. Chromium screenshots at 1440×900 and 390×844 confirmed visual rendering. Live app feature workflows and signup **not available**.

The social preview currently uses `og-card.svg`; some platforms do not render SVG OpenGraph previews. Raster PNG optimization is a future enhancement.
