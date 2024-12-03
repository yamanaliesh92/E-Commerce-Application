import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
interface JwtPayload {
  id: number;
}

const secretKey = process.env.JWT_SECRET_KEY;

export async function verifyToken(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    return { userId: null, error: "Unauthorized", status: 401 };
  }

  try {
    const decoded = jwt.verify(token.value, secretKey as string) as JwtPayload;
    return { userId: decoded.id, error: null, status: 200 };
  } catch (err) {
    return { userId: null, error: "Unauthorized", status: 401 };
  }
}
