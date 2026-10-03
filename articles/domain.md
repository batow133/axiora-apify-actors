# Company enrichment without a data vendor: domains to emails, tech stack and MX

## What a lead list actually needs

You have a list of company domains. You want, per company:

- contact emails and phone numbers,
- social profiles,
- the technology stack they run,
- the ATS they use for hiring,
- and their email infrastructure (MX provider, SPF, DMARC).

The hard requirement is not volume. It is **provenance** — knowing which page each value came from, so you can defend a contact when someone asks "where did you get this?"

## Every value carries its source

The [Domain Contact Enricher](https://apify.com/axiorasolutions/domain-contact-enricher) returns one row per domain. Contacts are ranked by confidence, and each carries the URL where it was found:

```json
{
  "domain": "example.com",
  "companyName": "Example Inc.",
  "emailCount": 2,
  "emails": [
    { "email": "hello@example.com", "confidence": "high", "isRoleAccount": true, "sourceUrl": "https://example.com/contact" }
  ],
  "socialProfiles": { "linkedin": "https://www.linkedin.com/company/example", "github": "https://github.com/example" },
  "technologyIds": ["nextjs", "cloudflare", "hubspot"],
  "atsProvider": "greenhouse",
  "atsJobScraperInput": "greenhouse:example",
  "emailInfrastructure": {
    "mailProvider": "Google Workspace",
    "hasSpf": true,
    "hasDmarc": true
  }
}
```

The `atsJobScraperInput` field chains directly into the [ATS Job Scraper](https://apify.com/axiorasolutions/ats-job-scraper) — domain in, hiring board out.

## An honest coverage note

Modern companies increasingly hide behind contact forms. This actor returns contacts **when the site publishes them** on its home, contact, about, team or imprint pages — it does not invent addresses or scrape private data. If it finds none, you get a profile row with the technology and email infrastructure, not a fabricated email. That is the correct behaviour for a list you intend to email.

## Usage

```json
{
  "domains": ["stripe.com", "shopify.com", "tesla.com"],
  "maxPagesPerDomain": 4,
  "includeTechnologies": true,
  "includeDnsSignals": true
}
```

It also respects `robots.txt` by default and reports unreachable domains as unbilled error rows.

## Try it

**[Domain Contact Enricher](https://apify.com/axiorasolutions/domain-contact-enricher)** — bulk mode, no API key, every value traceable.
