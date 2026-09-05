# Production image-loading investigation

## Live-domain finding (2026-09-05)

The actual production site at https://aoneunisexsalon.in/ is serving the current A ONE Salon homepage, but its extracted image references still use Manus-only paths such as `/manus-storage/hair-result-1_f6ac3975.jpeg`, `/manus-storage/colour-result_70bbb9e7.jpeg`, `/manus-storage/grooming-result_8839661c.jpeg`, `/manus-storage/salon-brand_132314f5.jpg`, and `/manus-storage/aone-booklet-cover_66d66998.png`. The live hero image area is visibly blank/black on the browser screenshot. This proves the deployed production build is not using the committed `/assets/` references from the local project checkpoint.

## Live bundle and hosting confirmation

The live domain’s HTML loads `/assets/index-BoQbe8mg.js` from **Netlify** (`server: Netlify`). That live bundle contains all 11 `/manus-storage/...` image/video paths and no `/assets/...` paths. Direct requests to the live domain returned `404` for both the old `/manus-storage/...` URLs and the corrected `/assets/...` URLs. The connected `user_github/main` branch at commit `6abc0974` contains `client/public/assets/*` and the current `Home.tsx` references `/assets/...`, so the actual failure is a stale/out-of-date Netlify deployment rather than a missing asset in the current repository source.
