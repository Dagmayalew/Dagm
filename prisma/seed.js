const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DEFAULT_PROFILE = {
  name: "Dagm Ayalew",
  title: "Mobile App Developer",
  tagline: "Software Engineer specializing in React Native, Flutter, and FinTech Mobile Architectures. Building secure, high-performance apps with 60 FPS UX.",
  bio: "Software Engineer with 2 years of React Native experience, building production fintech and e-commerce apps serving 150+ daily active users. Specializes in secure authentication, API integration, cryptographic transaction security, and performance optimization.",
  aboutMe: "I am a passionate Mobile Application Developer based in Addis Ababa, Ethiopia. I specialize in crafting high-stakes, production-grade mobile applications with React Native, TypeScript, and modern state architectures (Zustand, TanStack Query, Quick-SQLite).\n\nMy engineering experience spans core banking super apps (Dashen Bank Super App, EthioPost Agent Banking) implementing elliptic curve cryptography (secp256k1, ECDH, AES) and biometric verification, to high-traffic e-commerce platforms (Order Ethiopia) with real-time map routing and 60 FPS FlashList scrolling.\n\nI am driven by clean code principles, test-driven stability, and frictionless UI/UX with smooth micro-interactions (Reanimated & Lottie).",
  email: "dagmayalew489@gmail.com",
  phone: "+251988280976",
  location: "Addis Ababa, Ethiopia",
  avatarUrl: "https://avatars.githubusercontent.com/dagmayalew",
  resumeUrl: "/cv",
  githubUrl: "https://github.com/dagmayalew",
  linkedinUrl: "https://linkedin.com/in/dagmay-ayalew",
  twitterUrl: "https://twitter.com/dagmayalew",
  playStoreDevUrl: "https://play.google.com",
  appStoreDevUrl: "https://apps.apple.com",
  isOpenToWork: true,
  statusMessage: "🚀 Mobile App Developer at Eagle Lion System Technologies | Building next-gen FinTech & React Native apps",
  themeSettings: {
    accentColor: "emerald",
    mode: "dark",
    glassmorphism: true,
    fontFamily: "sans",
  },
};

const DEFAULT_PROJECTS = [
  {
    title: "Dashen Bank Super App",
    slug: "dashen-bank-super-app",
    summary: "High-security banking super app with elliptic curve cryptography, Fayda KYC onboarding, utility settlements, and quick offline indexing.",
    description: "Developed robust cryptographic systems using AES and Elliptic Curve Cryptography (secp256k1/elliptic) to secure end-to-end transaction integrity and tamper-proof payload signing. Boosted application speed and offline reliability by leveraging high-speed react-native-quick-sqlite and Zustand for efficient state management and rapid data indexing. Integrated a broad ecosystem of financial microservices including Fayda KYC onboarding, QR payments, and utility bill settlements for water, electricity, and DSTV. Refined mobile UX with interactive animations using Reanimated and Lottie, while streamlining onboarding through automated SMS OTP verification and financial charting. Utilized Firebase Cloud Messaging (FCM) and Notifee to implement dependable push notifications and automated transaction receipt generation.",
    platform: "React Native • FinTech / Banking",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    githubUrl: "https://github.com/dagmayalew",
    liveDemoUrl: "https://www.dagmayalew.online",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    techStack: ["React Native", "TypeScript", "secp256k1", "AES", "Quick-SQLite", "Zustand", "Reanimated", "Lottie", "FCM / Notifee", "Fayda KYC"],
    keyMetrics: { downloads: "Production", rating: "4.9 ★", activeUsers: "Core Banking" },
    order: 1,
  },
  {
    title: "EthioPost Agent Banking Mobile App",
    slug: "ethiopost-agent-banking",
    summary: "Mission-critical agent banking application streamlining deposits, withdrawals, utility settlements, P2P transfers, and biometric identity.",
    description: "Architected a high-stakes agent banking solution streamlining core financial services like deposits, withdrawals, utility settlements, and peer-to-peer transfers. Hardened infrastructure security by implementing ECDH key exchange with secp256k1, robust AES encryption for data payloads, and integrated biometric identity verification. Elevated user engagement by deploying TanStack Query for persistent offline states, FCM-driven push alerts, QR-based scanning, and data-driven financial visualization modules.",
    platform: "React Native • Agent Banking",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    githubUrl: "https://github.com/dagmayalew",
    liveDemoUrl: "https://www.dagmayalew.online",
    thumbnail: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    techStack: ["React Native", "TypeScript", "Zustand", "ECDH", "secp256k1", "AES", "TanStack Query", "Biometrics", "FCM Alerts"],
    keyMetrics: { downloads: "Nationwide", rating: "4.8 ★", activeUsers: "Agent Network" },
    order: 2,
  },
  {
    title: "Order Ethiopia – E-Commerce Mobile App",
    slug: "order-ethiopia-ecommerce",
    summary: "Scalable cross-platform e-commerce mobile application with Gebeta Maps live GPS tracking, Shopify FlashList 60 FPS scrolling, Vision Camera QR, and video reels feed.",
    description: "Developed a scalable cross-platform e-commerce mobile application using React Native 0.83, TypeScript, and React Navigation v7, adhering to Atomic Design principles for modular UI components. Optimized state and data layers by combining Zustand with TanStack React Query v5 for automated caching, background synchronization, and optimistic updates. Integrated real-time geolocation with Gebeta Maps SDK and MapLibre. Features include Shopify FlashList for 60 FPS scrolling, FastImage caching, OTP verification pipeline, Vision Camera QR scanning, video reels feed, and 5 regional languages.",
    platform: "React Native 0.83 • E-Commerce",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    githubUrl: "https://github.com/dagmayalew",
    liveDemoUrl: "https://www.dagmayalew.online",
    thumbnail: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    techStack: ["React Native 0.83", "TypeScript", "Zustand", "TanStack Query v5", "Gebeta Maps", "MapLibre", "Shopify FlashList", "Vision Camera", "Lottie"],
    keyMetrics: { downloads: "Active Store", rating: "4.9 ★", activeUsers: "60 FPS UX" },
    order: 3,
  },
  {
    title: "Worklance – FinTech & Freelance Marketplace",
    slug: "worklance-marketplace",
    summary: "Multi-channel freelance & digital wallet platform with real-time Socket.io chat, AI resume matching (OpenAI), and Telegram Mini App integration.",
    description: "Developed a scalable multi-tier freelance and fintech platform with multi-channel support (Web, iOS, Android, Telegram Mini App). Engineered core financial transaction modules, digital wallet ledgers, proof-of-payment approval pipelines, automated retainer billing, Socket.io real-time chat, AI resume parsing via OpenAI APIs, and RBAC security across 40+ REST API modules.",
    platform: "NestJS • React 19 • React Native Expo",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    githubUrl: "https://github.com/dagmayalew",
    liveDemoUrl: "https://www.dagmayalew.online",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    screenshots: [],
    featured: true,
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "TypeORM", "React 19", "React Native Expo", "Socket.io", "OpenAI API", "Zod"],
    keyMetrics: { downloads: "Multi-Channel", rating: "4.8 ★" },
    order: 4,
  },
  {
    title: "PSY – High-Concurrency FinTech Platform",
    slug: "psy-fintech-platform",
    summary: "Asynchronous Go REST API & Next.js 16 portal with PostgreSQL pgx connection pooling, dual-token JWT, and Docker containerization.",
    description: "Architected a high-concurrency fintech platform featuring an asynchronous Go REST API, a Next.js 16 user portal, and a dedicated administrative back-office dashboard. Engineered resilient database architecture using PostgreSQL and pgx/puddle connection pooling, maintaining sub-100ms API latencies. Implemented enterprise-grade dual-token JWT authentication, multi-tenant RBAC, and Docker containerization.",
    platform: "Go • Next.js 16 • PostgreSQL • Docker",
    appStoreUrl: null,
    playStoreUrl: null,
    githubUrl: "https://github.com/dagmayalew",
    liveDemoUrl: null,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    screenshots: [],
    featured: false,
    techStack: ["Go", "Next.js 16", "PostgreSQL", "Docker", "JWT Dual-Token", "RBAC", "pgx/puddle"],
    keyMetrics: { downloads: "Sub-100ms", rating: "5.0 ★" },
    order: 5,
  },
  {
    title: "Exam Time – Mobile App & Admin Portal",
    slug: "exam-time-portal",
    summary: "Offline-first exam preparation mobile application with Realm local storage, RTK Query synchronization, and React Admin dashboard.",
    description: "Improved production stability by fixing mobile crashes, optimizing Realm offline-data synchronization, and streamlining admin portal state management for educational content delivery.",
    platform: "React Native • Realm • RTK Query",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    githubUrl: "https://github.com/dagmayalew",
    liveDemoUrl: null,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    screenshots: [],
    featured: false,
    techStack: ["React Native", "Realm DB", "RTK Query", "React Admin", "Offline Sync"],
    order: 6,
  },
];

const DEFAULT_EXPERIENCES = [
  {
    company: "Eagle Lion System Technologies",
    role: "Mobile Application Developer",
    location: "Addis Ababa, Ethiopia",
    startDate: "Feb 2026",
    endDate: "Present",
    isCurrent: true,
    description: "Core mobile developer building production fintech and banking applications with React Native and TypeScript.",
    achievements: [
      "Implemented secure token‑based authentication and local data storage, supporting 150+ daily active users and reducing session‑related bugs by ~40%.",
      "Integrated 8+ financial APIs, enabling real-time transaction processing and reducing data sync latency by 30%.",
      "Built silent token refresh and local queue retry mechanisms to handle session expiry during long transactions.",
      "Collaborated with backend teams to define API contracts and optimize system stability.",
    ],
    techStack: ["React Native", "TypeScript", "Zustand", "Token Auth", "Financial APIs", "Offline Retry", "REST"],
    type: "FULL_TIME",
    order: 1,
  },
  {
    company: "TBC Technologies",
    role: "Full Stack Developer",
    location: "Addis Ababa, Ethiopia",
    startDate: "Mar 2024",
    endDate: "Feb 2026",
    isCurrent: false,
    description: "Engineered scalable web and mobile user interfaces, integrated resilient REST APIs, and led production stability improvements.",
    achievements: [
      "Resolved 12+ critical production bugs, reducing crash rates by 25% and improving user retention.",
      "Integrated REST APIs with retry logic and error boundaries, cutting API call failures by ~20%.",
      "Participated in Agile workflows using Git, code reviews, and pull requests.",
      "Developed responsive frontend features with React and Next.js, ensuring UI/UX consistency.",
      "Handled data fetching and global state management by integrating frontend components with backend APIs.",
      "Worked in a collaborative team environment using daily stand-ups and branching workflows.",
    ],
    techStack: ["React", "Next.js", "TypeScript", "REST APIs", "Error Boundaries", "State Management", "Git"],
    type: "FULL_TIME",
    order: 2,
  },
];

const DEFAULT_EDUCATION = [
  {
    institution: "Unity University, Addis Ababa (Gerji Campus)",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2021",
    endDate: "2025",
    isCurrent: false,
    grade: "Graduated 2025",
    activities: [
      "Specialized in Software Engineering, Data Structures, Mobile Architectures, and Database Systems",
      "Active participant in developer hackathons and mobile community events",
    ],
    order: 1,
  },
];

const DEFAULT_SKILL_CATEGORIES = [
  {
    name: "Mobile Development (Primary)",
    order: 1,
    skills: [
      { name: "React Native", proficiency: 96, yearsOfExp: 2, iconName: "Smartphone", featured: true, order: 1 },
      { name: "TypeScript", proficiency: 94, yearsOfExp: 2, iconName: "Terminal", featured: true, order: 2 },
      { name: "Flutter & Dart", proficiency: 85, yearsOfExp: 2, iconName: "Smartphone", featured: true, order: 3 },
      { name: "Kotlin (Android)", proficiency: 80, yearsOfExp: 2, iconName: "Bot", featured: false, order: 4 },
      { name: "Swift (iOS)", proficiency: 80, yearsOfExp: 2, iconName: "Apple", featured: false, order: 5 },
    ],
  },
  {
    name: "State Management & Offline Storage",
    order: 2,
    skills: [
      { name: "Zustand", proficiency: 95, yearsOfExp: 2, iconName: "Boxes", featured: true, order: 1 },
      { name: "TanStack React Query", proficiency: 94, yearsOfExp: 2, iconName: "Workflow", featured: true, order: 2 },
      { name: "RTK Query & Redux", proficiency: 90, yearsOfExp: 2, iconName: "Cpu", featured: true, order: 3 },
      { name: "Quick-SQLite & Realm", proficiency: 92, yearsOfExp: 2, iconName: "HardDrive", featured: true, order: 4 },
      { name: "AsyncStorage", proficiency: 95, yearsOfExp: 2, iconName: "Database", featured: false, order: 5 },
    ],
  },
  {
    name: "Frontend & Full-Stack Web",
    order: 3,
    skills: [
      { name: "React & React 19", proficiency: 95, yearsOfExp: 2, iconName: "Globe", featured: true, order: 1 },
      { name: "Next.js", proficiency: 92, yearsOfExp: 2, iconName: "Server", featured: true, order: 2 },
      { name: "JavaScript (ES6+)", proficiency: 95, yearsOfExp: 3, iconName: "Terminal", featured: true, order: 3 },
      { name: "Tailwind CSS & NativeWind", proficiency: 94, yearsOfExp: 2, iconName: "Layers", featured: true, order: 4 },
    ],
  },
  {
    name: "Backend, APIs & Cryptography",
    order: 4,
    skills: [
      { name: "REST APIs & JWT Auth", proficiency: 95, yearsOfExp: 2, iconName: "Globe", featured: true, order: 1 },
      { name: "NestJS & Node.js", proficiency: 88, yearsOfExp: 2, iconName: "Server", featured: true, order: 2 },
      { name: "PostgreSQL & MySQL", proficiency: 90, yearsOfExp: 2, iconName: "Database", featured: true, order: 3 },
      { name: "Firebase & Firestore", proficiency: 92, yearsOfExp: 2, iconName: "Flame", featured: true, order: 4 },
      { name: "Cryptography (secp256k1, AES, ECDH)", proficiency: 90, yearsOfExp: 2, iconName: "ShieldCheck", featured: true, order: 5 },
    ],
  },
  {
    name: "Mobile Tools & SDKs",
    order: 5,
    skills: [
      { name: "Xcode & Android Studio", proficiency: 90, yearsOfExp: 2, iconName: "Smartphone", featured: true, order: 1 },
      { name: "Shopify FlashList (60 FPS)", proficiency: 95, yearsOfExp: 2, iconName: "Rocket", featured: true, order: 2 },
      { name: "Reanimated & Lottie", proficiency: 92, yearsOfExp: 2, iconName: "Sparkles", featured: true, order: 3 },
      { name: "FCM & Notifee Push Notifications", proficiency: 94, yearsOfExp: 2, iconName: "BellRing", featured: true, order: 4 },
      { name: "Gebeta Maps & MapLibre", proficiency: 90, yearsOfExp: 2, iconName: "Globe", featured: false, order: 5 },
      { name: "Git, Postman & VS Code", proficiency: 95, yearsOfExp: 3, iconName: "Terminal", featured: true, order: 6 },
    ],
  },
];

const DEFAULT_LIFE_UPDATES = [
  {
    content: "Building secure financial microservices & silent token refresh pipelines at Eagle Lion System Technologies.",
    tag: "BUILDING",
    emoji: "💳",
  },
  {
    content: "Shipped Dashen Bank Super App modules with ECDH elliptic curve cryptography and Fayda KYC onboarding.",
    tag: "MILESTONE",
    emoji: "🏦",
  },
  {
    content: "Optimizing Order Ethiopia e-commerce UI with Shopify FlashList for smooth 60 FPS scrolling and Gebeta Maps live GPS telemetry.",
    tag: "LEARNING",
    emoji: "⚡",
  },
];

async function main() {
  console.log("🌱 Syncing Dagm Ayalew's real-world CV data to Neon database...");

  // 1. Profile: Upsert
  const existingProfile = await prisma.profile.findFirst();
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: DEFAULT_PROFILE,
    });
    console.log("✓ Profile updated with Dagm Ayalew's credentials");
  } else {
    await prisma.profile.create({ data: DEFAULT_PROFILE });
    console.log("✓ Profile created with Dagm Ayalew's credentials");
  }

  // 2. Clear and re-populate Projects, Experiences, Education, Skills, Life Updates
  await prisma.project.deleteMany({});
  for (const p of DEFAULT_PROJECTS) {
    await prisma.project.create({ data: p });
  }
  console.log(`✓ ${DEFAULT_PROJECTS.length} Real-world Projects seeded (Dashen Bank Super App, EthioPost, Order Ethiopia, Worklance, PSY, Exam Time)`);

  await prisma.experience.deleteMany({});
  for (const e of DEFAULT_EXPERIENCES) {
    await prisma.experience.create({ data: e });
  }
  console.log(`✓ ${DEFAULT_EXPERIENCES.length} Work Experiences seeded (Eagle Lion System Technologies, TBC Technologies)`);

  await prisma.education.deleteMany({});
  for (const edu of DEFAULT_EDUCATION) {
    await prisma.education.create({ data: edu });
  }
  console.log("✓ Education seeded (Unity University, Computer Science - Graduated 2025)");

  await prisma.skillCategory.deleteMany({});
  for (const cat of DEFAULT_SKILL_CATEGORIES) {
    const createdCat = await prisma.skillCategory.create({
      data: { name: cat.name, order: cat.order },
    });
    for (const sk of cat.skills) {
      await prisma.skill.create({
        data: {
          ...sk,
          categoryId: createdCat.id,
        },
      });
    }
  }
  console.log("✓ Technical Skills Matrix seeded (React Native, TypeScript, Zustand, TanStack Query, Quick-SQLite, etc.)");

  await prisma.lifeUpdate.deleteMany({});
  for (const up of DEFAULT_LIFE_UPDATES) {
    await prisma.lifeUpdate.create({ data: up });
  }
  console.log("✓ Life updates seeded");

  console.log("🎉 Neon database successfully updated with Dagm Ayalew's CV!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
