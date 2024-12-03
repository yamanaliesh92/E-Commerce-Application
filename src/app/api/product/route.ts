import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { z } from "zod";

// Define a schema for validation using zod
const productSchema = z.object({
  description: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId, error, status } = await verifyToken(req);

    if (error || !userId) {
      return new NextResponse(error, { status });
    }

    const body = await req.json();
    // Parse and validate the request body
    const parsedBody = productSchema.parse(body);

    const save = await db.product.create({
      data: {
        description: parsedBody.description,
        name: parsedBody.name,
        price: parsedBody.price,
        imageUrl: parsedBody.imageUrl,
        userId: userId,
      },
    });

    return NextResponse.json(save);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
