# Dagm Ayalew - Senior Mobile App Developer Portfolio V2 & CMS

A high-performance, dynamic portfolio, dedicated case study platform, ATS CV generator, and administrative command center built for **Dagmay Ayalew** (Senior Mobile App Developer & Full-Stack Engineer).

---

## Key Features (Portfolio V2)

1. **Senior Mobile Developer Positioning**:
   - Tailored specifically for **React Native, TypeScript, Mobile Architecture, and Flutter**.
   - Clean, premium, product-engineering visual aesthetic with generous whitespace and clear visual hierarchy.

2. **Realistic Interactive Phone Simulator**:
   - Hardware-rendered iPhone 16 Pro chassis with interactive Dynamic Island and physical controls.
   - 3 live app simulators: **Dashen Super App (FinTech)**, **Ethio Post Agent Banking (Agency Banking)**, and **Order Ethiopia (E-Commerce & GPS Delivery)**.

3. **Dedicated 8-Section Case Studies (`/projects/[slug]`)**:
   - SEO-optimized, shareable static case study routes for major production apps.
   - Structured 8-section breakdown: *Overview & Metrics, Role, Challenge, Solution, Architecture Decisions, Results, Mockups, and Key Takeaways*.

4. **Core Capabilities & Engineering Principles**:
   - 6-pillar Mobile Engineering impact grid (`ImpactSection`).
   - Categorized technical stack chips without arbitrary percentage bars (`SkillsMatrix`).
   - Production-first engineering philosophy and standards (`EngineeringApproach`).

5. **Dynamic CV & 1-Click ATS PDF Generator (`/cv`)**:
   - Modern Dark and Classic ATS (Paper White) resume layouts.
   - 1-click printable & downloadable PDF reflecting live database entries.

6. **Day-to-Day Life Hub (`/now`) & Dedicated Contact Page (`/contact`)**:
   - Real-time pulse message and micro-blog dev logs.
   - 4 direct contact cards (Email, Phone/Telegram, Timezone UTC+3, Availability) with validated inquiry form.

7. **Full Admin CMS Suite (`/admin`)**:
   - Full CRUD over Mobile Projects, Case Studies, Work History, Education, Skills, and Life Logs.
   - Inbound Contact Messages inbox with instant `mailto:` reply.
   - Phone Mockup Studio and Theme Customizer.

8. **PostgreSQL Database via Prisma ORM**:
   - Connection pooling support with resilient fallback layer for 100% uptime.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your PostgreSQL and authentication credentials:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
AUTH_SECRET="your-32-character-secret"
AUTH_GITHUB_ID="your_github_oauth_client_id"
AUTH_GITHUB_SECRET="your_github_oauth_client_secret"
ADMIN_GITHUB_USERNAME="dagmayalew"
ADMIN_EMAIL="dagmayalew@gmail.com"
```

### 3. Push Schema to Database
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio and [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Database & ORM**: PostgreSQL + Prisma ORM
- **Authentication**: Auth.js (NextAuth v5)
- **Styling**: Tailwind CSS + CSS Variables + Glassmorphism
- **Icons**: Lucide React
- **Case Studies**: Dynamic SSG + ISR (`revalidate = 3600`)
