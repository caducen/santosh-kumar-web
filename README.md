# Santosh Kumar - Next.js 14 Project

A modern Next.js 14 project with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript enabled
- ✅ Tailwind CSS configured
- ✅ shadcn/ui components (button, card, form, input, label)
- ✅ Framer Motion for animations
- ✅ React Hook Form + Zod for form handling
- ✅ Custom color palette:
  - Primary: #1E40AF (blue)
  - Secondary: #7C3AED (purple)
  - Accent: #F59E0B (gold)
- ✅ Custom fonts:
  - Inter (body text)
  - Plus Jakarta Sans (headings)

## Project Structure

```
/app
  /layout.tsx       # Root layout with Header & Footer
  /page.tsx         # Home page
  /globals.css      # Global styles with Tailwind

/components
  /ui               # shadcn/ui components
  /sections         # Page sections
  /layout           # Header & Footer components

/lib
  /utils.ts         # Utility functions (cn helper)

/public
  /images           # Image assets
  /videos           # Video assets
```

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Components

### shadcn/ui Components Installed
- Button
- Card
- Form (with React Hook Form integration)
- Input
- Label

### Layout Components
- Header (placeholder)
- Footer (placeholder)

## Customization

### Colors
Colors are defined in `app/globals.css` using CSS variables and can be customized in the `:root` selector.

### Fonts
Fonts are configured in `app/layout.tsx` using Next.js font optimization.

## Next Steps

1. Add your content to the Header and Footer components
2. Create sections in `/components/sections`
3. Add images to `/public/images` and videos to `/public/videos`
4. Customize the color scheme if needed
5. Build your pages!
