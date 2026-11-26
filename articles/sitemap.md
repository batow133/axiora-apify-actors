# A sitemap SEO audit that actually checks indexability (not just URLs)

<!-- axiora-workflow-links-v1 -->

**Try it:** [Copy a small Apify example](https://apify.com/axiorasolutions/sitemap-seo-audit/examples/axiora-website-seo-check) or [download the n8n workflow](https://raw.githubusercontent.com/batow133/axiora-apify-actors/master/workflows/n8n/sitemap-seo-audit.json). Start manually in your own Apify account, review the [Actor price](https://apify.com/axiorasolutions/sitemap-seo-audit), and [schedule only when ready](https://docs.apify.com/platform/actors/running/schedules).

**Want a weekly summary?** [Download the tested n8n report](https://raw.githubusercontent.com/batow133/axiora-apify-actors/master/workflows/n8n/sitemap-indexability-weekly.json). Summarizes HTTP errors, redirects, noindex and canonical mismatches for a bounded sitemap sample. The weekly trigger is off, and the import includes no credentials.

[Read the weekly sitemap n8n setup guide](https://axiora-solutions.vercel.app/n8n/sitemap-indexability-weekly) for import instructions and an explanation of the report.

## Extracting URLs is the easy part

A sitemap gives you a list. What you actually need to know is whether those pages **can rank**: do they return 200, do they self-canonical, are they accidentally noindexed, do they have a title of a sane length, is the hreflang cluster reciprocal?

The [SEO Audit Tool](https://apify.com/axiorasolutions/sitemap-seo-audit) does the full pass, bounded:

1. Fetches `robots.txt` and follows every declared `Sitemap:`.
2. Walks nested sitemap **index** files up to your cap.
3. Fetches each URL (robots-aware by default) and reports.

## What each audited URL carries

```json
{
  "recordType": "page",
  "url": "https://example.com/pricing",
  "httpStatus": 200,
  "finalUrl": "https://example.com/pricing",
  "redirectCount": 0,
  "contentType": "text/html",
  "title": "Pricing — Example",
  "metaDescription": "...",
  "h1Count": 1,
  "canonicalUrl": "https://example.com/pricing",
  "isNoindex": false,
  "isIndexable": true,
  "hreflang": [{ "lang": "en", "url": "..." }],
  "imagesMissingAlt": 3,
  "internalLinks": 42,
  "findings": [
    { "id": "title-too-short", "severity": "low", "message": "Title is 14 characters.", "evidence": "Pricing — Example" }
  ]
}
```

Findings are severity-ranked, so the dataset sorts into a to-do list.

## Two modes

- **extract-urls** — cheap, returns the URL inventory with lastmod/changefreq/priority. Use it to size a site before paying for a full audit.
- **audit** — fetches and analyses every URL.

```json
{
  "sites": ["example.com"],
  "mode": "audit",
  "maxUrlsPerSite": 500,
  "maxSitemapsPerSite": 30
}
```

## The honest limit

If a site has no sitemap, there is nothing to audit. The Actor tells you so (`EMPTY_RESULT`) instead of silently crawling the whole domain, because that would blow your budget without warning.

## Try it

**[SEO Audit Tool: Sitemap & Indexability](https://apify.com/axiorasolutions/sitemap-seo-audit)** — point it at a domain or a direct sitemap URL.
