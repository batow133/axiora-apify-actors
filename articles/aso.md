# ASO keyword tracking: get the exact App Store rank per country (with code)

## Exact rank, not a computed score

Most "ASO tools" show you a made-up difficulty number. What you actually want is the boring truth: for the keyword `habit tracker` in the US storefront, which apps are at positions 1–50 today, and what does each listing look like?

The [ASO Keyword Scraper](https://apify.com/axiorasolutions/aso-keyword-scraper) returns exactly that — one row per app per keyword per storefront, using Apple's own relevance order:

```json
{
  "recordType": "ranking",
  "keyword": "habit tracker",
  "storefront": "us",
  "rank": 1,
  "appName": "Habit Tracker - Daily Goals",
  "developerName": "Example Labs",
  "averageUserRating": 4.82,
  "userRatingCount": 128411,
  "primaryGenre": "Health & Fitness",
  "formattedPrice": "Free",
  "keywordMatchInTitle": true,
  "currentVersionReleaseDate": "2026-09-24T10:00:00Z",
  "appStoreUrl": "https://apps.apple.com/us/app/..."
}
```

## Signals that matter more than a difficulty score

- **`userRatingCount`** — a rank-3 app with 400 ratings is a weak incumbent. A rank-3 app with 900k ratings is a wall.
- **`keywordMatchInTitle`** — the strongest ranking input Apple exposes. If none of the top 10 use your keyword, that is an opening.
- **`currentVersionReleaseDate`** — an app not updated in two years is decaying.

## Track rivals across storefronts

The same app can rank 3rd in the US and 40th in Germany. Add both countries and compare:

```json
{
  "keywords": ["habit tracker", "budget app"],
  "countries": ["us", "de"],
  "resultsPerKeyword": 50
}
```

You can also pass `apps` to resolve listing metadata directly (rank stays null), which is handy for a competitor dashboard.

## Run it from code

```bash
curl -X POST "https://api.apify.com/v2/acts/axiorasolutions~aso-keyword-scraper/runs?token=YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keywords":["habit tracker"],"countries":["us","de"],"resultsPerKeyword":25}'
```

Schedule it weekly and diff on `recordHash` to catch rank moves.

## Try it

**[ASO Keyword Scraper](https://apify.com/axiorasolutions/aso-keyword-scraper)** — no API key, and it handles the storefront/language details for you.
