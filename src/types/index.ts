export type AccentPreset =
  | "emerald"
  | "cyan"
  | "violet"
  | "amber"
  | "rose"
  | "slate"
  | "indigo"
  | "crimson"
  | "custom";

export type BackgroundPattern = "grid" | "dots" | "mesh" | "clean";
export type GlassIntensity = "none" | "low" | "medium" | "ultra";
export type BorderRadiusSize = "none" | "sm" | "md" | "lg" | "full";
export type FontFamilyChoice = "sans" | "mono" | "serif";
export type GlowIntensity = "subtle" | "vibrant" | "off";

export interface PhoneMockupSettings {
  defaultApp?: "banking" | "delivery" | "crypto" | "dashen" | "ethiopost" | "order";
  frameStyle?: "titanium-dark" | "titanium-natural" | "midnight-black" | "emerald-glow";
  dynamicIslandText?: string;
  bankingBalance?: string;
  bankingCurrency?: string;
  bankingCardholder?: string;
  bankingKycBadge?: string;
  deliveryRoute?: string;
  deliveryEta?: string;
  cryptoAlgorithm?: string;
}

export interface SectionVisibility {
  showHero?: boolean;
  showProjects?: boolean;
  showExperience?: boolean;
  showSkills?: boolean;
  showContact?: boolean;
}

export interface SectionContentSettings {
  heroHeadline?: string;
  heroIntro?: string;
  heroTechPills?: string[];
  projectsTitle?: string;
  projectsSubtitle?: string;
  experienceTitle?: string;
  experienceSubtitle?: string;
  skillsTitle?: string;
  skillsSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
}

export interface ThemeSettings {
  accentColor: AccentPreset;
  preset?: AccentPreset;
  customPrimaryColor?: string;
  customSecondaryColor?: string;
  mode: "dark" | "light";
  glassmorphism: boolean;
  glassIntensity: GlassIntensity;
  borderRadius: BorderRadiusSize;
  fontFamily: FontFamilyChoice;
  backgroundPattern: BackgroundPattern;
  glowIntensity: GlowIntensity;
  showPhoneMockup: boolean;
  showLiveStatusBadge: boolean;
  enableAnimations: boolean;
  heroHeadlineStyle: "gradient" | "solid" | "glow";
  sectionVisibility?: SectionVisibility;
  sectionContent?: SectionContentSettings;
  phoneMockupSettings?: PhoneMockupSettings;
}

export interface ProfileData {
  id?: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  aboutMe: string;
  email: string;
  phone?: string | null;
  location: string;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  playStoreDevUrl?: string | null;
  appStoreDevUrl?: string | null;
  isOpenToWork: boolean;
  statusMessage: string;
  statusUpdatedAt?: Date | string;
  themeSettings: ThemeSettings;
}

export interface CaseStudyContent {
  overview: string;
  role: string;
  challenge: string;
  solution: string;
  architecture: string[];
  results: string[];
  takeaways: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  role?: string;
  summary: string;
  description: string;
  platform: string;
  appStoreUrl?: string | null;
  playStoreUrl?: string | null;
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  thumbnail: string;
  screenshots: string[];
  featured: boolean;
  techStack: string[];
  keyMetrics?: {
    downloads?: string;
    rating?: string;
    activeUsers?: string;
    performance?: string;
    [key: string]: string | undefined;
  } | null;
  caseStudy?: CaseStudyContent;
  order: number;
  createdAt?: Date | string;
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  achievements: string[];
  techStack: string[];
  type: "FULL_TIME" | "CONTRACT" | "FREELANCE" | "LEADERSHIP";
  order: number;
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  grade?: string | null;
  activities: string[];
  order: number;
}

export interface SkillCategoryData {
  id: string;
  name: string;
  order: number;
  skills: SkillData[];
}

export interface SkillData {
  id: string;
  name: string;
  proficiency: number;
  yearsOfExp?: number | null;
  iconName?: string | null;
  featured: boolean;
  categoryId: string;
  order: number;
}

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  order: number;
}

export interface LifeUpdateData {
  id: string;
  content: string;
  tag: "BUILDING" | "LEARNING" | "LIFE" | "READING" | "MILESTONE";
  emoji: string;
  createdAt: Date | string;
}

export interface ContactMessageData {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
}
