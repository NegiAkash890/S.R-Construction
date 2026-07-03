# S.R. Construction Workspace

This repository houses the code for the **S.R. Construction** website, featuring a headless content management architecture.

## Repository Structure

The project is split into two primary folders:

1. **Root Directory (Sanity Studio CMS)**:
   - Built with Sanity.io.
   - Manages site content, pages, navigation menus, and media.
   - Run `npm run dev` to start the CMS Studio locally on [http://localhost:3333](http://localhost:3333).

2. **[frontend/](file:///Users/akash/Desktop/projects/S.R-Construction/frontend)**:
   - Built with Next.js (App Router, v15), React, and custom styling.
   - Features dynamic routing, client-side enquiry handling, top loader indicators, and pre-rendering optimization.
   - Integrated with Google Analytics 4 (GA-4) tracking.

---

## Getting Started

### Local Development

1. **Install Root Dependencies**:
   ```bash
   npm install
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Run Both CMS & Frontend Concurrently**:
   To run both development servers concurrently, use the helper script from the root directory:
   ```bash
   npm run dev:all
   ```
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **CMS Studio**: [http://localhost:3333](http://localhost:3333)

---

## Deployment

### 1. CMS (Sanity Studio)
Deploy changes to the Sanity-hosted Studio using:
```bash
npm run deploy
```

### 2. Frontend (Next.js)
The frontend is hosted on **Vercel** (`s-r-construction`).
- Pushing to the `main` branch on GitHub (`origin/main`) automatically triggers a production deployment via the Vercel-GitHub integration.
- Environment variables (like `NEXT_PUBLIC_GA_ID`) should be configured in the Vercel dashboard.
