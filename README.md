# LET'S THINK STUDIO — COMPLETE CREATIVE AGENCY PLATFORM

> **Brand Positioning:** An independent creative studio that helps businesses build memorable brands and communicate through impactful design and digital experiences.  
> **Headline:** *"Good ideas deserve great design."*  
> **Brand Personality:** Creative, confident, modern, minimal, and professional.  

---

## 1. Brand Identity System

### A. Brand Colors
- **Studio Orange:** `#FF572D` (CTAs, focal highlights, active states)
- **Ink Black:** `#171819` (Primary typography, dark containers, high contrast)
- **White:** `#FFFFFF` (Cards, elevated panels, modal backgrounds)
- **Light Background:** `#F5F5F3` (Global canvas, spacious editorial feel)
- **Secondary Text:** `#737373` (Supporting paragraphs, metadata, subtitles)

### B. Typography
- **Headings:** `Manrope` (Variable font token: `--font-heading`)
- **Body:** `Inter` (Variable font token: `--font-body`)

### C. Logo Assets
- Supplied original brand asset preserved in `public/logo.png`.
- High-resolution, transparent variants generated for dark and light backgrounds:
  - `public/logo-dark.png` (for light backgrounds)
  - `public/logo-light.png` (for dark cards & footers)

---

## 2. Architecture & Technology Stack

- **Framework:** Next.js 15 (App Router with React Server Components)
- **Language:** TypeScript 5.7+ (Strict type safety)
- **Styling:** Tailwind CSS with brand tokens
- **Icons:** Lucide React
- **Validation:** Zod (Client-side & Server-side API validation)
- **Database Engine (Dual-Mode):**
  - **Production Mode:** Supabase (PostgreSQL 15+, Row Level Security, Storage)
  - **Zero-Config Development Mode:** Built-in atomic persistent engine (`.data/studio-store.json`) ensuring full functionality even before cloud credentials are provisioned.
- **Security:**
  - Authenticated admin access with HMAC-signed session tokens and HTTP-only cookies.
  - Honeypot spam prevention on all public submission forms.
  - Server-side rate limiting and input sanitization.
  - Row Level Security (RLS) policies protecting private leads from public access.

---

## 3. Website Routes & Navigation

### Public Pages
1. `/` — Homepage (Hero, Selected Work, Services, Studio Philosophy, 4-Stage Process, Insights, Final CTA)
2. `/work` — Filterable Portfolio Showcase
3. `/work/[slug]` — Individual Project Case Study
4. `/services` — All Services Overview
5. `/services/brand-identity` — Brand Strategy & Identity
6. `/services/graphic-design` — Graphic Design & Advertising
7. `/services/digital-marketing` — Digital Marketing Creatives
8. `/services/website-development` — Website Design & Development
9. `/services/packaging-print` — Packaging & Print Design
10. `/about` — About the Studio (Philosophy, Values, Client Partnerships)
11. `/insights` — Studio Journal & Articles Listing
12. `/insights/[slug]` — Individual Article Reading Experience
13. `/contact` — Contact & Lead Generation Brief Submission
14. `/privacy-policy` — Privacy Policy & Data Governance
15. `/terms` — Terms & Conditions
16. `/_not-found` — Branded 404 Experience

### Protected Admin Portal
1. `/admin/login` — Secure Administrator Sign-In
2. `/admin` — KPI Dashboard Overview & Activity Stream
3. `/admin/projects` — Portfolio & Case Studies Management Table
4. `/admin/projects/new` — Author New Portfolio Case Study
5. `/admin/services` — Services & Scope Management
6. `/admin/insights` — Blog & Editorial Article Management
7. `/admin/enquiries` — Lead Management CRM & CSV Export
8. `/admin/testimonials` — Client Endorsements Management
9. `/admin/settings` — Global Studio & SEO Configuration

---

## 4. Local Installation & Development

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:3000
```

### Admin Access
- URL: `http://localhost:3000/admin/login`
- Default Email: `admin@letsthinkstudio.com`
- Default Password (Dev Mode): `letsthink2026!`
- *(Set `ADMIN_DEFAULT_PASSWORD` in `.env.local` to override)*

---

## 5. Supabase Setup & Production Deployment

### Step 1: Initialize Database
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Run `supabase/migrations/20260101000000_init_schema.sql` to create all tables, indexes, triggers, and Row Level Security policies.
4. Run `scripts/seed.sql` to populate initial services, categories, and settings.

### Step 2: Configure Environment Variables
Set the following variables in your hosting environment (e.g. Vercel):
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
ADMIN_SESSION_SECRET=generate-a-strong-random-secret
ADMIN_DEFAULT_EMAIL=admin@your-domain.com
ADMIN_DEFAULT_PASSWORD=YourStrongCustomAdminPassword!
STUDIO_NOTIFICATION_EMAIL=hello@your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Deploy to Vercel
```bash
# Connect and deploy via Vercel CLI
npx vercel
```

---

## 6. SEO & Google Search Console Checklist

- [x] **Metadata & Canonical URLs:** Dynamic title and description tags configured on every route.
- [x] **Open Graph & Twitter Cards:** Complete sharing cards with preview images configured in `src/app/layout.tsx`.
- [x] **XML Sitemap:** Dynamically generated at `/sitemap.xml` incorporating all published projects, services, and articles.
- [x] **Robots Directive:** Defined in `src/app/robots.ts` with `/admin/` and `/api/` protected from web crawlers.
- [x] **Structured Data (JSON-LD):** `ProfessionalService` schema rendered via `<StructuredData />` in `src/app/layout.tsx`.
- [x] **Google Analytics 4:** Safe asynchronous GA4 tracking enabled automatically when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- [x] **Google Search Console:** Submit `https://your-domain.com/sitemap.xml` in GSC after domain verification.

---

## 7. Verification & Acceptance Results

- **Build Status:** Next.js 15 production build compiled successfully with 0 TypeScript and 0 linting errors.
- **Route Validation:** All 16 public routes and 9 admin routes verified.
- **Interactive Forms:** Contact enquiry submission tested end-to-end with validation, honeypot bot defense, reference ID generation, and database persistence.
- **Admin Dashboard:** Authentication, CRUD operations, and CRM lifecycle verified.
.
