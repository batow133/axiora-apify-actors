# One dataset from Greenhouse, Ashby and Lever: a clean way to track job postings

## Every applicant tracking system speaks a different dialect

If you track hiring signals, you have probably written this loop more than once:

- Greenhouse returns `jobs[].content` as double-encoded HTML, and salary sometimes hides in a `metadata` array of label/value pairs.
- Ashby puts structured pay on `compensation.summaryComponents`, not on the tier object everyone grabs first — so a naive parser silently returns nulls.
- Lever has **no salary field at all** on its public endpoint, and sets `isRemote: true` on some hybrid roles.
- SmartRecruiters serves descriptions from a per-posting endpoint only.

So you end up with four parsers, four schemas, and four sets of bugs.

## One schema instead

The [ATS Job Scraper](https://apify.com/axiorasolutions/ats-job-scraper) normalises Greenhouse, Ashby, Lever and SmartRecruiters into a single row per job:

```json
{
  "jobUid": "greenhouse:databricks:7712345",
  "source": "greenhouse",
  "companyName": "Databricks",
  "title": "Senior Data Engineer",
  "department": "Engineering",
  "locations": ["San Francisco, CA", "Remote - US"],
  "workplaceType": "HYBRID",
  "isRemote": false,
  "postedAt": "2026-09-18T09:14:02.000Z",
  "ageDays": 14,
  "applyUrl": "https://boards.greenhouse.io/databricks/jobs/7712345",
  "salary": {
    "minAmount": 180000,
    "maxAmount": 230000,
    "currency": "USD",
    "interval": "YEAR",
    "evidence": "ats-field"
  },
  "recordHash": "9bd2c1ea77405f38"
}
```

The field that matters most is `salary.evidence`. It is `ats-field` only when the ATS published a compensation field, `description-text` when a figure was quoted from the posting body, and `none` otherwise. Numbers are parsed from published figures, never invented — which is rarer than it should be.

## Run it in 30 seconds

The main input is an array, so one run covers many employers:

```json
{
  "boards": ["greenhouse:airtable", "https://jobs.ashbyhq.com/ramp", "lever:spotify"],
  "maxJobsPerBoard": 100,
  "maxJobsTotal": 500
}
```

Or from the API:

```bash
curl -X POST "https://api.apify.com/v2/acts/axiorasolutions~ats-job-scraper/runs?token=YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"boards":["greenhouse:airtable","ashby:Linear"]}'
```

Bare tokens are auto-detected across providers, and a careers URL is accepted as-is.

## Keep it fresh

`jobUid` is stable across runs, and `recordHash` changes when the title, locations or description change. Run it on a schedule and diff the two fields to get a precise "what is new / edited / gone" feed without storing the whole dataset twice.

A new "Head of Data" posting is a buying signal. A reposted role with an edited description is a budget signal. Both are one diff away.

## Try it

Use it directly in the Apify Store — no API key, no login: **[ATS Job Scraper](https://apify.com/axiorasolutions/ats-job-scraper)**. Set `maxJobsPerBoard` to 5 to test it for a few cents.
