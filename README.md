# Axiora data Actors — pipelines without API keys

Production-ready [Apify Actors](https://apify.com/axiorasolutions) for recruiting, App Store,
lead-generation and SEO data. Public sources only: **no API key, no login**.

## The Actors

| Actor | What it returns | Link |
|---|---|---|
| **ATS Job Scraper** | One row per job from Greenhouse, Ashby, Lever, SmartRecruiters — salary evidence, workplace type, change hashes | [apify.com/axiorasolutions/ats-job-scraper](https://apify.com/axiorasolutions/ats-job-scraper) |
| **App Store Review Scraper** | Reviews per country storefront: rating, body, version, helpful votes + app profile | [apify.com/axiorasolutions/app-review-scraper](https://apify.com/axiorasolutions/app-review-scraper) |
| **ASO Keyword Scraper** | Exact App Store rank per keyword per country, with listing metadata and difficulty signals | [apify.com/axiorasolutions/aso-keyword-scraper](https://apify.com/axiorasolutions/aso-keyword-scraper) |
| **Domain Contact Enricher** | Emails, phones, socials, tech stack, ATS detection and MX/SPF/DMARC per domain — every value traced to its source page | [apify.com/axiorasolutions/domain-contact-enricher](https://apify.com/axiorasolutions/domain-contact-enricher) |
| **URL Status Checker** | Bulk HTTP status, full redirect chains, timing and page facts | [apify.com/axiorasolutions/url-status-checker](https://apify.com/axiorasolutions/url-status-checker) |

Each is pay-per-result on Apify, so a small test costs cents.

## Quick start

Every Actor accepts a JSON input. See `examples/` — for instance:

```json
{ "boards": ["greenhouse:airtable", "ashby:Linear"] }
```

Run it from the API:

```bash
curl -X POST "https://api.apify.com/v2/acts/axiorasolutions~ats-job-scraper/runs?token=YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @examples/ats-input.json
```

## Articles

- [One dataset from Greenhouse, Ashby and Lever](https://dev.to/axiora/one-dataset-from-greenhouse-ashby-and-lever-a-clean-way-to-track-job-postings-1968)
- [App Store reviews are per country](https://dev.to/axiora/app-store-reviews-are-per-country-how-to-export-them-without-an-api-key-1i76)
- [ASO keyword tracking: exact App Store rank per country](https://dev.to/axiora/aso-keyword-tracking-get-the-exact-app-store-rank-per-country-with-code-3im6)
- [Company enrichment without a data vendor](https://dev.to/axiora/company-enrichment-without-a-data-vendor-domains-to-emails-tech-stack-and-mx-2532)
- [Bulk URL and redirect-chain audits before a migration](https://dev.to/axiora/bulk-url-and-redirect-chain-audits-a-2-minute-safety-net-before-a-migration-29io)
- [5 no-API-key data Actors for recruiting, ASO, lead-gen and SEO](https://dev.to/axiora/5-no-api-key-data-actors-for-recruiting-aso-lead-gen-and-seo-1i59)

- [Greenhouse vs Ashby vs Lever vs SmartRecruiters: which job API should you scrape?](https://dev.to/axiora/greenhouse-vs-ashby-vs-lever-vs-smartrecruiters-which-job-api-should-you-scrape-56a1)
- [A hiring-signal pipeline in 15 minutes: domains to ATS to job postings](https://dev.to/axiora/a-hiring-signal-pipeline-in-15-minutes-domains-ats-job-postings-3l1n)

## How they chain

- Domain Contact Enricher → detects the ATS → `atsJobScraperInput` feeds the ATS Job Scraper.
- Sitemap SEO Audit → URL list → URL Status Checker for a broken-link report.
