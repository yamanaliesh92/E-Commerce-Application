import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ productId: number }> }
) {
  const params = await props.params;
  try {
    if (!params.productId) {
      return NextResponse.json("ProductId is required", { status: 400 });
    }
    const id = Number(params.productId);

    const { userId, error, status } = await verifyToken(req);

    if (error || !userId) {
      return new NextResponse(error, { status });
    }

    const findProduct = await db.product.findUnique({ where: { id: id } });

    if (!findProduct) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }
    if (findProduct.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
  props: { params: Promise<{ productId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.productId) {
      return NextResponse.json("ProductId is required", { status: 400 });
    }
    const id = Number(params.productId);

    const data = await req.json();

    const { userId, error, status } = await verifyToken(req);

    if (error || !userId) {
      return new NextResponse(error, { status });
    }

    const findProduct = await db.product.findUnique({ where: { id: id } });

    if (!findProduct) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }
    if (findProduct.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updateProduct = await db.product.update({
      where: { id },
      data: data,
    });

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
