# Google News + RSS + Atom + JSON Feed: one schema for RAG pipelines

## Feeds are the cheapest fresh data on the web

For RAG, monitoring or research, feeds beat scraping: they are small, structured and published for exactly this. The problem is there are at least four formats, plus Google News, and each returns different field names.

The [News & RSS Scraper](https://apify.com/axiorasolutions/news-feed-scraper) normalises all of them into one row:

```json
{
  "articleUid": "07aff4e08a2282d9",
  "feedTitle": "BBC News",
  "sourceType": "rss-2.0",
  "title": "OpenAI fires workers for mishandling sensitive information",
  "titleWithoutPublisher": "OpenAI fires workers for mishandling sensitive information",
  "url": "https://www.bbc.co.uk/news/articles/...",
  "publisherDomain": "bbc.co.uk",
  "publishedAt": "2026-10-02T08:20:32.000Z",
  "ageHours": 29,
  "summary": "...",
  "categories": [],
  "imageUrl": null,
  "contentHash": "d6dbba40b2d3507d"
}
```

## Mix Google News and plain feeds

```json
{
  "sources": [
    "gnews:artificial intelligence",
    "gnews-topic:TECHNOLOGY",
    "https://techcrunch.com/feed/",
    "https://daringfireball.net/feeds/json",
    "theverge.com"
  ],
  "maxItemsPerSource": 100
}
```

- `gnews:` runs a Google News search (quotes and `when:7d` work).
- `gnews-topic:` pulls a Google News topic.
- a plain feed URL is read directly; a **website URL is auto-discovered** to its feed.
- Feed types are detected automatically: RSS 2.0, RSS 1.0/RDF, Atom 1.0, JSON Feed.

## Built for pipelines

- **Dedup strategies:** by URL, normalised title, feed GUID, or none.
- **Date filters** relative (`24 hours`, `7 days`) or absolute.
- **Optional full text** — fetches each article and extracts the body as clean plain text, with the page's own `contentHash`.
- **Canonical URLs**, so Google News redirects don't poison your index.

## Try it

**[News & RSS Scraper: Google News to JSON](https://apify.com/axiorasolutions/news-feed-scraper)** — no API key, no login.
