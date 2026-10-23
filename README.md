# Sổ Trọ — public landing and safe demo entry

**Public landing:** https://hungtranbkit.github.io/so-tro-landing/  
**Preview app (fictional data only):** https://sotro-preview.mesflow.net/  
**Privacy notice:** https://hungtranbkit.github.io/so-tro-landing/quyen-rieng-tu.html

This is a public product-information website for Vietnam's small landlords, with a client-only billing calculator. The **preview** is a separate Next.js application and is not licensed or approved for storing real renter data or receiving rent payments.

## What's currently live (2026-10-24)
- Landing responsive feature catalog, proposed release roadmap, FAQ, sample invoice and browser-only electricity/water calculator.
- Linked demo app; choose 'Dùng thử với dữ liệu mẫu' on demo login screen. Sign-up for real accounts disabled.
- Privacy notice on how public landing handles data; no analytics/marketing cookies or contact collection enabled.
- GitHub Pages served from public main branch; verified HTTP 200 for landing, stylesheet and privacy; Chromium mobile navigation PASS with zero page/console/network errors.
- Source of the static landing is maintained in private product repo under `landing/` and mirrored to this public static repo (no secrets or app data).

## Not yet available
- Custom domain `sotro.mesflow.net`: DNS zone edit access/HTTPS verification still pending, [task ST-022](https://github.com/hungtranbkit/so-tro/issues/24). The GitHub Pages URL is the valid live URL until then.
- Email waitlist: not live; needs verified operator contact, consent, privacy retention and secure backend, [task ST-023](https://github.com/hungtranbkit/so-tro/issues/25).
- Production application: not approved; legal questions for real tenant data, moderated usability, real-bank QR checks and CI billing issue remain open.
- The product name 'Sổ Trọ' is an **internal codename**, not cleared for public app-store brand use.

## Development
Static HTML, CSS and JavaScript; no third-party runtime dependencies. Edit on a feature branch, test keyboard/mobile/layout and sample calculator, then publish static assets to main. The private full app lives in [hungtranbkit/so-tro](https://github.com/hungtranbkit/so-tro).

## Release boundaries
Do not set a misleading 'sign up' form before a real protected backend/consent flow exists. Do not expose the private app/database source, real personal data, or redirect general traffic to the preview as if it were production.