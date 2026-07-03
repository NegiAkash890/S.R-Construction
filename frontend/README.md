# S.R. Construction Frontend (Next.js)

This is the Next.js user-facing website for **S.R. Construction**, built using Next.js 15 (App Router), React, and custom styling.

## Key Features

- **Next.js App Router**: Optimized rendering, dynamic paths (e.g. `[slug]`), and routing.
- **Top Loading Indicator**: Custom styled top progress bar using `nextjs-toploader`.
- **Sanity Client Integration**: Fetches navigation structure, team, projects, news, and site settings directly from Sanity CMS.
- **Google Analytics 4 (GA-4)**: Robust analytics tracking using `@next/third-parties/google`.

---

## Analytics Integration (GA-4)

The application tracks visitor analytics using Google Analytics 4.

### 1. Configuration
Define your Measurement ID in [.env.local](file:///Users/akash/Desktop/projects/S.R-Construction/frontend/.env.local):
```env
NEXT_PUBLIC_GA_ID=G-E2ZGEBW3SR
```
The analytics tracker is conditionally initialized. If `NEXT_PUBLIC_GA_ID` is omitted or empty, no analytics scripts are loaded, preventing console errors in clean local or preview builds.

### 2. Custom Events Tracked
We track lead conversion interactions on the following components:
- **Enquiry Form** ([EnquiryForm](file:///Users/akash/Desktop/projects/S.R-Construction/frontend/components/EnquiryForm/index.tsx)): Logs `enquiry_form_submit` with parameter `project_type`.
- **Enquiry Modal** ([EnquiryModal](file:///Users/akash/Desktop/projects/S.R-Construction/frontend/components/EnquiryModal/index.tsx)): Logs `enquiry_modal_submit` with parameter `project_type`.

---

## Getting Started

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build and Compilation

To verify TypeScript and check for warnings before deploying, run:
```bash
npm run build
```

---

## Deployment

Deployments are hosted on **Vercel** (`s-r-construction`).
- **Production Branches**: Any merge/push to `main` branch triggers an automatic production build.
- **Environment Variables**: Add `NEXT_PUBLIC_GA_ID` in your Vercel Project Settings > Environment Variables for the Production environment.
