import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
  DEFAULT_EDUCATION,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_LIFE_UPDATES,
} from "./constants";
import {
  ProfileData,
  ProjectData,
  ExperienceData,
  EducationData,
  SkillCategoryData,
  CertificationData,
  LifeUpdateData,
  ContactMessageData,
} from "@/types";

// Cached Profile Getter
export const getProfile = cache(
  unstable_cache(
    async (): Promise<ProfileData> => {
      try {
        const profile = await prisma.profile.findFirst();
        if (!profile) return DEFAULT_PROFILE;
        const savedTheme =
          (profile.themeSettings as unknown as ProfileData["themeSettings"]) || {};
        return {
          ...profile,
          themeSettings: {
            ...DEFAULT_PROFILE.themeSettings,
            ...savedTheme,
            phoneMockupSettings: {
              ...DEFAULT_PROFILE.themeSettings.phoneMockupSettings,
              ...(savedTheme.phoneMockupSettings || {}),
            },
          },
        };
      } catch (error) {
        console.warn("Could not fetch profile from DB, using defaults:", error);
        return DEFAULT_PROFILE;
      }
    },
    ["profile-cache"],
    { tags: ["profile", "theme"], revalidate: 3600 }
  )
);

export const getProjects = cache(
  unstable_cache(
    async (): Promise<ProjectData[]> => {
      try {
        const projects = await prisma.project.findMany({
          orderBy: { order: "asc" },
        });
        if (!projects || projects.length === 0) return DEFAULT_PROJECTS;
        return projects.map((p) => {
          const fallback = DEFAULT_PROJECTS.find((df) => df.slug === p.slug);
          return {
            ...p,
            role: fallback?.role || "Mobile Application Developer",
            caseStudy: fallback?.caseStudy,
          } as unknown as ProjectData;
        });
      } catch (error) {
        console.warn("Could not fetch projects from DB, using defaults:", error);
        return DEFAULT_PROJECTS;
      }
    },
    ["projects-cache"],
    { tags: ["projects"], revalidate: 3600 }
  )
);

export const getFeaturedProjects = cache(async (): Promise<ProjectData[]> => {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
});

export const getProjectBySlug = cache(async (slug: string): Promise<ProjectData | null> => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
});

// Cached Experiences Getter
export const getExperiences = cache(
  unstable_cache(
    async (): Promise<ExperienceData[]> => {
      try {
        const experiences = await prisma.experience.findMany({
          orderBy: { order: "asc" },
        });
        if (!experiences || experiences.length === 0) return DEFAULT_EXPERIENCES;
        return experiences as unknown as ExperienceData[];
      } catch (error) {
        console.warn("Could not fetch experiences from DB, using defaults:", error);
        return DEFAULT_EXPERIENCES;
      }
    },
    ["experiences-cache"],
    { tags: ["experiences", "cv"], revalidate: 3600 }
  )
);

// Cached Education Getter
export const getEducation = cache(
  unstable_cache(
    async (): Promise<EducationData[]> => {
      try {
        const education = await prisma.education.findMany({
          orderBy: { order: "asc" },
        });
        if (!education || education.length === 0) return DEFAULT_EDUCATION;
        return education as unknown as EducationData[];
      } catch (error) {
        console.warn("Could not fetch education from DB, using defaults:", error);
        return DEFAULT_EDUCATION;
      }
    },
    ["education-cache"],
    { tags: ["education", "cv"], revalidate: 3600 }
  )
);

// Cached Skill Categories Getter
export const getSkillCategories = cache(
  unstable_cache(
    async (): Promise<SkillCategoryData[]> => {
      try {
        const categories = await prisma.skillCategory.findMany({
          include: {
            skills: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        });
        if (!categories || categories.length === 0) return DEFAULT_SKILL_CATEGORIES;
        return categories as unknown as SkillCategoryData[];
      } catch (error) {
        console.warn("Could not fetch skill categories from DB, using defaults:", error);
        return DEFAULT_SKILL_CATEGORIES;
      }
    },
    ["skills-cache"],
    { tags: ["skills", "cv"], revalidate: 3600 }
  )
);

// Cached Certifications Getter
export const getCertifications = cache(
  unstable_cache(
    async (): Promise<CertificationData[]> => {
      try {
        const certs = await prisma.certification.findMany({
          orderBy: { order: "asc" },
        });
        if (!certs || certs.length === 0) return DEFAULT_CERTIFICATIONS;
        return certs as unknown as CertificationData[];
      } catch (error) {
        console.warn("Could not fetch certifications from DB, using defaults:", error);
        return DEFAULT_CERTIFICATIONS;
      }
    },
    ["certifications-cache"],
    { tags: ["certifications", "cv"], revalidate: 3600 }
  )
);

// Cached Life Updates Getter
export const getLifeUpdates = cache(
  unstable_cache(
    async (): Promise<LifeUpdateData[]> => {
      try {
        const updates = await prisma.lifeUpdate.findMany({
          orderBy: { createdAt: "desc" },
          take: 20,
        });
        if (!updates || updates.length === 0) return DEFAULT_LIFE_UPDATES;
        return updates as unknown as LifeUpdateData[];
      } catch (error) {
        console.warn("Could not fetch life updates from DB, using defaults:", error);
        return DEFAULT_LIFE_UPDATES;
      }
    },
    ["life-updates-cache"],
    { tags: ["life-updates"], revalidate: 3600 }
  )
);

// Admin Messages (Dynamic / Uncached)
export async function getContactMessages(): Promise<ContactMessageData[]> {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return messages as unknown as ContactMessageData[];
  } catch (error) {
    console.warn("Could not fetch messages from DB:", error);
    return [];
  }
}
