import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProjects } from "@/lib/data";
import { revalidateTag, revalidatePath } from "next/cache";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const data = await request.json();
    let project;

    if (data.id && data.id !== "new") {
      project = await prisma.project.update({
        where: { id: data.id },
        data: {
          title: data.title,
          slug: data.slug,
          summary: data.summary || "",
          description: data.description || "",
          platform: data.platform || "React Native",
          appStoreUrl: data.appStoreUrl,
          playStoreUrl: data.playStoreUrl,
          githubUrl: data.githubUrl,
          liveDemoUrl: data.liveDemoUrl,
          thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
          screenshots: data.screenshots || [],
          featured: data.featured ?? false,
          techStack: data.techStack || [],
          keyMetrics: (data.keyMetrics || {}) as object,
          order: data.order ?? 0,
        },
      });
    } else {
      project = await prisma.project.create({
        data: {
          title: data.title,
          slug: data.slug,
          summary: data.summary || "",
          description: data.description || "",
          platform: data.platform || "React Native",
          appStoreUrl: data.appStoreUrl,
          playStoreUrl: data.playStoreUrl,
          githubUrl: data.githubUrl,
          liveDemoUrl: data.liveDemoUrl,
          thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
          screenshots: data.screenshots || [],
          featured: data.featured ?? false,
          techStack: data.techStack || [],
          keyMetrics: (data.keyMetrics || {}) as object,
          order: data.order ?? 0,
        },
      });
    }

    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project id" }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });

    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
