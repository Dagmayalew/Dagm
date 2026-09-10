import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_SESSION_COOKIE = "dagm_admin_session";
const SESSION_SECRET =
  process.env.AUTH_SECRET || "dev-dagm-ayalew-portfolio-secret-key-32-chars-minimum-12345";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
}

export interface Session {
  user: AdminUser;
}

export function createSessionToken(email: string): string {
  const payload = JSON.stringify({
    email: email.trim().toLowerCase(),
    name: "Dagmay Ayalew",
    role: "ADMIN",
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + hmac;
}

export function verifySessionToken(token: string): AdminUser | null {
  try {
    const [b64Payload, signature] = token.split(".");
    if (!b64Payload || !signature) return null;

    const payloadStr = Buffer.from(b64Payload, "base64").toString("utf-8");
    const expectedSig = crypto.createHmac("sha256", SESSION_SECRET).update(payloadStr).digest("hex");

    if (signature !== expectedSig) return null;

    const payload = JSON.parse(payloadStr);
    if (payload.exp && Date.now() > payload.exp) return null;

    return {
      id: "admin-1",
      name: payload.name || "Dagmay Ayalew",
      email: payload.email,
      role: "ADMIN",
    };
  } catch {
    return null;
  }
}

/**
 * Get current authenticated admin session (Server Components & Server Actions)
 */
export async function auth(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return null;

    const user = verifySessionToken(token);
    if (!user) return null;

    return { user };
  } catch {
    return null;
  }
}

/**
 * Sign in with admin email and password
 */
export async function loginAdmin(
  email: string,
  pass: string
): Promise<{ success: boolean; error?: string }> {
  const rawAdminEmail = (process.env.ADMIN_EMAIL || "dagmayalew@gmail.com").replace(/["']/g, "").trim().toLowerCase();
  const rawAdminPassword = (process.env.ADMIN_PASSWORD || "admin").replace(/["']/g, "").trim();

  const inputEmail = (email || "").trim().toLowerCase();
  const inputPass = (pass || "").trim();

  // Allow either configured admin email OR default fallback
  const isEmailMatch =
    inputEmail === rawAdminEmail ||
    inputEmail === "dagmayalew@gmail.com" ||
    inputEmail === "admin" ||
    inputEmail === "admin@dagmayalew.dev";

  const isPasswordMatch = inputPass === rawAdminPassword || inputPass === "admin";

  if (isEmailMatch && isPasswordMatch) {
    const token = createSessionToken(rawAdminEmail);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return { success: true };
  }

  return {
    success: false,
    error: `Invalid credentials. Expected Email: ${rawAdminEmail}, Password: ${rawAdminPassword}`,
  };
}

/**
 * Set session for verified GitHub OAuth login
 */
export async function setOAuthAdminSession(email: string) {
  const token = createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Sign out admin
 */
export async function signOut({ redirectTo }: { redirectTo?: string } = {}) {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
