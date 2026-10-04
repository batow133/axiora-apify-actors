# SEC EDGAR without an API key: filings, XBRL financials, full-text search

## EDGAR is free, but it isn't one API

The SEC publishes three useful surfaces, each with its own shape:

- **Submissions** — a company's full filing history (`data.sec.gov/submissions/CIK##########.json`).
- **Company facts** — XBRL financial values (`companyfacts`), per concept.
- **Full-text search** — `efts.sec.gov` across all filings.

The [SEC EDGAR API Actor](https://apify.com/axiorasolutions/sec-edgar-api) wraps all three behind one input and emits one row schema.

## Three modes

```json
{ "queries": ["AAPL"], "mode": "filings", "formTypes": ["10-K"], "maxFilingsPerCompany": 4 }
```

```json
{ "queries": ["TSLA"], "mode": "facts", "concepts": ["Revenues", "NetIncomeLoss"], "unitsFilter": "USD" }
```

```json
{ "queries": ["\"generative AI\""], "mode": "search", "searchForms": ["10-K"], "maxSearchHits": 50 }
```

## A filing row

```json
{
  "recordType": "filing",
  "cik": "0001045810",
  "entityName": "NVIDIA CORP",
  "ticker": "NVDA",
  "accessionNumber": "0001045810-26-000021",
  "formType": "10-K",
  "filingDate": "2026-02-25",
  "reportDate": "2026-01-25",
  "primaryDocument": "nvda-20260125.htm",
  "filingUrl": "https://www.sec.gov/Archives/edgar/data/...",
  "isXBRL": true,
  "isInlineXBRL": true
}
```

Facts rows carry the concept, unit, value, period and the accession that reported it — so a number is always traceable to a filing.

## Why use an Actor for this

- **Polite by default**: the Actor sends a declared user agent with contact info, as the SEC requires.
- **Joins the tedious bits**: ticker → CIK lookup, pagination, concept filtering, unit filtering.
- **Error rows, not failures**: an unknown ticker becomes an `ok:false` row with a hint instead of killing the run.

## Try it

**[SEC EDGAR API: Filings & XBRL Financials](https://apify.com/axiorasolutions/sec-edgar-api)** — no API key.
