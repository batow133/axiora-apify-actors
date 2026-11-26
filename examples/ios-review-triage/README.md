# iOS review triage: which complaints should you reproduce after a release?

**For mobile product teams and app-store optimization agencies.** Before turning complaints into tickets, separate the storefront, the version the reviewer reported and the date the review appeared. Here is a real, reproducible example using three iOS task managers.

## Sample: Todoist, TickTick and Things 3

Collected on **26 November 2026** from the first most-recent Apple public customer-reviews page per app and storefront. Each row is 50 written reviews. The US and UK samples cover different time spans.

| App | Storefront | 1–2 stars in sample | Review dates (UTC) | Source |
|---|---|---:|---|---|
| Todoist | US | 11 / 50 | 26 Sep–23 Nov 2026 | [Apple feed](https://itunes.apple.com/us/rss/customerreviews/page=1/id=572688855/sortby=mostrecent/json) |
| Todoist | UK | 15 / 50 | 14 Oct 2025–24 Nov 2026 | [Apple feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=572688855/sortby=mostrecent/json) |
| TickTick | US | 2 / 50 | 2–24 Nov 2026 | [Apple feed](https://itunes.apple.com/us/rss/customerreviews/page=1/id=626144601/sortby=mostrecent/json) |
| TickTick | UK | 5 / 50 | 16 May–22 Nov 2026 | [Apple feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=626144601/sortby=mostrecent/json) |
| Things 3 | US | 9 / 50 | 27 Jun–24 Nov 2026 | [Apple feed](https://itunes.apple.com/us/rss/customerreviews/page=1/id=904237743/sortby=mostrecent/json) |
| Things 3 | UK | 9 / 50 | 21 Nov 2024–8 Nov 2026 | [Apple feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=904237743/sortby=mostrecent/json) |

**What I’d check first:** four of the 11 low-star Todoist US reviews mentioned the word “crash” or a variant. That is a search cue: group those reviews by reported version, read them for context and try to reproduce any shared symptom. It’s not proof of a bug or of a higher crash rate. The Todoist UK sample had more low-star reviews, but it spans more than a year, so comparing the two percentages as if they cover the same release would be misleading.

All **300 of 300** sampled reviews had Apple's reported app version, including all **51** one- or two-star reviews. That coverage is an observation from this capture, not a promise. A missing version should stay blank. The version does not establish a build number, device, OS, or root cause.

## Run the same check yourself

- [View the archived aggregate JSON](sample.json) or run `node sample.mjs` with Node 20+ to pull the latest six pages. A new pull will have a new sample. No credentials are needed for the Apple source; the script does not export review text or reviewer names.
- For a spreadsheet from one listing, start with one public Apple feed page. Map `im:version.label` to `appVersion`, `updated.label` to the timestamp and `im:rating.label` to stars. Save the review ID as text. Cache IDs across runs, space requests and retain the storefront; do not guess missing versions.
- For a hosted CSV export, use the [Axiora App Store Reviews Actor](https://apify.com/axiorasolutions/app-review-scraper). Start with one app and one storefront, turn off app-profile rows if you only need reviews, and check current Apify pricing before running. The actor and the independent Apple source are separate options.

Keyword hits count at most once per review, use a small English-language term list and are not human-validated labels. The list does not detect every complaint or every language. Empty or unavailable storefronts must be reported separately. Written reviews aren't all ratings, and a feed snapshot isn't representative of all users.

## Run the self-serve reviews Actor on Apify

Use the [App Store Reviews Scraper on Apify](https://apify.com/axiorasolutions/app-review-scraper) for hosted runs, saved inputs and CSV exports. Review the current price and set a run spending cap. The same saved input can be scheduled in Apify; for overlapping samples, deduplicate on `reviewUid` before appending rows to another system.
