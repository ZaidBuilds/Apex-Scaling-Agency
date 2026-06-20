# 🪐 Apex Scaling — Premium Design & Development Agency

Apex Scaling is a high-end, Awwwards-inspired Web3 digital agency website. Designed with a sleek dark aesthetic, fluid interactive animations, and procedural 3D geometries, it acts as a conversion-focused platform for premium digital services.

**Live Website**: [https://apex-scaling-agency.vercel.app](https://apex-scaling-agency.vercel.app)
**Booking Link**: [Book a 30-Minute Consultation on Calendly](https://calendly.com/collab-zaidbuilds/30min)

---

## ✨ Features & Interactive Elements

*   **Fluid Liquid Splash Cursor**: Integrated GPU-accelerated interactive fluid simulation mapping colorful physical ripples to cursor movements (`SplashCursor`).
*   **Procedural 3D Helix Background**: Dynamic scroll-linked and mouse-responsive 3D metallic torus knots rendering in real-time (`Hero3DCanvas` via Three.js & React Three Fiber).
*   **GSAP Word-Trigger Scroll Animations**: Smooth editorial-style typography fading and lighting up word-by-word on scroll (`AboutAgency`).
*   **Interactive Capabilities Grid**: Premium 3D-tilt glassmorphism service cards detailing high-ticket offerings (Website Building, SaaS & Mobile Apps, Paid Ads & Funnels, Digital Marketing).
*   **Lead Capture & Notion CRM Integration**: Automated client inquiries syncing directly with a Notion Database and triggering email routing via Resend.
*   **Precision Navigation & Footer**: Floating glass pill navigation bar and a copy-to-clipboard email widget featuring hover scaling and a custom tooltip.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16 (App Router) & React 19
*   **Styling**: Tailwind CSS & Vanilla CSS
*   **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
*   **Animations**: GSAP (GreenSock), ScrollTrigger, Framer Motion
*   **Integrations**: Notion Client SDK (CRM Sync), Resend (Email Automation)
*   **Icons**: Lucide React

---

## 📂 Project Architecture

```filepath
├── app/
│   ├── api/
│   │   └── lead/              # API Route for lead capture & CRM/Email sync
│   ├── globals.css            # Global CSS variables, scrollbars & glass styling
│   ├── layout.tsx             # Root Layout with Instrument Serif font mapping
│   └── page.tsx               # Main landing page assembling all agency sections
├── components/
│   ├── ui/                    # Shacdn/custom primitives (Button, Slider, etc.)
│   ├── AboutAgency.tsx        # GSAP text scroll section
│   ├── Capabilities.tsx       # 3D Tilt capabilities service cards
│   ├── ClientsGrid.tsx        # Client trust list & tech stack bento
│   ├── Footer.tsx             # Copy-email widget & brand details
│   ├── Hero3DCanvas.tsx       # Three.js procedurally rotating torus knots
│   ├── HeroMarketing3D.tsx    # Hero titles & Calendly booking actions
│   ├── Navbar.tsx             # Floating glass pill navbar
│   └── SplashCursor.tsx       # Liquid fluid simulation cursor script
├── lib/
│   ├── hooks/
│   │   └── use3DTilt.ts       # Reusable hook for mouse-tilt card animations
│   └── notion.ts              # Notion CRM client interface
```

---

## ⚙️ Local Development Setup

### Prerequisites

Ensure you have **Node.js 18+** installed.

### 1. Clone & Install

```bash
git clone https://github.com/ZaidBuilds/Apex-Scaling-Agency.git
cd Apex-Scaling-Agency
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Notion CRM Integration
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

# Email Integration (Resend)
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=collab.zaidbuilds@gmail.com
SENDER_EMAIL=leads@apexscaling.co
```

### 3. Run Development Server

```bash
npm run dev
```

The site will be running locally at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🚀 Deployment

The project is structured to deploy natively on **Vercel**:

```bash
# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

---

## 📄 License

This project is private and proprietary to Apex Scaling. All rights reserved.
