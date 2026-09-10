import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getExperiences, getEducation, getCertifications } from "@/lib/data";
import { revalidateTag, revalidatePath } from "next/cache";

export async function GET() {
  const [experiences, education, certifications] = await Promise.all([
    getExperiences(),
    getEducation(),
    getCertifications(),
  ]);
  return NextResponse.json({ experiences, education, certifications });
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

    if (type === "experience") {
      let exp;
      if (data.id && data.id !== "new") {
        exp = await prisma.experience.update({
          where: { id: data.id },
          data: {
            company: data.company,
            role: data.role,
            location: data.location,
            startDate: data.startDate || "2024",
            endDate: data.endDate,
            isCurrent: data.isCurrent ?? false,
            description: data.description,
            achievements: Array.isArray(data.achievements) ? data.achievements : [],
            techStack: Array.isArray(data.techStack) ? data.techStack : [],
            type: data.type || "FULL_TIME",
            order: data.order ?? 0,
          },
        });
      } else {
        exp = await prisma.experience.create({
          data: {
            company: data.company,
            role: data.role,
            location: data.location,
            startDate: data.startDate || "2024",
            endDate: data.endDate,
            isCurrent: data.isCurrent ?? false,
            description: data.description,
            achievements: Array.isArray(data.achievements) ? data.achievements : [],
            techStack: Array.isArray(data.techStack) ? data.techStack : [],
            type: data.type || "FULL_TIME",
            order: data.order ?? 0,
          },
        });
      }

      revalidateTag("experiences");
      revalidateTag("cv");
      revalidatePath("/");
      revalidatePath("/cv");
      revalidatePath("/admin/cv");
      return NextResponse.json({ success: true, item: exp });
    }

    if (type === "education") {
      let edu;
      if (data.id && data.id !== "new") {
        edu = await prisma.education.update({
          where: { id: data.id },
          data: {
            institution: data.institution,
            degree: data.degree,
            fieldOfStudy: data.fieldOfStudy || "Computer Science",
            startDate: data.startDate || "2021",
            endDate: data.endDate,
            isCurrent: data.isCurrent ?? false,
            grade: data.grade,
            activities: Array.isArray(data.activities) ? data.activities : [],
            order: data.order ?? 0,
          },
        });
      } else {
        edu = await prisma.education.create({
          data: {
            institution: data.institution,
            degree: data.degree,
            fieldOfStudy: data.fieldOfStudy || "Computer Science",
            startDate: data.startDate || "2021",
            endDate: data.endDate,
            isCurrent: data.isCurrent ?? false,
            grade: data.grade,
            activities: Array.isArray(data.activities) ? data.activities : [],
            order: data.order ?? 0,
          },
        });
      }

      revalidateTag("education");
      revalidateTag("cv");
      revalidatePath("/cv");
      revalidatePath("/admin/cv");
      return NextResponse.json({ success: true, item: edu });
    }

    if (type === "certification") {
      let cert;
      if (data.id && data.id !== "new") {
        cert = await prisma.certification.update({
          where: { id: data.id },
          data: {
            title: data.title || data.name,
            issuer: data.issuer,
            issueDate: data.issueDate || "2024",
            expiryDate: data.expiryDate,
            credentialUrl: data.credentialUrl,
            order: data.order ?? 0,
          },
        });
      } else {
        cert = await prisma.certification.create({
          data: {
            title: data.title || data.name,
            issuer: data.issuer,
            issueDate: data.issueDate || "2024",
            expiryDate: data.expiryDate,
            credentialUrl: data.credentialUrl,
            order: data.order ?? 0,
          },
        });
      }

      revalidateTag("certifications");
      revalidateTag("cv");
      revalidatePath("/cv");
      revalidatePath("/admin/cv");
      return NextResponse.json({ success: true, item: cert });
    }

    return NextResponse.json({ success: false, error: "Invalid type specified" }, { status: 400 });
  } catch (error) {
    console.error("Error saving CV item:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save CV item" },
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

    if (type === "experience") {
      await prisma.experience.delete({ where: { id } });
      revalidateTag("experiences");
    } else if (type === "education") {
      await prisma.education.delete({ where: { id } });
      revalidateTag("education");
    } else if (type === "certification") {
      await prisma.certification.delete({ where: { id } });
      revalidateTag("certifications");
    }

    revalidateTag("cv");
    revalidatePath("/");
    revalidatePath("/cv");
    revalidatePath("/admin/cv");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete item" },
      { status: 500 }
    );
  }
}
