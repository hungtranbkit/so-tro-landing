#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
rm -rf _site
mkdir -p _site
# Explicit allowlist: never publish .git, .github, security reports or credentials.
test -f 'CNAME' && cp -- 'CNAME' _site/
test -f 'index.html' && cp -- 'index.html' _site/
test -f 'styles.css' && cp -- 'styles.css' _site/
test -f 'main.js' && cp -- 'main.js' _site/
test -f 'guide.js' && cp -- 'guide.js' _site/
test -f 'favicon.svg' && cp -- 'favicon.svg' _site/
test -f 'og-card.svg' && cp -- 'og-card.svg' _site/
test -f 'quyen-rieng-tu.html' && cp -- 'quyen-rieng-tu.html' _site/
test -f 'robots.txt' && cp -- 'robots.txt' _site/
test -f 'sitemap.xml' && cp -- 'sitemap.xml' _site/

test -f _site/index.html
echo "Reviewed static site artifact assembled; security approval is controlled by workflow."
