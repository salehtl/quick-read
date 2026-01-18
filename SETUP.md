# Setup Guide

Welcome to the SOUO Stack Template! This guide will help you set up your new project.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 20+** installed
- **Supabase account** (free tier works) - [supabase.com](https://supabase.com)
- **hCaptcha account** (optional, for form protection) - [hcaptcha.com](https://www.hcaptcha.com)
- **Vercel account** (for deployment) - [vercel.com](https://vercel.com)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the interactive setup wizard
npm run setup

# 3. Configure your environment
cp .env.example .env
# Edit .env with your Supabase and hCaptcha keys

# 4. Start development
npm run dev
```

## Environment Variables

Create a `.env` file with the following:

```env
# Supabase (get from your project settings)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# hCaptcha (optional, for form protection)
VITE_HCAPTCHA_SITE_KEY=your-site-key
```

### Getting Supabase Keys

1. Go to [supabase.com](https://supabase.com) and create a project
2. Navigate to Settings > API
3. Copy the Project URL and `anon` public key

### Getting hCaptcha Keys

1. Go to [hcaptcha.com](https://www.hcaptcha.com) and sign up
2. Add your site
3. Copy the Site Key (use `10000000-ffff-ffff-ffff-000000000001` for testing)

## Supabase Setup

### Create Contact Form Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create contacts table
create table contacts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text,
  phone text
);

-- Enable Row Level Security
alter table contacts enable row level security;

-- Policy: Allow inserts from anonymous users
create policy "Allow anonymous inserts"
  on contacts for insert
  to anon
  with check (true);
```

### (Optional) Email Notifications

To receive email notifications when someone submits the contact form, you can set up a Supabase Edge Function. See `supabase/functions/notify-contact/` for a template.

## Customization

### Brand Colors

Colors are defined in two places (keep them in sync):

1. **CSS Variables** - `src/styles/globals.css`
   ```css
   --color-accent: #3b82f6;
   --color-accent-light: #60a5fa;
   --color-accent-dark: #2563eb;
   ```

2. **Site Config** - `src/config/site.ts`
   ```typescript
   colors: {
     accent: '#3b82f6',
     accentLight: '#60a5fa',
     accentDark: '#2563eb',
   }
   ```

The setup wizard updates both automatically.

### Navigation

Edit `src/config/site.ts` to add/remove navigation items:

```typescript
nav: [
  { key: 'home', href: '/' },
  { key: 'about', href: '#about' },
  { key: 'features', href: '#features' },
  { key: 'contact', href: '#contact' },
],
```

Add corresponding translation keys in `public/locales/{en,ar}/translation.json`.

### Translations

This template supports English and Arabic with RTL. Translation files are in:

- `public/locales/en/translation.json`
- `public/locales/ar/translation.json`

To add a new language:

1. Create `public/locales/{lang}/translation.json`
2. Update `src/i18n.ts` to include the new language

### Adding Pages

1. Create a new file in `src/routes/`, e.g., `src/routes/about.tsx`
2. The router will automatically pick it up (file-based routing)
3. Update `public/sitemap.xml` to include the new page

Example route file:

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { useSEO } from '@/hooks/useSEO'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  useSEO({
    title: 'About Us | Your Brand',
    description: 'Learn more about our story',
  })

  return (
    <main className="section">
      <h1>About Us</h1>
    </main>
  )
}
```

## Meta Assets

Before launch, add your brand assets. See `public/meta-templates/SIZES.md` for required sizes:

- `public/meta-media/favicon.svg` - Favicon
- `public/meta-media/apple-touch-icon.png` - iOS icon (180x180)
- `public/meta-media/og-image.png` - Social sharing (1200x630)
- `public/meta-media/twitter-card.png` - Twitter (1200x600)
- `public/logo.svg` - Site logo

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` file is already configured with:
- Security headers
- SPA routing rewrites
- Cache settings

### Manual Build

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run setup` | Run setup wizard |

## Project Structure

```
src/
├── api/              # API layer (Supabase calls)
├── components/
│   ├── layout/       # Header, Footer, LanguageSwitcher
│   ├── sections/     # Page sections (Hero, Features, etc.)
│   └── ui/           # Reusable UI components
├── config/
│   └── site.ts       # Centralized site configuration
├── hooks/            # Custom React hooks
├── lib/              # Third-party library setup
├── routes/           # File-based routes (TanStack Router)
├── styles/           # Global styles and Tailwind theme
└── utils/            # Utility functions
```

## Need Help?

- **TanStack Router**: [tanstack.com/router](https://tanstack.com/router)
- **Tailwind CSS v4**: [tailwindcss.com](https://tailwindcss.com)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)
- **i18next**: [i18next.com](https://www.i18next.com/)
