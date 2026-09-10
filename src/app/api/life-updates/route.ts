import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLifeUpdates } from "@/lib/data";
import { revalidateTag, revalidatePath } from "next/cache";

export async function GET() {
  const updates = await getLifeUpdates();
  return NextResponse.json(updates);
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

    const { content, tag, emoji } = await request.json();
    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 });
    }

    const update = await prisma.lifeUpdate.create({
      data: {
        content: content.trim(),
        tag: tag || "BUILDING",
        emoji: emoji || "",
      },
    });

    revalidateTag("life-updates");
    revalidatePath("/");
    revalidatePath("/now");
    revalidatePath("/admin/life-feed");

    return NextResponse.json({ success: true, item: update });
  } catch (error) {
    console.error("Error creating life update:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to create update" },
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
      return NextResponse.json({ success: false, error: "Missing update id" }, { status: 400 });
    }

    await prisma.lifeUpdate.delete({ where: { id } });

    revalidateTag("life-updates");
    revalidatePath("/");
    revalidatePath("/now");
    revalidatePath("/admin/life-feed");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete update" },
      { status: 500 }
    );
  }
}
