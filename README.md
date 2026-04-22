# Krishay Gahlaut — Portfolio

Premium 3D portfolio built with Next.js, React Three Fiber, and Framer Motion.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — scroll animations, page transitions
- **React Three Fiber + Drei** — 3D hero orb, interactive skills globe, particle field

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo at vercel.com — it auto-detects Next.js.

## Customization
- Edit content in `src/lib/data.ts`
- Swap colors in `tailwind.config.ts` and `globals.css`
- Adjust 3D scenes in `src/components/3d/`

## Performance Tips
- All 3D components are lazy-loaded via `Suspense`
- `dpr={[1, 1.5]}` caps pixel ratio for performance
- Particle count kept low (180 stars, 80 orb particles)
- `once: true` on all scroll animations
