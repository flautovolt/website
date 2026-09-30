# FL AutoVolt Solution — Website

Static bilingual (EN / ES) website for **FL AutoVolt Solution LLC** — car audio, marine audio, custom marine lighting and auto electrical in Miami / Coral Gables, FL.

Live domain: https://flautovolt.com

## Structure

```
public/                 ← the whole website (this folder is what Cloudflare Pages serves)
  index.html            Home (EN)          /
  about.html            About (EN)         /about
  services.html         Services (EN)      /services
  works.html            Works (EN)         /works
  contact.html          Contact (EN)       /contact
  es/                   Spanish pages      /es/, /es/nosotros, /es/servicios, /es/trabajos, /es/contacto
  assets/css/site.css   All styles + animations
  assets/js/site.js     Menu, scroll reveal, works filter, WhatsApp quote form
  assets/js/config.js   ← site settings (WhatsApp number for the quote form)
  assets/img/           Photos, logo, icons, social share image
  assets/video/         Background video loops
  _headers              Caching + security headers (Cloudflare Pages)
  sitemap.xml, robots.txt, 404.html
```

No build step — plain HTML/CSS/JS.

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `public` |
| Production branch | `main` |

Every push to `main` redeploys automatically.

## Editing

- **WhatsApp number for the quote form:** `public/assets/js/config.js` → `"whatsapp": "13055551234"` (country code, digits only).
- Text lives directly in the HTML files (EN at the root, ES in `public/es/`). Keep both languages in sync.
