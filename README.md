# IFEOLUWA — Personal Brand Website

**Grow with Ifeoluwa · Raising Global Leaders**
Building People. Strengthening Businesses. Creating Lasting Value.

Static, dependency-free website built with **HTML5, CSS3 and vanilla JavaScript (ES6)**.
No frameworks, no build step, no bundler.

---

## 1. Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — 14 sections covering the full professional identity |
| `about.html` | Biography, philosophy, values, vision/mission, credentials |
| `expertise.html` | Services in 4 groups (A–D), each with problem / value / engagement / deliverables |
| `mindshift.html` | Thought-leadership publication: 6 pillars, featured, videos, filtered articles, questions, newsletter |
| `speaking.html` | Speaker portfolio + event organiser enquiry form |
| `insights.html` | Article library with category filters and search |
| `books.html` | Books &amp; publications — interactive bookshelf, working titles, orders and release list |
| `article.html` | Article reading experience: TOC, reading progress, sharing, related |
| `case-studies.html` | Case study library (clearly labelled examples) |
| `consulting.html` | Adspire Digital — engagement types, process, FAQ |
| `contact.html` | Six enquiry pathways + validated enquiry form |
| `privacy.html` | Privacy notice draft |

## 2. Folder structure

```
ifeoluwa-website/
├── index.html … contact.html, privacy.html
├── css/
│   ├── style.css        # design system, components, page layouts, responsive rules
│   └── animations.css   # reveal, stagger, keyframes, reduced-motion guards
├── js/
│   ├── config.js        # ← EVERYTHING EDITABLE LIVES HERE
│   └── main.js          # nav, footer, reveals, framework, filters, forms, cursor, progress
├── assets/              # drop portraits, icons, documents here
├── robots.txt
├── sitemap.xml
└── README.md
```

## 3. Local development

No build required. Because the site loads CSS/JS with relative paths, open it through any static server:

```bash
# Python
python3 -m http.server 8000
# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## 4. Deployment (Vercel — domain `sundayifeoluwa.vercel.app`)

1. Push this folder to a Git repository.
2. Import it in Vercel → **Framework Preset: Other** (no build command, output directory `./*`).
3. Add the custom domain under *Project → Settings → Domains*, and point DNS to Vercel.
4. `robots.txt` and `sitemap.xml` already reference `https://sundayifeoluwa.vercel.app`.
   Update the domain in **all** `canonical`, Open Graph, JSON-LD and sitemap URLs if the domain changes.

Any static host works (Netlify, Cloudflare Pages, GitHub Pages) — the site is plain static files.

## 5. Editing content

**Text, email, socials, downloads** → `js/config.js`

```js
email: "hello@yourdomain.com",
whatsapp: "2348000000000",          // empty = hidden
social: { linkedin: "https://…", instagram: "", youtube: "" },
profilePdf: "assets/documents/ifeoluwa-profile.pdf",
contactEndpoint: "",                // see §6
```

**Colour & type** → top of `css/style.css` (`:root` custom properties).
**Images** → replace `<img src="…">` in the relevant page; keep the `alt` text descriptive.

## 6. Connecting the contact form (required before launch)

The forms validate fully in the browser but **do not send anything** while
`contactEndpoint` is empty — the UI states this honestly in the success box.

To go live:

1. Create a server endpoint (Vercel Function, Cloudflare Worker, or a form service such as Formspree/Basin/Resend).
2. It must **validate every field server-side** (name, email format, required fields, consent) and rate-limit.
3. Never put API keys in `js/config.js` — keys belong in server environment variables.
4. Set the value:

```js
contactEndpoint: "https://sundayifeoluwa.vercel.app/api/contact",
newsletterEndpoint: "https://sundayifeoluwa.vercel.app/api/subscribe",
```

The front end then POSTs JSON and shows loading / success / error states automatically.

Spam protection already present: hidden **honeypot** field, client-side validation, and
`required` consent. Add server-side rate limiting and (optionally) a Turnstile/CAPTCHA challenge at the endpoint.

## 7. Content still required before launch

Marked in the pages as *“awaiting verified content”* — deliberately not invented:

- Professional **portrait** for the hero plate and About page
- **Biography facts**: education, qualifications, certifications, dates, roles
- **Verified engagements**: speaking events, clients, projects, testimonials (written consent)
- **Case study metrics** with documentation
- Real **video** links for the showreel and MindShift sessions
- Real **article** copy to replace the entries labelled *Demonstration content*
- Live **email, WhatsApp and social URLs**
- Professional **profile PDF**

## 8. Quality & accessibility notes

- Semantic HTML5, single `h1` per page, labelled forms, `aria-current` on active nav.
- Full keyboard support: skip link, focus-visible outlines, Esc closes the mobile menu.
- `prefers-reduced-motion` disables all non-essential animation.
- Responsive from 320 px → 1920 px; mobile menu becomes an animated drawer under 1000 px.
- Images use explicit `width`/`height`, `loading="lazy"` and `decoding="async"` below the fold to limit layout shift.
- Fonts are preconnected and loaded with `display=swap`.

## 9. SEO

Unique title + meta description, canonical URL, Open Graph, Twitter card and Schema.org
(`Person`, `ProfessionalService`, `Article`, `Periodical`, `ContactPage`) on every page.
No ratings, reviews, awards or credentials appear in structured data.
