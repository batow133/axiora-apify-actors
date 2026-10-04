# Scrape any Shopify store's variants (price, SKU, stock) without an API key

## The public feed most people forget

Every Shopify store exposes its catalogue at `/{store}/products.json` — the same feed the storefront's own JavaScript uses. No API key, no app install, no OAuth. You just need to treat it like the fragile public endpoint it is.

## One row per variant, not per product

Price, SKU and stock live on the **variant**, so a shirt in five sizes is five rows. The [Shopify Variant Scraper](https://apify.com/axiorasolutions/shopify-variant-scraper) returns:

```json
{
  "store": "allbirds.com",
  "productTitle": "Wool Runner Go",
  "variantTitle": "US 10 / Natural Black",
  "sku": "WRG-NB-10",
  "price": 140,
  "compareAtPrice": 160,
  "discountPercent": 12.5,
  "isOnSale": true,
  "available": true,
  "option1": "US 10",
  "option2": "Natural Black",
  "vendor": "Allbirds",
  "productType": "Shoes",
  "tags": ["sale"],
  "images": ["https://cdn.shopify.com/..."],
  "variantUid": "allbirds.com:123456:789012",
  "productHash": "b41c9d2e77f0a183"
}
```

`productHash` is a change-detection key: diff two scheduled runs to see exactly which variants changed price or stock.

## Filters that cut the bill

The input lets you narrow before rows are written, so filters reduce both the dataset and the number of billed variants:

```json
{
  "stores": ["allbirds.com", "kith.com"],
  "collections": ["sale"],
  "onSaleOnly": true,
  "maxProductsPerStore": 100,
  "maxVariantsTotal": 2000
}
```

## Handle the failure modes

The public feed is not always friendly, and the Actor reports each case as an error row instead of failing the run:

- **404** → the store is not Shopify (or the feed is disabled) → `UNSUPPORTED_SOURCE`.
- **429** → the store rate-limited you → `RATE_LIMITED`.
- **Empty** → feed exists but the catalogue is private → `EMPTY_RESULT`.

That means a mixed list of 500 domains gives you data for the real Shopify stores and a clear reason for every miss.

## Try it

**[Shopify Variant Scraper: Price, SKU & Stock](https://apify.com/axiorasolutions/shopify-variant-scraper)** — no API key, one row per variant.
