# Axiora data Actors — 10 pipelines without API keys

Production-ready [Apify Actors](https://apify.com/axiorasolutions) for recruiting, e-commerce,
SEO, news, mobile, lead-gen and finance data. Public sources only: **no API key, no login**.
All pay-per-result, so a test costs cents.

## The Actors

| Actor | What it returns | Link |
|---|---|---|
| **ATS Job Scraper** | One row per job from Greenhouse, Ashby, Lever, SmartRecruiters — salary evidence, workplace type, change hashes | [Store](https://apify.com/axiorasolutions/ats-job-scraper) |
| **Shopify Variant Scraper** | One row per variant: SKU, options, price, compare-at price, discount, stock | [Store](https://apify.com/axiorasolutions/shopify-variant-scraper) |
| **SEO Audit Tool** | Sitemap traversal + per-URL indexability: status, canonical, noindex, hreflang, titles, links | [Store](https://apify.com/axiorasolutions/sitemap-seo-audit) |
| **URL Status Checker** | Bulk HTTP status, full redirect chains, timing and page facts | [Store](https://apify.com/axiorasolutions/url-status-checker) |
| **News & RSS Scraper** | Google News, RSS 2.0/1.0, Atom and JSON Feed in one schema | [Store](https://apify.com/axiorasolutions/news-feed-scraper) |
| **Substack Scraper** | Newsletter archive with reactions, comments, restacks, word counts | [Store](https://apify.com/axiorasolutions/substack-archive-scraper) |
| **App Store Review Scraper** | Reviews per country storefront + app profile rows | [Store](https://apify.com/axiorasolutions/app-review-scraper) |
| **ASO Keyword Scraper** | Exact App Store rank per keyword per country + listing metadata | [Store](https://apify.com/axiorasolutions/aso-keyword-scraper) |
| **Domain Contact Enricher** | Emails, phones, socials, tech stack, ATS detection, MX/SPF/DMARC per domain | [Store](https://apify.com/axiorasolutions/domain-contact-enricher) |
| **SEC EDGAR API** | Filings, XBRL financial facts and full-text search by ticker or CIK | [Store](https://apify.com/axiorasolutions/sec-edgar-api) |

## Quick start

Each Actor takes a JSON input (see `examples/`). Run one from the API:

```bash
curl -X POST "https://api.apify.com/v2/acts/axiorasolutions~ats-job-scraper/runs?token=YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @examples/ats-input.json
```

## Articles (14)

**Jobs & comparison**
- [One dataset from Greenhouse, Ashby and Lever](https://dev.to/axiora/one-dataset-from-greenhouse-ashby-and-lever-a-clean-way-to-track-job-postings-1968)
- [Greenhouse vs Ashby vs Lever vs SmartRecruiters: which job API should you scrape?](https://dev.to/axiora/greenhouse-vs-ashby-vs-lever-vs-smartrecruiters-which-job-api-should-you-scrape-56a1)
- [A hiring-signal pipeline in 15 minutes: domains → ATS → job postings](https://dev.to/axiora/a-hiring-signal-pipeline-in-15-minutes-domains-ats-job-postings-3l1n)

**E-commerce**
- [Scrape any Shopify store's variants (price, SKU, stock) without an API key](https://dev.to/axiora/scrape-any-shopify-stores-variants-price-sku-stock-without-an-api-key-2jle)

**SEO**
- [A sitemap SEO audit that actually checks indexability](https://dev.to/axiora/a-sitemap-seo-audit-that-actually-checks-indexability-not-just-urls-2gc6)
- [Bulk URL and redirect-chain audits before a migration](https://dev.to/axiora/bulk-url-and-redirect-chain-audits-a-2-minute-safety-net-before-a-migration-29io)

**News & content**
- [Google News + RSS + Atom + JSON Feed: one schema for RAG pipelines](https://dev.to/axiora/google-news-rss-atom-json-feed-one-schema-for-rag-pipelines-37no)
- [Export a Substack archive with engagement data](https://dev.to/axiora/export-a-substack-archive-with-engagement-data-posts-reactions-restacks-3c0h)

**Mobile**
- [App Store reviews are per country](https://dev.to/axiora/app-store-reviews-are-per-country-how-to-export-them-without-an-api-key-1i76)
- [ASO keyword tracking: exact App Store rank per country](https://dev.to/axiora/aso-keyword-tracking-get-the-exact-app-store-rank-per-country-with-code-3im6)

**Lead-gen & finance**
- [Company enrichment without a data vendor](https://dev.to/axiora/company-enrichment-without-a-data-vendor-domains-to-emails-tech-stack-and-mx-2532)
- [SEC EDGAR without an API key: filings, XBRL financials, full-text search](https://dev.to/axiora/sec-edgar-without-an-api-key-filings-xbrl-financials-full-text-search-43b5)

**Roundups**
- [5 no-API-key data Actors for recruiting, ASO, lead-gen and SEO](https://dev.to/axiora/5-no-api-key-data-actors-for-recruiting-aso-lead-gen-and-seo-1i59)
- [10 no-API-key Apify Actors (the full portfolio)](https://dev.to/axiora/10-no-api-key-apify-actors-for-data-pipelines-the-full-portfolio-5ebh)

## How they chain

- Domain Contact Enricher → detects the ATS → `atsJobScraperInput` feeds the ATS Job Scraper.
- SEO Audit Tool → URL list → URL Status Checker for a broken-link report.
- News & RSS + Substack → one clean-text contract for a RAG index.

## Follow

Mastodon: [@batow133@mastodon.social](https://mastodon.social/@batow133)
