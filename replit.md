# Naz Studio - Interior Design Portfolio

## Overview

A luxury interior design studio portfolio website built as a static single-page application (SPA) deployed to GitHub Pages. The application showcases design projects, services, and press articles. The design emphasizes elegance with serif typography, minimal color palette, and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom luxury design tokens (CSS variables for theming)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll reveals and page transitions
- **Form Handling**: React Hook Form with Zod schema validation
- **Build Tool**: Vite with React plugin

### Data Layer
- **Static content**: All portfolio data (projects, services, articles) lives in `client/src/data/content.ts` as plain TypeScript arrays
- **Type definitions**: `shared/schema.ts` contains TypeScript types and Zod validation schemas
- **Content hooks**: `client/src/hooks/use-content.ts` provides `useProjects`, `useServices`, etc. that return static data directly

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    data/         # Static content data (content.ts)
    pages/        # Route page components
    hooks/        # Custom React hooks (content, mobile, toast)
    lib/          # Utilities
shared/           # Shared code
  schema.ts       # TypeScript types and Zod validation schemas
```

### Contact Form
The contact form validates input client-side with Zod and opens the user's default email client via a `mailto:` link to `info@nazstudio.com.au`.

### Development vs Production
- **Development**: `npm run dev` starts Vite dev server on port 5173
- **Production**: `npm run build` outputs static files to `dist/public`, deployed to GitHub Pages

## External Dependencies

### Frontend Libraries
- Radix UI primitives for accessible component foundations
- Embla Carousel for project image galleries
- Lucide React for icons
- date-fns for date formatting

### Deployment
- GitHub Pages with `404.html` for SPA routing
- Custom domain via CNAME
