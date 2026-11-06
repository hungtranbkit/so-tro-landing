# Project context — MESFlow rental demo landing

## Current release — 2026-11-06

- Website: https://sotro.mesflow.net/ . Source mirrors landing/ in the product repository.
- Refreshed current-version cards, demo instructions, MESFlow attribution, contact and pricing copy; preserves the calculator, interactive walkthrough and manual contact form.
- The working demo entry is https://sotro-moi.mesflow.net/ , redirecting to /dang-nhap. The button reads “Mở bản dùng thử”. Do not link to /dung-thu until it is available.
- State claims stay accurate: web demo uses sample data; Android is under testing; no commercial APK, automated Zalo sending, bank reconciliation or live AI reading is advertised.
- styles.css?v=20261106 prevents clients reusing the previous layout stylesheet.
- Checks passed: unique HTML IDs, internal anchors, demo destination, JS syntax for main.js/guide.js and git diff --check.
- Post-publication desktop visual check passed for the three current-version cards. Calculator change 125→130 returned 1,691,000 VND; reset returned 1,673,500 VND. Mobile viewport and full app E2E were not rerun.
- Public implementation b2ee111; cache fix 686dc5f. Deployment and content verified on the live website.
- Contact remains Zalo 0942 591 888. No Facebook Page URL has yet been verified; add one only after confirming the actual Page.
