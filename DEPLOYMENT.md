# Deployment Guide

This guide details how to migrate the project's database to a cloud-hosted PostgreSQL database and deploy the Next.js application to Vercel.

---

## Step 1: Provision a Free Relational Database (PostgreSQL)

We recommend using **Neon** or **Supabase** because they provide fully-managed PostgreSQL databases with generous free tiers.

### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech) and sign up for a free account.
2. Create a new project.
3. Once created, copy the **Connection string** from the Neon dashboard. It will look like this:
   ```env
   postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com) and sign up.
2. Create a new project and set a database password.
3. Go to **Project Settings &rarr; Database &rarr; Connection String**.
4. Copy the **URI** connection string. It will look like this:
   ```env
   postgresql://postgres.username:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

---

## Step 2: Configure Environment Variables

Update your local `.env` file (or create it if it doesn't exist) to replace the SQLite string with your new PostgreSQL string:

```env
DATABASE_URL="YOUR_POSTGRESQL_CONNECTION_STRING"
ADMIN_PASSWORD="your-secure-admin-passcode"
```

---

## Step 3: Initialize the Cloud Database

Push the database schema models and insert the seed projects/blog posts into your new cloud database:

```bash
# 1. Push your Prisma schema models directly to your PostgreSQL database
npx prisma db push

# 2. Run the seed script to populate projects and blog posts
npx tsx prisma/seed.ts
```

---

## Step 4: Deploy the Web Application to Vercel

Vercel provides free, high-performance hosting for Next.js applications and handles routing, Server Actions, and Middleware automatically.

### A. Push Code to GitHub
Follow the Git steps to put your project on GitHub:
```bash
git init
git add .
git commit -m "Configure PostgreSQL and deployment settings"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### B. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New &rarr; Project**.
3. Import your `portanti` repository.
4. Expand the **Environment Variables** section and add the following keys:
   - `DATABASE_URL`: Add your PostgreSQL connection string.
   - `ADMIN_PASSWORD`: Add your admin passcode (e.g. `admin`).
5. Click **Deploy**.

Vercel will build the frontend, optimize static pages, bundle your Server Actions into API routes, and deploy the application.

---

## Database Management & Schema Migrations

If you make modifications to `prisma/schema.prisma` in the future:
1. Re-generate the client locally: `npx prisma generate`
2. Push changes to the database: `npx prisma db push`
3. Commit and push the code updates to GitHub: `git push` (Vercel will trigger a rebuild automatically).
