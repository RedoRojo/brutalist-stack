# Cristhian Victor Rojas Marquez - Software Engineer Portfolio & Blog

This repository contains the source code for the personal website, professional portfolio, and engineering blog of **Cristhian Victor Rojas Marquez**, a Full-Stack Software Engineer specializing in web applications, automated software testing/analysis, and neurotechnology applications.

The site is built with **Next.js 16**, **Prisma ORM**, and **PostgreSQL**, styled with a premium high-contrast brutalist aesthetic (clean typography, crisp borders, and bold accent colors).

---

## 🚀 Key Features

- **Technical Portfolio**: Lists engineering projects, complete with summaries, tags, source code repositories, and live deployment links.
- **Development Blog**: A technical journal for sharing write-ups, dispatches, and engineering guides.
- **Professional Resume**: A clean, print-friendly resume page showing professional experience, education, and technical profile.
- **Admin Dashboard**: A secure, authenticated management panel to easily add, edit, or delete projects and blog posts directly from the browser.
- **Brutalist Design System**: Responsive, responsive-first layout focused on content readability, Outfit/Inter typography, and subtle micro-interactions.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Database**: Neon (Cloud PostgreSQL)
- **ORM**: Prisma ORM
- **Styling**: Tailwind CSS (v4) & Vanilla CSS
- **Markdown Parsing**: Custom Markdown compiler for rich text formatting and image support in posts

---

## 💻 Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.com/) (v18+)
- [npm](https://www.npmjs.com/) or another package manager
- A PostgreSQL database instance (local or hosted, e.g., on [Neon](https://neon.tech/))

### 1. Clone the Repository

```bash
git clone https://github.com/RedoRojo/brutalist-stack.git
cd brutalist-stack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database connection string
DATABASE_URL="postgresql://username:password@host/database?sslmode=verify-full"

# Password for the Admin Panel
ADMIN_PASSWORD="your-secure-admin-password"
```

### 4. Setup the Database

Deploy the database schema using Prisma:

```bash
# Push database schema to PostgreSQL
npx prisma db push

# (Optional) Seed the database with sample projects and posts
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── admin/          # Admin Dashboard client and logic
│   │   ├── login/      # Admin password entry page
│   │   ├── actions.ts  # Next.js Server Actions for CRUD operations
│   │   └── page.tsx    # Admin Dashboard layout wrapper
│   ├── blog/           # Development Journal pages
│   │   ├── [slug]/     # Individual blog posts
│   │   └── page.tsx    # Blog posts listing
│   ├── projects/       # Projects pages
│   │   ├── [id]/       # Project detail documentation
│   │   └── page.tsx    # Projects archive list
│   ├── resume/         # Print-friendly resume
│   ├── globals.css     # Global styles and Brutalist styling tokens
│   ├── layout.tsx      # Main site layout (Header, Nav, Footer)
│   └── page.tsx        # Homepage (Technical Profile, Skills, Featured Projects)
├── components/
│   └── Markdown.tsx    # Component for custom Markdown parsing
└── lib/
    └── db.ts           # Prisma client configuration pool
```

---

## 🔒 Administrative Access

To write new articles or showcase new projects:
1. Navigate to `/admin`.
2. Log in using your configured `ADMIN_PASSWORD`.
3. Create, update, or delete records. Changes will reflect instantly on the public pages.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
