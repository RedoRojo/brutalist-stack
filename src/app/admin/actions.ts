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

// Project CRUD Operations

export async function getProjects() {
  try {
    return await prisma.project.findMany({
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
    });
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
    return null;
  }
}

export async function createProject(formData: {
  title: string;
  description: string;
  content: string;
  techStack: string;
  repoUrl: string;
  liveUrl: string;
}) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const { title, description, content, techStack, repoUrl, liveUrl } = formData;

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  await prisma.project.create({
    data: {
      title,
      description,
      content: content || "",
      techStack,
      repoUrl,
      liveUrl,
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
    description: string;
    content: string;
    techStack: string;
    repoUrl: string;
    liveUrl: string;
  }
) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const { title, description, content, techStack, repoUrl, liveUrl } = formData;

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      content: content || "",
      techStack,
      repoUrl,
      liveUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProject(id: string) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath("/admin");
  return { success: true };
}

// Blog Post CRUD Operations

export async function getPosts() {
  try {
    return await prisma.post.findMany({
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
    });
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    return null;
  }
}

export async function createPost(formData: {
  title: string;
  slug: string;
  summary: string;
  content: string;
}) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const { title, slug, summary, content } = formData;

  if (!title || !slug || !summary || !content) {
    throw new Error("All fields (title, slug, summary, content) are required.");
  }

  // Format slug: lowercase, replace spaces with hyphens, remove special characters
  const formattedSlug = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_]/g, "")
    .replace(/\s+/g, "-");

  await prisma.post.create({
    data: {
      title,
      slug: formattedSlug,
      summary,
      content,
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
    slug: string;
    summary: string;
    content: string;
  }
) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  const { title, slug, summary, content } = formData;

  if (!title || !slug || !summary || !content) {
    throw new Error("All fields (title, slug, summary, content) are required.");
  }

  const formattedSlug = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_]/g, "")
    .replace(/\s+/g, "-");

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: formattedSlug,
      summary,
      content,
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
