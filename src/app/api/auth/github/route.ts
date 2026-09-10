import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const clientId = process.env.AUTH_GITHUB_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/admin/login?error=GitHub+OAuth+not+configured", request.url));
  }

  const { searchParams } = new URL(request.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email&state=${encodeURIComponent(callbackUrl)}`;

  return NextResponse.redirect(githubAuthUrl);
}
