# Bulk URL and redirect-chain audits: a 2-minute safety net before a migration

## The five minutes before you ship a migration

You changed your URL structure, added a trailing slash policy, or moved a domain. The only thing standing between you and a traffic cliff is a redirect map that actually works. Testing 500 URLs by hand is not a plan.

The [URL Status Checker](https://apify.com/axiorasolutions/url-status-checker) takes a list of URLs and returns, per row:

- HTTP status and status category,
- the **full redirect chain**, hop by hop,
- the final URL and whether the redirect crossed domains,
- response time and content type,
- and for HTML responses: title, h1, canonical, meta robots.

```json
{
  "requestedUrl": "http://example.com/old-page",
  "httpStatus": 200,
  "isRedirect": false,
  "redirectCount": 2,
  "redirectChain": [
    { "status": 301, "to": "https://example.com/old-page" },
    { "status": 301, "to": "https://example.com/new-page" }
  ],
  "isCrossDomainRedirect": false,
  "finalUrl": "https://example.com/new-page",
  "responseMs": 143,
  "title": "New page",
  "metaRobots": "index,follow"
}
```

## Recipes

**Broken-link report** — set `filterByStatus: ["404","410","500"]` and you get only the pages that are actually dead, and you are only billed for those.

**Redirect QA** — feed the old URL list in, sort by `redirectCount` and look for chains longer than one hop or unexpected cross-domain hops. Both hurt SEO.

**Crawl audit handoff** — the [Sitemap SEO Audit](https://apify.com/axiorasolutions/sitemap-seo-audit) dataset's URL column pastes straight into this Actor.

## Input

```json
{
  "urls": ["https://example.com", "http://example.com/old-page"],
  "method": "GET",
  "followRedirects": true
}
```

A non-2xx response is a **result**, not a failed run — you get a row for every URL you asked about.

## Try it

**[URL Status Checker](https://apify.com/axiorasolutions/url-status-checker)** — no API key, and HEAD mode roughly halves the time for very large sweeps.
