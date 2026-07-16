# Macad Photography

The macadphotography.com website — a fast, free static site built with
[Hugo](https://gohugo.io) and hosted on GitHub Pages. This replaces the old
Squarespace site (no more annual fee).

---

## The 3 things you'll actually do

### 1. Add photos to a gallery

Each gallery is a folder under `content/`:

| Gallery   | Folder                 |
|-----------|------------------------|
| Wedding   | `content/wedding/`     |
| Street    | `content/street/`      |
| Travel    | `content/travel/`      |
| Food      | `content/food/`        |
| SG50      | `content/sg50/`        |
| Portraits | `content/portraits/`   |

To add photos: **drop your `.jpg` files into the folder.** They appear in the
gallery automatically, sorted by filename. Name them `01.jpg`, `02.jpg`, … to
control the order. Upload full-resolution images — Hugo makes the fast
thumbnails and web-sized versions for you.

The grey gradient placeholders shipped with the site are just there so the
layout is visible. Delete them once you add your own.

### 2. Publish a photo essay

1. Make a new folder: `content/essays/my-essay-name/`
2. Inside it, add an `index.md` file (copy the sample essay as a starting point).
3. Drop the essay's photos into the same folder.
4. Reference photos in the text with `![caption](filename.jpg "Optional title")`.

Front matter at the top of `index.md`:

```yaml
---
title: "My Essay Title"
date: 2026-07-16
summary: "One or two sentences shown on the essays list."
cover: "01.jpg"   # which image to use as the card thumbnail
---
```

See `content/essays/a-morning-in-the-city/` for a working example.

### 3. Edit page text

The wording on About, Gear, Packages, Contact, etc. lives in plain Markdown
files in `content/` (`about.md`, `gear.md`, `packages.md`, `contact.md`). Edit
the text, save, publish.

---

## Publishing (making changes go live)

Every change is published by committing to the `main` branch on GitHub. The
included GitHub Actions workflow (`.github/workflows/deploy.yml`) rebuilds the
site and deploys it automatically — usually live within a minute or two.

```bash
git add .
git commit -m "Add new wedding photos"
git push
```

---

## Preview locally (optional)

Install Hugo **extended**, then from this folder run:

```bash
hugo server
```

Open <http://localhost:1313>. The preview reloads as you edit.

---

## Going live on macadphotography.com

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Under **Custom domain**, enter `macadphotography.com` and save, then tick
   **Enforce HTTPS** (may take a few minutes to become available).
4. At your domain registrar, set DNS:
   - Four apex `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - (Optional) four `AAAA` records → `2606:50c0:8000::153`,
     `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - A `CNAME` for `www` → `<your-github-username>.github.io`
   - Confirm these against GitHub's current docs:
     <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
5. Wait for DNS to propagate, confirm the site loads over HTTPS on the domain.
6. **Only then** cancel Squarespace.

---

## Site structure

```
content/            all pages & galleries (your words and photos)
layouts/            HTML templates (the design)
assets/css|js/      styling and the gallery lightbox
static/CNAME        the custom domain
hugo.toml           config, navigation menu, contact details, social links
```

Contact details, social links, and the tagline live in `hugo.toml` under
`[params]` and `[menus]` — edit there to change them site-wide.
