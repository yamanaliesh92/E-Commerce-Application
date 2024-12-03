import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Define a schema for validation using zod
const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

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
      return NextResponse.json(
        { message: "User already exists" },
        { status: 500 }
      );
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
