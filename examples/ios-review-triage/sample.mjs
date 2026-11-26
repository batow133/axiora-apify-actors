import { pathToFileURL } from 'node:url';

export const sampleApps = Object.freeze([
  { id: '572688855', label: 'Todoist' },
  { id: '626144601', label: 'TickTick' },
  { id: '904237743', label: 'Things 3' },
]);
export const sampleStores = Object.freeze(['us', 'gb']);
const cap = 50;
const complaintTerms = Object.freeze({
  sync: /\bsync(?:s|ed|ing|hroniz\w*)?\b/i,
  widget: /\bwidgets?\b/i,
  calendar: /\bcalendars?\b/i,
  crash: /\bcrash(?:es|ed|ing)?\b/i,
  notifications: /\bnotifications?\b/i,
  subscription: /\b(?:subscription|subscriptions|subscribe|subscribed)\b/i,
});

export function feedUrl(id, storefront) {
  if (!/^\d{6,13}$/.test(id) || !/^[a-z]{2}$/.test(storefront)) throw new TypeError('Use a numeric Apple app ID and two-letter storefront code.');
  return `https://itunes.apple.com/${storefront}/rss/customerreviews/page=1/id=${id}/sortby=mostrecent/json`;
}

export function summarizeFeed(feed, { id, label }, storefront) {
  if (!feed || typeof feed !== 'object' || !Array.isArray(feed.link) || (feed.entry != null && !Array.isArray(feed.entry))) {
    throw new TypeError('Unrecognized Apple feed; do not report it as zero reviews.');
  }
  const entries = feed.entry ?? [];
  const ratings = [0, 0, 0, 0, 0];
  const dates = [];
  const seen = new Set();
  const lowStarKeywordHits = Object.fromEntries(Object.keys(complaintTerms).map(term => [term, 0]));
  let duplicates = 0, excluded = 0, versionTagged = 0, lowStarsVersionTagged = 0;
  for (const row of entries.slice(0, cap)) {
    const uid = row?.id?.label;
    const rating = Number(row?.['im:rating']?.label);
    const reported = Date.parse(row?.updated?.label);
    if (!uid || !Number.isInteger(rating) || rating < 1 || rating > 5 || !Number.isFinite(reported)) {
      excluded++;
      continue;
    }
    if (seen.has(uid)) { duplicates++; continue; }
    seen.add(uid);
    ratings[rating - 1]++;
    dates.push(reported);
    const hasVersion = typeof row['im:version']?.label === 'string' && row['im:version'].label.trim() !== '';
    if (hasVersion) versionTagged++;
    if (rating <= 2) {
      if (hasVersion) lowStarsVersionTagged++;
      const text = `${row.title?.label ?? ''}\n${row.content?.label ?? ''}`;
      for (const [term, matches] of Object.entries(complaintTerms)) {
        if (matches.test(text)) lowStarKeywordHits[term]++;
      }
    }
  }
  const day = n => new Date(n).toISOString().slice(0, 10);
  return { app: label, appId: id, storefront, source: feedUrl(id, storefront),
    writtenReviews: seen.size, ratingsOneThroughFive: ratings, oneOrTwoStars: ratings[0] + ratings[1],
    versionTagged, lowStarsVersionTagged, lowStarKeywordHits,
    oldestDate: dates.length ? day(Math.min(...dates)) : null, newestDate: dates.length ? day(Math.max(...dates)) : null,
    duplicates, excluded };
}

export async function captureSample(fetchFeed = fetch) {
  const rows = [];
  for (const app of sampleApps) {
    for (const storefront of sampleStores) {
      const response = await fetchFeed(feedUrl(app.id, storefront), { signal: AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error(`Apple feed unavailable for ${app.label}/${storefront} (HTTP ${response.status})`);
      rows.push(summarizeFeed((await response.json()).feed, app, storefront));
    }
  }
  return { capturedAt: new Date().toISOString(), unit: 'Written reviews in the first most-recent public feed page, not all App Store ratings', maxReviewsPerAppStorefront: cap, rows };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(await captureSample(), null, 2));
}
