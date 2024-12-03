import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: number } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json("ProductId is required", { status: 400 });
    }
    const id = Number(params.productId);
    await db.product.delete({ where: { id } });
    return NextResponse.json(
      { message: "delete product is done" },
      { status: 200 }
    );
  } catch (err) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json("ProductId is required", { status: 400 });
    }
    const id = Number(params.productId);

    const data = await req.json();

    const store = await db.product.update({
      where: { id },
      data: data,
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
