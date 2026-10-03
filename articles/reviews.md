# App Store reviews are per country: how to export them without an API key

## The country you pick decides which reviews exist

Apple does not have "the reviews" for an app. It has a separate review set for every storefront — US, GB, DE, JP, BR, and roughly 170 more. A US-only export will never show you the German complaints, and a German export will never show the one-star reviews from Brazil.

If you build product feedback loops from reviews, that distinction is the whole game.

## What you get per review

The [App Store Review Scraper](https://apify.com/axiorasolutions/app-review-scraper) returns one row per review across any list of storefronts:

```json
{
  "recordType": "review",
  "appName": "Spotify: Music and Podcasts",
  "rating": 1,
  "title": "Premium is forced",
  "body": "...",
  "author": "...",
  "appVersion": "9.0.1",
  "helpfulVotes": 42,
  "country": "us",
  "reviewedAt": "2026-09-29T08:12:00.000Z",
  "sentimentHint": "negative"
}
```

It accepts a numeric App Store ID, a bundle ID (`com.spotify.client`), an App Store URL, or `name:Duolingo` to resolve the top match by name. It also writes one app profile row per app and storefront — current version, rating count, price, genres, release notes.

## A realistic workflow

1. Collect the last 500 reviews for your app in `us`, `gb` and `de`.
2. Filter with `minRating: 1, maxRating: 2` to read only the complaints.
3. Cluster by `keywords` such as `crash`, `login`, `subscription`.
4. Compare `appVersion` to see whether a release fixed or caused a problem.

The input is small:

```json
{
  "apps": ["310633997", "com.spotify.client"],
  "countries": ["us", "gb", "de"],
  "maxReviewsPerApp": 500,
  "sortBy": "mostRecent"
}
```

## Two honest caveats

- Apple's public feed returns at most ~500 reviews per app per country. That is a ceiling, not a bug.
- Reviews in a storefront only exist in the local language; a DE run returns German text.

Both are properties of the source, not the scraper — and the output tells you the storefront on every row so you can filter precisely.

## Try it

**[App Store Review Scraper](https://apify.com/axiorasolutions/app-review-scraper)** — no API key, and you can cap the run at a few reviews to test it.
