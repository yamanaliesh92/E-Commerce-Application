import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json(
      {
        message: "All fields are required",
      },
      { status: 400 }
    );
  }

  console.log("email", { email, username, password });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    NextResponse.json({ message: "User already exists" }, { status: 500 });
  }
}
