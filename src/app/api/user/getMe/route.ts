import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json("internal server error", { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token.value as any,
      process.env.JWT_SECRET_KEY!
    ) as any;

    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return NextResponse.json("User Not Found", { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
