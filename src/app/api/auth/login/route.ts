import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const res = await loginAdmin(email, password);
    if (res.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: res.error }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal login error" },
      { status: 500 }
    );
  }
}
