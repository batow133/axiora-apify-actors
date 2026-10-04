# 10 no-API-key Apify Actors for data pipelines (the full portfolio)

All ten run on public sources with **no API keys and no logins**, and all ten are pay-per-result, so a test costs cents.

## Jobs & recruiting
**ATS Job Scraper** — Greenhouse, Ashby, Lever and SmartRecruiters in one schema, with salary provenance and change hashes.
→ https://apify.com/axiorasolutions/ats-job-scraper

## E-commerce
**Shopify Variant Scraper** — one row per variant: SKU, options, price, compare-at price, discount, stock.
→ https://apify.com/axiorasolutions/shopify-variant-scraper

## SEO
**SEO Audit Tool** — robots/sitemap traversal plus per-URL indexability: canonicals, noindex, hreflang, titles, images, links.
→ https://apify.com/axiorasolutions/seo-audit-tool

**URL Status Checker** — bulk status codes and full redirect chains for broken-link reports and migrations.
→ https://apify.com/axiorasolutions/url-status-checker

## News & content
**News & RSS Scraper** — Google News, RSS 2.0/1.0, Atom and JSON Feed in one schema, with optional full text.
→ https://apify.com/axiorasolutions/news-feed-scraper

**Substack Scraper** — newsletter archives with engagement: reactions, comments, restacks, word counts.
→ https://apify.com/axiorasolutions/substack-archive-scraper

## Mobile
**App Store Review Scraper** — reviews per country storefront + app profile rows.
→ https://apify.com/axiorasolutions/app-review-scraper

**ASO Keyword Scraper** — exact App Store rank per keyword per country, with listing metadata.
→ https://apify.com/axiorasolutions/aso-keyword-scraper

## Lead-gen & finance
**Domain Contact Enricher** — emails, phones, socials, tech stack, ATS detection and MX/SPF/DMARC per domain, each value traced to its source page.
→ https://apify.com/axiorasolutions/domain-contact-enricher

**SEC EDGAR API** — filings, XBRL financial facts and full-text search by ticker or CIK.
→ https://apify.com/axiorasolutions/sec-edgar-api

## How they chain

- Domain Contact Enricher → detects a company's ATS → feeds the ATS Job Scraper.
- SEO Audit Tool → URL list → URL Status Checker for a broken-link report.
- News & RSS Scraper + Substack Scraper → the same clean text contract for a RAG index.

Browse all ten: https://apify.com/axiorasolutions
