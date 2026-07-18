# CLAUDE.md Website Desa

## 1. Project Overview
Name: Village Information & News Portal
Description: A modern, fast, and easy-to-manage website for village news, profiles, and public information.
Goal: Provide a headless CMS architecture where village officials can easily manage content without breaking the frontend, while residents get a lightning-fast browsing experience.
Target Users: Village residents (frontend readers) and village officials (CMS administrators).
Version: v1.0.0
Status: Active development

## 2. Tech Stack
Language: TypeScript
Framework: Next.js (App Router)
Styling: Tailwind CSS
UI Library: shadcn/ui (or standard Tailwind components)
Headless CMS: Sanity.io
Data Fetching: Sanity Client / GROQ
Package Manager: npm
Deployment: Vercel (Frontend) & Sanity Cloud (Backend/Studio)

## 3. Commands
# Frontend (Next.js)
npm run dev      # Run Next.js dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter

# Backend (Sanity Studio - inside studio folder)
npm run dev      # Run Sanity Studio locally
npx sanity deploy # Deploy Sanity Studio

## 4. Project Structure
Architecture: Headless CMS (Decoupled Frontend & Backend)
[root]/
├── src/
│   ├── app/           # Next.js App Router pages (Frontend)
│   ├── components/    # Reusable UI components
│   ├── lib/           # Utility functions and Sanity client config
│   ├── types/         # TypeScript definitions
│   └── styles/        # Global CSS
├── sanity/            # Sanity Studio folder (Backend CMS)
│   ├── schemaTypes/   # Database schemas (News, Village Profile, etc.)
│   └── sanity.config.ts 
├── public/            # Static assets
└── CLAUDE.md          # AI coding guidelines

## 5. Naming Conventions
Components: PascalCase (e.g., NewsCard.tsx)
Non-components: camelCase (e.g., getSanityData.ts)
Folders/Routes: kebab-case (e.g., /berita-desa)
Interfaces/Types: PascalCase (e.g., ArticleType)

## 6. Code Conventions
- Use strict mode in TypeScript. No `any` types.
- Always use try-catch for async data fetching from Sanity.
- Prefer Next.js Server Components. Only use 'use client' when needing interactivity (hooks, event listeners).

## 7. Component Rules
1. Imports (React/Next first, then absolute imports, relative imports, types).
2. Explicitly define Props interface.
3. Keep components small. Extract to a separate file if reused.

## 8. Styling Rules
- Use Tailwind CSS utility classes directly in JSX.
- Implement mobile-first responsive design (`sm`, `md`, `lg` breakpoints) considering village residents will mostly access via smartphones.

## 9. API & Data Fetching Rules
- All data fetching from Sanity must use GROQ queries.
- Store fetching logic in `src/lib/sanity/queries.ts` or similar, do not write GROQ queries directly inside UI components.
- Use Next.js Incremental Static Regeneration (ISR) or caching to minimize Sanity API calls and maximize loading speed.

## 10. Performance Rules
- ALWAYS use Next.js `<Image>` component for images fetched from Sanity to ensure WebP/AVIF optimization.
- Avoid large client-side bundles. Keep UI heavy-lifting on the server.

## 11. Git Rules
- Commit frequently after completing a specific task or component.
- Format: `feat: [description]`, `fix: [description]`, `style: [description]`.
- DO NOT commit `.env` or `.env.local` files containing Sanity API tokens.

## 12. Features
[ ] Village Profile Page
[ ] News / Articles Listing
[ ] News Detail Page
[ ] Sanity Schema: Article
[ ] Sanity Schema: Village Profile
[ ] Sanity Webhook for Next.js On-Demand Revalidation

## 13. Do Not
- If instructions are ambiguous, ASK FIRST before coding.
- Do not create new folders outside the defined structure without asking.
- Do not use `any` in TypeScript.
- Do not expose Sanity write tokens to the client-side.
- Do not modify existing working features without explicit instructions.

## 14. Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID= # Safe for client
NEXT_PUBLIC_SANITY_DATASET=    # Safe for client
SANITY_API_TOKEN=              # SERVER ONLY - DO NOT EXPOSE