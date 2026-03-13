# Branch Comparison: `main` → `static-spa`

The `static-spa` branch converts the app from a server-rendered, database-backed application to a fully static single-page application (SPA) deployed to GitHub Pages.

---

## Overview

### Removed

- **PostgreSQL database** and Drizzle ORM (`server/db.ts`, `server/storage.ts`)
- **Express server** (`server/index.ts`, `server/routes.ts`, `server/vite.ts`, `server/static.ts`)
- **REST API endpoints** (`/api/projects`, `/api/services`, `/api/articles`, `/api/inquiries`, `/api/subscribers`)
- **Shared route definitions** (`shared/routes.ts`)
- **React Query** (`@tanstack/react-query`) and query client (`client/src/lib/queryClient.ts`)

### Added

- **Static content data** in `client/src/data/content.ts` — projects, services, and articles as plain TypeScript arrays
- **GitHub Pages deployment** with `404.html` for SPA routing and `CNAME` for custom domain
- Content hooks (`useProjects`, `useServices`, etc.) return static data directly instead of fetching from an API

### Unchanged

- All visual content (projects, services, articles) — same titles, descriptions, and images
- Site design, layout, and navigation

---

## Contact Form Submissions

### How it worked before (`main`)

The contact page rendered a form with fields for name, email, and message. On submission:

1. The form data was validated client-side using Zod (`insertInquirySchema` from `shared/routes.ts`)
2. A `useCreateInquiry` mutation (React Query) sent a `POST` request to `/api/inquiries`
3. The Express server validated the payload again server-side and stored the inquiry in PostgreSQL via Drizzle ORM (`storage.createInquiry()`)
4. The user saw a success toast: *"Thank you for your message. We will be in touch shortly."*
5. The form had a loading state (`isPending`) with "Sending..." button text and disabled state during submission
6. On failure, a destructive toast displayed the error message

All inquiries were persisted in the `inquiries` database table and could be queried or exported.

### How it works now (`static-spa`)

The contact form UI still exists with the same fields (name, email, message) and client-side Zod validation (`inquirySchema` from `shared/schema.ts`). On submission:

1. The form constructs a `mailto:` URL targeting `info@nazstudio.com.au` with pre-filled subject and body
2. `window.location.href` redirects to the mailto link, opening the user's default email client
3. A toast displays: *"Your default email client has been opened with the enquiry details."*
4. The form resets immediately — there is no loading state or error handling

No data is stored. The inquiry only exists if the user manually sends the email from their client.

### Recommendations

- **Form submission service**: Integrate a third-party form backend (e.g. Formspree, Getform, Basin) to receive and store submissions without needing a custom server. These services provide email notifications, spam filtering, and submission dashboards.
- **Serverless function**: Use a Cloudflare Worker, Vercel Edge Function, or AWS Lambda to receive form submissions and forward them via email or store them in a lightweight database (e.g. Supabase, Turso).
- **Email reliability**: The current mailto approach depends on the user having a configured email client. Mobile users and users without a desktop mail app may see no action or an error. A form backend eliminates this dependency.

---

## Newsletter Subscription

### How it worked before (`main`)

The site footer contained a newsletter signup section with:

- A heading: *"Newsletter"*
- A description: *"Subscribe to receive design inspiration and studio updates."*
- An email input field with placeholder *"Email Address"*
- A submit button: *"Join Our List"*

On submission:

1. The email was validated client-side using Zod (`insertSubscriberSchema` from `shared/routes.ts`)
2. A `useCreateSubscriber` mutation sent a `POST` request to `/api/subscribers`
3. The Express server validated the payload and stored the subscriber email in PostgreSQL via Drizzle ORM (`storage.createSubscriber()`)
4. The user saw a success toast: *"Thank you for joining our mailing list."*
5. The form had a loading state with "Subscribing..." button text
6. On failure, a destructive toast displayed a generic error

All subscriber emails were persisted in the `subscribers` database table. The footer used a 3-column grid layout to accommodate the newsletter section.

### How it works now (`static-spa`)

The newsletter section is **completely removed** from the footer. The footer grid changed from 3 columns to 2 columns (brand + navigation only). There is no way for users to subscribe to updates anywhere on the site.

### Recommendations

- **Email marketing platform**: Use Mailchimp, ConvertKit, Buttondown, or Brevo (formerly Sendinblue). These provide embeddable signup forms, subscriber management, email campaigns, and analytics — all without a custom backend.
- **Embedded form approach**: Most email platforms provide an HTML embed or JavaScript widget that can be dropped directly into the static footer component. This restores the original UX with zero server infrastructure.
- **Simple collection alternative**: If campaigns aren't needed yet, a form backend service (same as contact form) can collect emails into a spreadsheet or webhook for later import into a marketing tool.
