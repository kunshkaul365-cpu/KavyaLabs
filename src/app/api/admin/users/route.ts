import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAllUsers, createUser, getUserByEmail } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await getAllUsers();
    // Exclude password hashes
    const sanitized = users.map(({ passwordHash, ...rest }) => rest);

    return NextResponse.json({ users: sanitized });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, role, tempPassword } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 }
      );
    }

    const passwordToHash = tempPassword || "KavyaPass2026!";
    const passwordHash = await bcrypt.hash(passwordToHash, 10);

    const newUser = await createUser({
      name,
      email,
      passwordHash,
      role: role || "member",
      status: "invited",
    });

    const { passwordHash: _, ...sanitized } = newUser;
    return NextResponse.json({ user: sanitized }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
