import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PROFILE } from "@/lib/constants";
import { getProfile } from "@/lib/data";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile.themeSettings);
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

    const themeSettings = await request.json();

    const existing = await prisma.profile.findFirst();
    if (existing) {
      await prisma.profile.update({
        where: { id: existing.id },
        data: { themeSettings: themeSettings as object },
      });
    } else {
      await prisma.profile.create({
        data: {
          ...DEFAULT_PROFILE,
          themeSettings: themeSettings as object,
        },
      });
    }

    revalidateTag("profile");
    revalidateTag("theme");
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/theme");

    return NextResponse.json({ success: true, message: "Theme saved successfully" });
  } catch (error) {
    console.error("Error saving theme settings:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save theme" },
      { status: 500 }
    );
  }
}
