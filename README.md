# CareerCVPro - South Africa's Career Platform

A Next.js 16 website for South African job seekers, featuring job listings, career tips, free resources, and professional CV services.

## Features

- 🇿🇦 South Africa-focused job listings
- 📝 Career tips and guides
- 📄 Free CV and cover letter samples
- ✨ Professional CV writing services
- 🔍 SEO optimized for South African job searches
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **UI Components:** Custom components with Lucide icons
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/
│   ├── page.tsx                    # Home page
│   ├── jobs/                       # Job listings
│   │   ├── by-province/
│   │   └── by-category/
│   ├── career-tips/               # Career guides
│   │   ├── cv-guides/
│   │   ├── interview-guides/
│   │   ├── job-search-guides/
│   │   └── workplace-guides/
│   ├── free-resources/            # Free downloads
│   │   ├── cv-samples/
│   │   ├── cover-letter-samples/
│   │   ├── interview-questions/
│   │   └── career-checklists/
│   ├── cv-services/               # Paid services
│   │   ├── cv-revamp/
│   │   ├── cv-writing/
│   │   ├── cover-letter-writing/
│   │   └── order/
│   ├── about/
│   ├── contact/
│   ├── privacy-policy/
│   ├── terms-and-conditions/
│   ├── disclaimer/
│   └── cookie-policy/
├── components/
│   └── layout/
│       ├── Header.tsx             # Main navigation
│       └── Footer.tsx
└── lib/
    └── utils.ts                   # Utility functions
```

## Brand Colors

- **Teal (Primary):** #0d9488
- **Navy:** #1e3a5f
- **Gold (Accent):** #f59e0b

## License

All rights reserved.
