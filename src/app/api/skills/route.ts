import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSkillCategories } from "@/lib/data";
import { revalidateTag, revalidatePath } from "next/cache";

export async function GET() {
  const categories = await getSkillCategories();
  return NextResponse.json(categories);
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

    const { type, data } = await request.json();

    if (type === "category") {
      let cat;
      if (data.id && data.id !== "new") {
        cat = await prisma.skillCategory.update({
          where: { id: data.id },
          data: {
            name: data.name,
            order: data.order ?? 0,
          },
        });
      } else {
        cat = await prisma.skillCategory.create({
          data: {
            name: data.name,
            order: data.order ?? 0,
          },
        });
      }

      revalidateTag("skills");
      revalidateTag("cv");
      revalidatePath("/");
      revalidatePath("/cv");
      revalidatePath("/admin/skills");
      return NextResponse.json({ success: true, item: cat });
    }

    if (type === "skill") {
      let skill;
      if (data.id && data.id !== "new") {
        skill = await prisma.skill.update({
          where: { id: data.id },
          data: {
            name: data.name,
            proficiency: Number(data.proficiency) || 90,
            yearsOfExp: data.yearsOfExp ? Number(data.yearsOfExp) : null,
            iconName: data.iconName,
            featured: data.featured ?? false,
            categoryId: data.categoryId,
            order: data.order ?? 0,
          },
        });
      } else {
        skill = await prisma.skill.create({
          data: {
            name: data.name,
            proficiency: Number(data.proficiency) || 90,
            yearsOfExp: data.yearsOfExp ? Number(data.yearsOfExp) : null,
            iconName: data.iconName,
            featured: data.featured ?? false,
            categoryId: data.categoryId,
            order: data.order ?? 0,
          },
        });
      }

      revalidateTag("skills");
      revalidateTag("cv");
      revalidatePath("/");
      revalidatePath("/cv");
      revalidatePath("/admin/skills");
      return NextResponse.json({ success: true, item: skill });
    }

    return NextResponse.json({ success: false, error: "Invalid type specified" }, { status: 400 });
  } catch (error) {
    console.error("Error saving skill item:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save skill" },
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
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!id || !type) {
      return NextResponse.json({ success: false, error: "Missing type or id" }, { status: 400 });
    }

    if (type === "category") {
      await prisma.skillCategory.delete({ where: { id } });
    } else if (type === "skill") {
      await prisma.skill.delete({ where: { id } });
    }

    revalidateTag("skills");
    revalidateTag("cv");
    revalidatePath("/");
    revalidatePath("/cv");
    revalidatePath("/admin/skills");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete item" },
      { status: 500 }
    );
  }
}
