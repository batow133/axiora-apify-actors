# 5 no-API-key data Actors for recruiting, ASO, lead-gen and SEO

A lot of "data APIs" want a credit card, a sales call and a rate limit before you see a single row. These five run on public sources with **no API key**, so you can test them in minutes and schedule them when they earn their place.

## 1. ATS Job Scraper — Greenhouse, Ashby, Lever, SmartRecruiters

One row per open role, four providers, one schema. Salary carries an `evidence` field so you know whether a number came from the ATS itself, the description text, or nowhere. `recordHash` gives you change detection for free.

→ [apify.com/axiorasolutions/ats-job-scraper](https://apify.com/axiorasolutions/ats-job-scraper)

## 2. App Store Review Scraper — reviews per country

Apple stores reviews per storefront, so this targets the countries you care about. Rating, body, version and helpful votes per review, plus an app profile row.

→ [apify.com/axiorasolutions/app-review-scraper](https://apify.com/axiorasolutions/app-review-scraper)

## 3. ASO Keyword Scraper — exact rank per keyword and country

The honest version of ASO data: Apple's exact order, with rating counts and "keyword in title" flags so you can tell a weak incumbent from a wall.

→ [apify.com/axiorasolutions/aso-keyword-scraper](https://apify.com/axiorasolutions/aso-keyword-scraper)

## 4. Domain Contact Enricher — domains into contactable records

Emails, phones, socials, tech stack, ATS detection and MX/SPF/DMARC — one row per domain, every value traced to its source page.

→ [apify.com/axiorasolutions/domain-contact-enricher](https://apify.com/axiorasolutions/domain-contact-enricher)

## 5. URL Status Checker — bulk status and redirect chains

Feed it a URL list (or the output of a sitemap crawl) and get status codes, full redirect chains, timing and page facts. The broken-link report you run before every migration.

→ [apify.com/axiorasolutions/url-status-checker](https://apify.com/axiorasolutions/url-status-checker)

## Why they chain together

The Domain Enricher detects the ATS a company uses and emits an input string for the Jobs Actor. The Sitemap Audit emits URLs for the Status Checker. Each is useful alone and better as a pipeline.

All five are pay-per-result, so a small test costs cents and a full run is predictable. No keys, no logins, no browser.
