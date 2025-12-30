# Naz Studio - Interior Design Portfolio

## Overview

A luxury interior design studio portfolio website built with React frontend and Express backend. The application showcases design projects, services, press articles, and handles client inquiries and newsletter subscriptions. The design emphasizes elegance with serif typography, minimal color palette, and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with custom luxury design tokens (CSS variables for theming)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll reveals and page transitions
- **Form Handling**: React Hook Form with Zod schema validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Design**: REST endpoints defined in shared routes file with Zod validation schemas
- **Build System**: Vite for frontend, esbuild for server bundling

### Data Layer
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: projects, services, articles, inquiries, subscribers
- **Migrations**: Drizzle Kit manages schema changes (`npm run db:push`)

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks for data fetching
    lib/          # Utilities and query client config
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

### Development vs Production
- **Development**: Vite dev server with HMR, serves frontend through Express middleware
- **Production**: Frontend built to `dist/public`, server bundled with esbuild to `dist/index.cjs`

## External Dependencies

### Database
- PostgreSQL database required (provision through Replit or set DATABASE_URL)
- Drizzle ORM handles queries and schema management

### Frontend Libraries
- Radix UI primitives for accessible component foundations
- Embla Carousel for project image galleries
- Lucide React for icons
- date-fns for date formatting

### Build Tools
- Vite with React plugin for frontend bundling
- esbuild for server-side bundling
- TypeScript for type checking across the codebase

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` for development error display
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for Replit integration (dev only)