"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

function getSessionToken() {
  return crypto.createHash("sha256").update(ADMIN_PASSWORD).digest("hex");
}

export async function loginAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }
  return { success: false, error: "Incorrect password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  return sessionToken === getSessionToken();
}

// Helper to format slugs
function formatSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_ ]/g, "")
    .replace(/\s+/g, "-");
}

// Project CRUD Operations

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: { publishedAt: "desc" },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
    return null;
  }
}

export async function getProjectByIdOrSlug(idOrSlug: string) {
  try {
    // Try by slug first, then fallback to id
    const bySlug = await prisma.project.findUnique({
      where: { slug: idOrSlug },
      include: {
        posts: {
          where: { published: true },
          orderBy: { publishedAt: "desc" },
        },
      },
    });
    if (bySlug) return bySlug;

    return await prisma.project.findUnique({
      where: { id: idOrSlug },
      include: {
        posts: {
          where: { published: true },
          orderBy: { publishedAt: "desc" },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch project ${idOrSlug}:`, error);
    return null;
  }
}

export async function createProject(formData: {
  title: string;
  titleEs?: string;
  slug?: string;
  description: string;
  descriptionEs?: string;
  content: string;
  contentEs?: string;
  techStack: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: string;
}) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const {
    title,
    titleEs,
    slug,
    description,
    descriptionEs,
    content,
    contentEs,
    techStack,
    repoUrl,
    liveUrl,
    featured,
    status,
  } = formData;

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  const projectSlug = slug ? formatSlug(slug) : formatSlug(title);

  await prisma.project.create({
    data: {
      title,
      titleEs: titleEs || null,
      slug: projectSlug,
      description,
      descriptionEs: descriptionEs || null,
      content: content || "",
      contentEs: contentEs || "",
      techStack,
      repoUrl: repoUrl || null,
      liveUrl: liveUrl || null,
      featured: featured ?? false,
      status: status || "COMPLETED",
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProject(
  id: string,
  formData: {
    title: string;
    titleEs?: string;
    slug?: string;
    description: string;
    descriptionEs?: string;
    content: string;
    contentEs?: string;
    techStack: string;
    repoUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    status?: string;
  }
) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const {
    title,
    titleEs,
    slug,
    description,
    descriptionEs,
    content,
    contentEs,
    techStack,
    repoUrl,
    liveUrl,
    featured,
    status,
  } = formData;

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  const projectSlug = slug ? formatSlug(slug) : formatSlug(title);

  await prisma.project.update({
    where: { id },
    data: {
      title,
      titleEs: titleEs || null,
      slug: projectSlug,
      description,
      descriptionEs: descriptionEs || null,
      content: content || "",
      contentEs: contentEs || "",
      techStack,
      repoUrl: repoUrl || null,
      liveUrl: liveUrl || null,
      featured: featured ?? false,
      status: status || "COMPLETED",
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProject(id: string) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const project = await prisma.project.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  if (project?.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }
  revalidatePath("/admin");
  return { success: true };
}

// Blog Post CRUD Operations

export async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        project: {
          select: {
            id: true,
            title: true,
            titleEs: true,
            slug: true,
          },
        },
      },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            titleEs: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch post by slug ${slug}:`, error);
    return null;
  }
}

export async function getPostById(id: string) {
  try {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            titleEs: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    return null;
  }
}

export async function createPost(formData: {
  title: string;
  titleEs?: string;
  slug: string;
  summary: string;
  summaryEs?: string;
  content: string;
  contentEs?: string;
  tags?: string;
  published?: boolean;
  projectId?: string | null;
}) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const {
    title,
    titleEs,
    slug,
    summary,
    summaryEs,
    content,
    contentEs,
    tags,
    published,
    projectId,
  } = formData;

  if (!title || !slug || !summary || !content) {
    throw new Error("All fields (title, slug, summary, content) are required.");
  }

  const formattedSlug = formatSlug(slug);

  await prisma.post.create({
    data: {
      title,
      titleEs: titleEs || null,
      slug: formattedSlug,
      summary,
      summaryEs: summaryEs || null,
      content,
      contentEs: contentEs || "",
      tags: tags || null,
      published: published ?? true,
      projectId: projectId || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  return { success: true };
}

export async function updatePost(
  id: string,
  formData: {
    title: string;
    titleEs?: string;
    slug: string;
    summary: string;
    summaryEs?: string;
    content: string;
    contentEs?: string;
    tags?: string;
    published?: boolean;
    projectId?: string | null;
  }
) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const {
    title,
    titleEs,
    slug,
    summary,
    summaryEs,
    content,
    contentEs,
    tags,
    published,
    projectId,
  } = formData;

  if (!title || !slug || !summary || !content) {
    throw new Error("All fields (title, slug, summary, content) are required.");
  }

  const formattedSlug = formatSlug(slug);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      titleEs: titleEs || null,
      slug: formattedSlug,
      summary,
      summaryEs: summaryEs || null,
      content,
      contentEs: contentEs || "",
      tags: tags || null,
      published: published ?? true,
      projectId: projectId || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${formattedSlug}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deletePost(id: string) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`);
  }
  revalidatePath("/admin");
  return { success: true };
}
