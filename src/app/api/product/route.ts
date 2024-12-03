import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId, error, status } = await verifyToken(req);

    if (error || !userId) {
      return new NextResponse(error, { status });
    }

    const body = await req.json();
    const save = await db.product.create({
      data: {
        description: body.description,
        name: body.name,
        price: body.price,
        imageUrl: body.imageUrl,
        userId: userId,
      },
    });
    return NextResponse.json(save);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
