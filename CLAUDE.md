# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

**Requires Node.js 20+**

```bash
npm run dev      # Start dev server with HMR
npm run build    # TypeScript check + production build
npm run lint     # ESLint code quality checks
npm run preview  # Preview production build locally
npm run setup    # Run interactive setup wizard
```

Note: No test framework is configured. Verify changes by running `npm run build` and testing manually in the browser.

## Architecture Overview

**Stack**: React 19 + TypeScript + Vite + TanStack Router + Supabase + Tailwind CSS v4

### Key Architectural Decisions

1. **File-based Routing** (TanStack Router)
   - Routes in `src/routes/` auto-generate `src/routeTree.gen.ts` (DO NOT EDIT - auto-generated)
   - Root layout (`__root.tsx`) wraps all pages with Header/Footer
   - Auto code splitting enabled via Vite plugin

2. **Data Flow Pattern**
   ```
   UI Component → React Hook Form → Zod Validation → React Query Mutation → Supabase API
   ```

3. **i18n System**
   - Configuration in `src/i18n/index.ts`
   - Translations in `public/locales/{en,ar}/translation.json`
   - Auto-detects browser language with localStorage fallback
   - RTL automatically applied for Arabic (`dir="rtl"`)
   - **Always add keys to both EN and AR files** when adding new text

4. **Path Alias**: `@/*` maps to `./src/*`

5. **Animations**: Framer Motion for page transitions, scroll-triggered animations

6. **Icons**: All icons from `lucide-react` library

### Source Structure

- `src/routes/` - Page components (file-based routing)
- `src/components/` - Organized by purpose: layout, sections, ui
- `src/hooks/` - Custom hooks (useLanguage, useSEO)
- `src/api/` - Supabase integration layer with Zod validation
- `src/config/site.ts` - Centralized site configuration
- `src/lib/supabase.ts` - Supabase client initialization
- `src/utils/` - Utilities (cn for className merging, phoneFormat)

### Site Configuration

The `src/config/site.ts` file contains centralized configuration:

```typescript
siteConfig.name        // Brand name
siteConfig.tagline     // Tagline
siteConfig.domain      // Production URL
siteConfig.social      // Social media links
siteConfig.contact     // Contact information
siteConfig.colors      // Brand colors (must sync with globals.css)
siteConfig.nav         // Navigation items
siteConfig.footerNav   // Footer navigation sections
```

Components like Header and Footer read from this config.

**Important**: When changing brand colors, update both `src/config/site.ts` and `src/styles/globals.css` to keep them in sync.

### Adding a New Page

1. Create route at `src/routes/pagename.tsx`
2. Use the `useSEO` hook for meta tags
3. Add navigation link to `src/config/site.ts` if needed
4. Add translations to both EN and AR files
5. Update `public/sitemap.xml`

Example:

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { useSEO } from '@/hooks/useSEO'

export const Route = createFileRoute('/pagename')({
  component: PageName,
})

function PageName() {
  useSEO({
    title: 'Page Title | Brand',
    description: 'Page description',
  })

  return <main className="section">{/* content */}</main>
}
```

### Adding a New Section

1. Create component in `src/components/sections/SectionName.tsx`
2. Export from `src/components/sections/index.ts`
3. Import and use in the relevant route

### Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_HCAPTCHA_SITE_KEY=
```

For local development, use hCaptcha test key: `10000000-ffff-ffff-ffff-000000000001`

### Supabase Setup

The contact form requires this table (run in Supabase SQL Editor):

```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text,
  phone text
);

alter table contacts enable row level security;

create policy "Allow anonymous inserts"
  on contacts for insert
  to anon
  with check (true);
```

### Styling

**Tailwind CSS v4** with custom theme in `src/styles/globals.css`

Semantic color tokens:
- `bg-surface` / `bg-surface-elevated` / `bg-surface-overlay` - dark backgrounds
- `text-accent` / `bg-accent` - brand color
- `text-primary-{50-950}` - gray scale (950 = near-black)

Fonts:
- `font-sans` (Inter) - body text
- `font-display` (Outfit) - headings
- `font-arabic` (Almarai) - automatically applied in RTL mode

Custom utilities: `.btn-primary`, `.btn-secondary`, `.glass`, `.section`, `.text-gradient`, `.text-gradient-accent`

Custom animations: `fadeIn`, `slideUp`, `slideInRight`, `slideInLeft`

### SEO

- **Static SEO files**: `public/robots.txt`, `public/sitemap.xml`
- **Structured data**: JSON-LD schemas in `index.html`
- **Per-page meta**: Use `useSEO` hook - updates document.title, meta tags, Open Graph
- **i18n SEO**: Hreflang tags for EN/AR language variants
- **Note**: The `useSEO` hook in `src/hooks/useSEO.ts` has hardcoded BASE_URL and default values that should be updated for new projects

### Security

- **Input sanitization**: Zod validation in API layer
- **Bot protection**: hCaptcha integration on forms (optional)
- **Security headers**: X-Frame-Options, X-Content-Type-Options in `vercel.json`

### Form UX

- **Real-time validation**: Validates on blur, re-validates on change
- **Visual feedback**: Error states with icons and animations
- **Accessibility**: ARIA attributes, focus management

### Deployment

- **Platform**: Vercel (configured in `vercel.json`)
- **Environment variables**: Set in Vercel dashboard
- **SPA routing**: All paths rewrite to `/index.html`
