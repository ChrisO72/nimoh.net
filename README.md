# Astro template

Static Astro pages, Tailwind CSS, a React blog filter, and Pages CMS. Requires Node.js 24+ and npm.

## Template structure

```text
├── .github/workflows/deploy.yml # Pages CMS → Cloudflare deployment
├── .pages.yml                 # CMS editors, actions, reusable fields, uploads
├── astro.config.mjs           # React integration + Tailwind Vite plugin
├── public/
│   ├── favicon.svg            # Site icon
│   └── uploads/               # CMS images → /uploads/...
├── src/
│   ├── components/            # Header, footer, intro, grids, post list
│   │   └── BlogFilter.tsx     # React island; hydrated only on /blog
│   ├── content/blog/          # Markdown posts; filename = URL slug
│   ├── content.config.ts      # Blog collection + frontmatter schema
│   ├── data/
│   │   ├── home.json          # Home sections + metadata
│   │   ├── blog.json          # Blog intro + filter labels + metadata
│   │   └── site.json          # Site name, navigation, footer, shared labels
│   ├── layouts/Layout.astro   # Document head + shared page shell
│   ├── lib/posts.ts           # Published posts, ordering, dates, summaries
│   ├── pages/
│   │   ├── index.astro        # /
│   │   └── blog/
│   │       ├── index.astro     # /blog
│   │       └── [...slug].astro # /blog/<filename>
│   └── styles/global.css      # Tailwind + Markdown styles
└── wrangler.jsonc             # Cloudflare Worker static assets
```

## Commands

```sh
npm install                    # Install dependencies
npm run dev -- --background    # Start the background dev server
npm run astro -- dev status    # Check server status
npm run astro -- dev logs      # Read server logs
npm run astro -- dev stop      # Stop the server
npm run check                  # Astro + TypeScript diagnostics
npm run build                  # Generate the static site in dist/
npm run preview                # Preview the build locally
```

## Content editing

Push this repository to GitHub, sign in to [Pages CMS](https://app.pagescms.org), authorize the repository, and select its branch. The root `.pages.yml` defines the editors and deployment actions. CMS saves content to GitHub; use **Deploy preview** to update the stable Cloudflare preview or **Deploy** to update production.

Edit page content under **Home** and **Blog page**; edit shared content under **Site settings**. Layout and section order stay in Astro. Highlight items can be added, removed, or reordered within their section.

Create posts under **Blog posts**. Use a lowercase, hyphenated `.md` filename. Titles can change without changing URLs. Drafts are excluded everywhere; publication dates sort posts, with the latest two shown on Home. The body editor saves Markdown and uploads images to `public/uploads`.

To add an editable page, for example `/contact`:

1. Create `src/data/contact.json` with the page content and metadata.
2. Create `src/pages/contact.astro`; import the new data and add the page sections.
3. Add a matching entry in `.pages.yml`; set a unique `name`, label, path, and fields matching the JSON.
4. Add the link in `src/data/site.json`. Keep CMS fields and component props aligned when changing content shapes.

## Cloudflare deployment

1. Give `name` in `wrangler.jsonc` a unique lowercase, hyphenated Worker name.
2. In Cloudflare, create an API token from the **Edit Cloudflare Workers** template and restrict it to the deployment account.
3. In GitHub, open **Settings → Secrets and variables → Actions** and add both `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as repository secrets.
4. Run **Deploy** once, then attach the client's domain under the Worker's **Settings → Domains & Routes** in Cloudflare.

**Deploy preview** updates `preview-<worker-name>.<account-subdomain>.workers.dev` without changing production. Deployment actions require a GitHub user with repository access.

References: [Astro](https://docs.astro.build) · [React integration](https://docs.astro.build/en/guides/integrations-guide/react/) · [React](https://react.dev/learn/add-react-to-an-existing-project) · [Tailwind](https://tailwindcss.com/docs/installation/framework-guides/astro) · [Pages CMS](https://pagescms.org/docs/configuration/) · [Pages CMS actions](https://pagescms.org/docs/configuration/actions/) · [Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/) · [Cloudflare GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/) · [Astro examples](https://github.com/withastro/astro/tree/main/examples)
