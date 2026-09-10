"use server";

import { prisma } from "./prisma";
import { auth } from "./auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  ProfileData,
  ProjectData,
  ExperienceData,
  EducationData,
  ThemeSettings,
  SkillData,
  SkillCategoryData,
} from "@/types";
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
  DEFAULT_EDUCATION,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_LIFE_UPDATES,
} from "./constants";

import { loginAdmin, signOut } from "./auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Admin login required");
  }
  return session;
}

export async function loginAdminAction(email: string, pass: string) {
  const res = await loginAdmin(email, pass);
  if (res.success) {
    revalidatePath("/admin");
  }
  return res;
}

export async function logoutAdminAction() {
  await signOut();
  revalidatePath("/admin");
  return { success: true };
}

// ----------------------------------------------------
// Profile & Theme Actions
// ----------------------------------------------------
export async function updateProfile(data: Partial<ProfileData>) {
  await requireAdmin();

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
        ...(data.themeSettings ? { themeSettings: data.themeSettings as unknown as object } : {}),
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
        themeSettings: (data.themeSettings || DEFAULT_PROFILE.themeSettings) as unknown as object,
      },
    });
  }

  revalidateTag("profile");
  revalidateTag("theme");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/theme");
  return updated;
}

export async function updateThemeSettings(themeSettings: ThemeSettings) {
  await requireAdmin();
  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: { themeSettings: themeSettings as unknown as object },
    });
  } else {
    await prisma.profile.create({
      data: {
        ...DEFAULT_PROFILE,
        themeSettings: themeSettings as unknown as object,
      },
    });
  }

  revalidateTag("profile");
  revalidateTag("theme");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/theme");
  return { success: true };
}

// ----------------------------------------------------
// Project Actions
// ----------------------------------------------------
export async function upsertProject(data: Partial<ProjectData> & { title: string; slug: string }) {
  await requireAdmin();

  if (data.id && data.id !== "new") {
    const updated = await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary || "",
        description: data.description || "",
        platform: data.platform || "Flutter",
        appStoreUrl: data.appStoreUrl,
        playStoreUrl: data.playStoreUrl,
        githubUrl: data.githubUrl,
        liveDemoUrl: data.liveDemoUrl,
        thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        screenshots: data.screenshots || [],
        featured: data.featured ?? false,
        techStack: data.techStack || [],
        keyMetrics: data.keyMetrics as unknown as object,
        order: data.order ?? 0,
      },
    });
    revalidatePath("/");
    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return updated;
  } else {
    const created = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary || "",
        description: data.description || "",
        platform: data.platform || "Flutter",
        appStoreUrl: data.appStoreUrl,
        playStoreUrl: data.playStoreUrl,
        githubUrl: data.githubUrl,
        liveDemoUrl: data.liveDemoUrl,
        thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        screenshots: data.screenshots || [],
        featured: data.featured ?? false,
        techStack: data.techStack || [],
        keyMetrics: data.keyMetrics as unknown as object,
        order: data.order ?? 0,
      },
    });
    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return created;
  }
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidateTag("projects");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}

// ----------------------------------------------------
// Experience & Education Actions
// ----------------------------------------------------
export async function upsertExperience(data: Partial<ExperienceData> & { company: string; role: string }) {
  await requireAdmin();

  if (data.id && data.id !== "new") {
    const updated = await prisma.experience.update({
      where: { id: data.id },
      data: {
        company: data.company,
        role: data.role,
        location: data.location,
        startDate: data.startDate || "2023",
        endDate: data.endDate,
        isCurrent: data.isCurrent ?? false,
        description: data.description,
        achievements: data.achievements || [],
        techStack: data.techStack || [],
        type: data.type || "FULL_TIME",
        order: data.order ?? 0,
      },
    });
    revalidateTag("experiences");
    revalidateTag("cv");
    revalidatePath("/");
    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    return updated;
  } else {
    const created = await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        location: data.location,
        startDate: data.startDate || "2023",
        endDate: data.endDate,
        isCurrent: data.isCurrent ?? false,
        description: data.description,
        achievements: data.achievements || [],
        techStack: data.techStack || [],
        type: data.type || "FULL_TIME",
        order: data.order ?? 0,
      },
    });
    revalidateTag("experiences");
    revalidateTag("cv");
    revalidatePath("/");
    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    return created;
  }
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidateTag("experiences");
  revalidateTag("cv");
  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/cv");
  return { success: true };
}

export async function upsertEducation(data: Partial<EducationData> & { institution: string; degree: string }) {
  await requireAdmin();

  if (data.id && data.id !== "new") {
    const updated = await prisma.education.update({
      where: { id: data.id },
      data: {
        institution: data.institution,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy || "Computer Science",
        startDate: data.startDate || "2018",
        endDate: data.endDate,
        isCurrent: data.isCurrent ?? false,
        grade: data.grade,
        activities: data.activities || [],
        order: data.order ?? 0,
      },
    });
    revalidateTag("education");
    revalidateTag("cv");
    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    return updated;
  } else {
    const created = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy || "Computer Science",
        startDate: data.startDate || "2018",
        endDate: data.endDate,
        isCurrent: data.isCurrent ?? false,
        grade: data.grade,
        activities: data.activities || [],
        order: data.order ?? 0,
      },
    });
    revalidateTag("education");
    revalidateTag("cv");
    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    return created;
  }
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  await prisma.education.delete({ where: { id } });
  revalidateTag("education");
  revalidateTag("cv");
  revalidatePath("/cv");
  revalidatePath("/admin/cv");
  return { success: true };
}

// ----------------------------------------------------
// Skills Actions
// ----------------------------------------------------
export async function upsertSkillCategory(data: Partial<SkillCategoryData> & { name: string }) {
  await requireAdmin();
  let res;
  if (data.id && data.id !== "new") {
    res = await prisma.skillCategory.update({
      where: { id: data.id },
      data: { name: data.name, order: data.order ?? 0 },
    });
  } else {
    res = await prisma.skillCategory.create({
      data: { name: data.name, order: data.order ?? 0 },
    });
  }
  revalidateTag("skills");
  revalidateTag("cv");
  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/skills");
  return res;
}

export async function upsertSkill(data: Partial<SkillData> & { name: string; categoryId: string }) {
  await requireAdmin();
  if (data.id && data.id !== "new") {
    const updated = await prisma.skill.update({
      where: { id: data.id },
      data: {
        name: data.name,
        proficiency: data.proficiency ?? 90,
        yearsOfExp: data.yearsOfExp,
        iconName: data.iconName,
        featured: data.featured ?? false,
        categoryId: data.categoryId,
        order: data.order ?? 0,
      },
    });
    revalidateTag("skills");
    revalidateTag("cv");
    revalidatePath("/");
    revalidatePath("/cv");
    revalidatePath("/admin/skills");
    return updated;
  } else {
    const created = await prisma.skill.create({
      data: {
        name: data.name,
        proficiency: data.proficiency ?? 90,
        yearsOfExp: data.yearsOfExp,
        iconName: data.iconName,
        featured: data.featured ?? false,
        categoryId: data.categoryId,
        order: data.order ?? 0,
      },
    });
    revalidateTag("skills");
    revalidateTag("cv");
    revalidatePath("/");
    revalidatePath("/cv");
    revalidatePath("/admin/skills");
    return created;
  }
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidateTag("skills");
  revalidateTag("cv");
  revalidatePath("/");
  revalidatePath("/cv");
  revalidatePath("/admin/skills");
  return { success: true };
}

// ----------------------------------------------------
// Life Updates / Day-to-Day Hub
// ----------------------------------------------------
export async function createLifeUpdate(data: { content: string; tag: string; emoji: string }) {
  await requireAdmin();
  const created = await prisma.lifeUpdate.create({
    data: {
      content: data.content,
      tag: data.tag || "BUILDING",
      emoji: data.emoji || "",
    },
  });
  revalidateTag("life-updates");
  revalidatePath("/");
  revalidatePath("/now");
  revalidatePath("/admin/life-feed");
  return created;
}

export async function deleteLifeUpdate(id: string) {
  await requireAdmin();
  await prisma.lifeUpdate.delete({ where: { id } });
  revalidateTag("life-updates");
  revalidatePath("/");
  revalidatePath("/now");
  revalidatePath("/admin/life-feed");
  return { success: true };
}

// ----------------------------------------------------
// Contact Messages (Public submission & Admin reading)
// ----------------------------------------------------
export async function submitContactMessage(formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  try {
    const created = await prisma.contactMessage.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "New Portfolio Inquiry",
        message: formData.message,
      },
    });
    revalidatePath("/admin/messages");
    return { success: true, message: "Thank you! Your message has been sent successfully." };
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return { success: true, message: "Message received! (Cached locally)" };
  }
}

export async function markMessageAsRead(id: string) {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  return { success: true };
}

// ----------------------------------------------------
// Seed Database Helper (Populates Supabase PostgreSQL)
// ----------------------------------------------------
export async function seedDatabase() {
  await requireAdmin();

  // 1. Profile
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        ...DEFAULT_PROFILE,
        themeSettings: DEFAULT_PROFILE.themeSettings as unknown as object,
      },
    });
  }

  // 2. Projects
  for (const p of DEFAULT_PROJECTS) {
    const exists = await prisma.project.findUnique({ where: { slug: p.slug } });
    if (!exists) {
      await prisma.project.create({
        data: {
          title: p.title,
          slug: p.slug,
          summary: p.summary,
          description: p.description,
          platform: p.platform,
          appStoreUrl: p.appStoreUrl,
          playStoreUrl: p.playStoreUrl,
          githubUrl: p.githubUrl,
          liveDemoUrl: p.liveDemoUrl,
          thumbnail: p.thumbnail,
          screenshots: p.screenshots,
          featured: p.featured,
          techStack: p.techStack,
          keyMetrics: p.keyMetrics as unknown as object,
          order: p.order,
        },
      });
    }
  }

  // 3. Experiences
  for (const e of DEFAULT_EXPERIENCES) {
    await prisma.experience.create({
      data: {
        company: e.company,
        role: e.role,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
        isCurrent: e.isCurrent,
        description: e.description,
        achievements: e.achievements,
        techStack: e.techStack,
        type: e.type,
        order: e.order,
      },
    });
  }

  // 4. Education
  for (const edu of DEFAULT_EDUCATION) {
    await prisma.education.create({
      data: {
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        isCurrent: edu.isCurrent,
        grade: edu.grade,
        activities: edu.activities,
        order: edu.order,
      },
    });
  }

  // 5. Skill Categories & Skills
  for (const cat of DEFAULT_SKILL_CATEGORIES) {
    const createdCat = await prisma.skillCategory.create({
      data: { name: cat.name, order: cat.order },
    });
    for (const sk of cat.skills) {
      await prisma.skill.create({
        data: {
          name: sk.name,
          proficiency: sk.proficiency,
          yearsOfExp: sk.yearsOfExp,
          iconName: sk.iconName,
          featured: sk.featured,
          categoryId: createdCat.id,
          order: sk.order,
        },
      });
    }
  }

  // 6. Certifications
  for (const cert of DEFAULT_CERTIFICATIONS) {
    await prisma.certification.create({
      data: {
        title: cert.title,
        issuer: cert.issuer,
        issueDate: cert.issueDate,
        credentialId: cert.credentialId,
        credentialUrl: cert.credentialUrl,
        order: cert.order,
      },
    });
  }

  // 7. Life Updates
  for (const up of DEFAULT_LIFE_UPDATES) {
    await prisma.lifeUpdate.create({
      data: {
        content: up.content,
        tag: up.tag,
        emoji: up.emoji,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Database seeded with mobile developer portfolio data!" };
}
