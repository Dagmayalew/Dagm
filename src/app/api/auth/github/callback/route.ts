import { NextResponse } from "next/server";
import { setOAuthAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "/admin";

  const clientId = process.env.AUTH_GITHUB_ID;
  const clientSecret = process.env.AUTH_GITHUB_SECRET;

  if (!code || !clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/admin/login?error=GitHub+authorization+failed", request.url));
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error || !tokenData.access_token) {
      return NextResponse.redirect(new URL(`/admin/login?error=${encodeURIComponent(tokenData.error_description || "Token exchange failed")}`, request.url));
    }

    // 2. Fetch user profile from GitHub
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "DagmayAyalewPortfolio",
      },
    });

    const userData = await userRes.json();
    const adminUsername = process.env.ADMIN_GITHUB_USERNAME || "dagmayalew";
    const adminEmail = process.env.ADMIN_EMAIL || "dagmayalew@gmail.com";

    const isAuthorized =
      (userData.login && userData.login.toLowerCase() === adminUsername.toLowerCase()) ||
      (userData.email && userData.email.toLowerCase() === adminEmail.toLowerCase());

    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/admin/login?error=Unauthorized+GitHub+Account", request.url));
    }

    // 3. Set verified admin session
    await setOAuthAdminSession(userData.email || adminEmail);

    return NextResponse.redirect(new URL(state, request.url));
  } catch (err) {
    console.error("GitHub OAuth callback error:", err);
    return NextResponse.redirect(new URL("/admin/login?error=OAuth+internal+error", request.url));
  }
}
