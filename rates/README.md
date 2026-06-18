# UK Air Rate Search (legacy static copy)

The live tool is served by **Django on Fly.io** — not from this folder.

| What | URL |
|------|-----|
| Public search | https://app.logisticoreapp.com/rates/tool/ |
| Curator (PDF upload) | https://app.logisticoreapp.com/rates/tool/curator/ |

Source of truth for the search UI:

- `templates/rates/uk_search.html`
- `static/uk_rates/rates.css`
- `static/uk_rates/rates.js`

Deploy with `fly deploy` — no separate static host.

## Optional custom domain

To use `rates.logisticoreapp.com`, add it as a Fly certificate on the same app and include it in `DJANGO_ALLOWED_HOSTS` / `DJANGO_CSRF_TRUSTED_ORIGINS`.

## Rate uploads — no redeploy

Dropping a PDF in the curator stores it in the database/R2 and runs extraction at runtime. After **Publish**, rates appear in search immediately. You only `fly deploy` when **code** changes.
