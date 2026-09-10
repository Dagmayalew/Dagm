import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PROFILE } from "@/lib/constants";
import { getProfile } from "@/lib/data";
import { revalidateTag, revalidatePath } from "next/cache";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile);
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
    const existing = await prisma.profile.findFirst();
    let updated;

    if (existing) {
      updated = await prisma.profile.update({
        where: { id: existing.id },
        data: {
          name: data.name ?? existing.name,
          title: data.title ?? existing.title,
          tagline: data.tagline ?? existing.tagline,
          bio: data.bio ?? existing.bio,
          aboutMe: data.aboutMe ?? existing.aboutMe,
          email: data.email ?? existing.email,
          phone: data.phone ?? existing.phone,
          location: data.location ?? existing.location,
          avatarUrl: data.avatarUrl ?? existing.avatarUrl,
          githubUrl: data.githubUrl ?? existing.githubUrl,
          linkedinUrl: data.linkedinUrl ?? existing.linkedinUrl,
          twitterUrl: data.twitterUrl ?? existing.twitterUrl,
          playStoreDevUrl: data.playStoreDevUrl ?? existing.playStoreDevUrl,
          appStoreDevUrl: data.appStoreDevUrl ?? existing.appStoreDevUrl,
          isOpenToWork: data.isOpenToWork ?? existing.isOpenToWork,
          statusMessage: data.statusMessage ?? existing.statusMessage,
          statusUpdatedAt: new Date(),
          ...(data.themeSettings ? { themeSettings: data.themeSettings as object } : {}),
        },
      });
    } else {
      updated = await prisma.profile.create({
        data: {
          name: data.name || DEFAULT_PROFILE.name,
          title: data.title || DEFAULT_PROFILE.title,
          tagline: data.tagline || DEFAULT_PROFILE.tagline,
          bio: data.bio || DEFAULT_PROFILE.bio,
          aboutMe: data.aboutMe || DEFAULT_PROFILE.aboutMe,
          email: data.email || DEFAULT_PROFILE.email,
          location: data.location || DEFAULT_PROFILE.location,
          avatarUrl: data.avatarUrl || DEFAULT_PROFILE.avatarUrl,
          githubUrl: data.githubUrl || DEFAULT_PROFILE.githubUrl,
          linkedinUrl: data.linkedinUrl || DEFAULT_PROFILE.linkedinUrl,
          twitterUrl: data.twitterUrl || DEFAULT_PROFILE.twitterUrl,
          isOpenToWork: data.isOpenToWork ?? true,
          statusMessage: data.statusMessage || DEFAULT_PROFILE.statusMessage,
          themeSettings: (data.themeSettings || DEFAULT_PROFILE.themeSettings) as object,
        },
      });
    }

    revalidateTag("profile");
    revalidateTag("theme");
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/profile");
    revalidatePath("/admin/theme");

    return NextResponse.json({ success: true, profile: updated });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
