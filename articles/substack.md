# Export a Substack archive with engagement data (posts, reactions, restacks)

## The archive API nobody documents

Substack publications expose their archive at `/{publication}/api/v1/archive?sort=new&limit=12&offset=0` — the same endpoint the site uses to render its own archive page. It works on `*.substack.com` **and** on custom domains like `www.noahpinion.blog`.

The [Substack Scraper](https://apify.com/axiorasolutions/substack-archive-scraper) pages through it and returns one row per post:

```json
{
  "postId": "218257713",
  "title": "The second Trump presidency is a world-historic failure",
  "subtitle": "How did Trump fumble so badly?",
  "canonicalUrl": "https://www.noahpinion.blog/p/...",
  "publishedAt": "2026-10-03T08:47:17.615Z",
  "audience": "only_paid",
  "isFree": false,
  "isPodcast": false,
  "wordCount": 2933,
  "commentCount": 17,
  "restackCount": 19,
  "reactions": { "❤": 179 },
  "reactionTotal": 179,
  "firstAuthorName": "Noah Smith",
  "publication": "noahpinion.blog"
}
```

## What people use it for

- **Creator research** — which topics drive reactions and restacks across a niche.
- **Content archiving** — a durable, structured copy of your own publication.
- **Competitive analysis** — posting cadence, free/paid mix, average length per publication.

```json
{
  "publications": ["astralcodexten.substack.com", "newsletter.pragmaticengineer.com"],
  "maxPostsPerPublication": 100,
  "audienceFilter": "all"
}
```

Optional `includePostText` fetches each free post's page and extracts the body as clean text — paywalled posts return the same truncated preview a non-subscriber sees, which is the honest limit.

## Try it

**[Substack Scraper: Newsletter Posts & Stats](https://apify.com/axiorasolutions/substack-archive-scraper)** — no login needed for public posts.
