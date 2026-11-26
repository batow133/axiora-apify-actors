import assert from 'node:assert/strict';
import test from 'node:test';
import { captureSample, feedUrl, summarizeFeed } from './sample.mjs';

const app = { id: '572688855', label: 'Todoist' };
const review = (id, rating, date = '2026-11-06T12:00:00Z') => ({
  id: { label: id }, 'im:rating': { label: rating }, updated: { label: date },
  author: { name: { label: 'UNPUBLISHED-NAME' } }, content: { label: 'UNPUBLISHED-BODY' },
});

test('counts only valid unique review records and exports no reviewer identifiers or text', () => {
  const out = summarizeFeed({ link: [], entry: [review('private-1', '1'), review('private-1', '1'), review('private-2', '4', '2026-11-02T12:00:00Z'), review('private-3', '6'), review('private-4', '5', 'invalid')] }, app, 'us');
  assert.deepEqual(out.ratingsOneThroughFive, [1, 0, 0, 1, 0]);
  assert.equal(out.writtenReviews, 2);
  assert.equal(out.oneOrTwoStars, 1);
  assert.equal(out.oldestDate, '2026-11-02');
  assert.equal(out.newestDate, '2026-11-06');
  assert.equal(out.duplicates, 1);
  assert.equal(out.excluded, 2);
  assert.doesNotMatch(JSON.stringify(out), /private-|UNPUBLISHED/);
});

test('does not disguise an unrecognized or failed source as an empty feed', async () => {
  assert.throws(() => summarizeFeed({}, app, 'us'), /Unrecognized/);
  assert.throws(() => summarizeFeed({ link: [], entry: {} }, app, 'us'), /Unrecognized/);
  assert.equal(summarizeFeed({ link: [] }, app, 'us').writtenReviews, 0);
  await assert.rejects(() => captureSample(async () => ({ ok: false, status: 403 })), /HTTP 403/);
});

test('counts terms once per low-star review and distinguishes source version coverage', () => {
  const low = { ...review('low', '2'), 'im:version': { label: '1.9.2' }, content: { label: 'sync sync calendar' } };
  const high = { ...review('high', '5'), content: { label: 'sync widgets calendar' } };
  const out = summarizeFeed({ link: [], entry: [low, high] }, app, 'gb');
  assert.equal(out.versionTagged, 1);
  assert.equal(out.lowStarsVersionTagged, 1);
  assert.equal(out.lowStarKeywordHits.sync, 1);
  assert.equal(out.lowStarKeywordHits.calendar, 1);
  assert.equal(out.lowStarKeywordHits.widget, 0);
});

test('only accepts literal storefronts and app IDs and keeps the 50-row source cap', () => {
  assert.throws(() => feedUrl('123/../', 'us'), /numeric/);
  assert.throws(() => feedUrl(app.id, '../gb'), /storefront/);
  const entries = Array.from({ length: 52 }, (_, index) => review(`row-${index}`, '2'));
  assert.equal(summarizeFeed({ link: [], entry: entries }, app, 'gb').writtenReviews, 50);
});

test('captures the fixed three-app, two-storefront matrix', async () => {
  const urls = [];
  const result = await captureSample(async url => {
    urls.push(url);
    return { ok: true, json: async () => ({ feed: { link: [], entry: [review('id', '2')] } }) };
  });
  assert.equal(result.rows.length, 6);
  assert.equal(new Set(urls).size, 6);
  assert.equal(result.rows.reduce((sum, row) => sum + row.oneOrTwoStars, 0), 6);
});
