import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getContactMessages } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
  const messages = await getContactMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "New Portfolio Inquiry",
        message: formData.message,
      },
    });

    revalidatePath("/admin/messages");
    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please email directly." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, isRead } = await request.json();
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: isRead ?? true },
    });

    revalidatePath("/admin/messages");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing message id" }, { status: 400 });
    }

    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/messages");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
