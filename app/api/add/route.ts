import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { Products } from "@/model/Product";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.json();
    console.log("formdata is", formdata);

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return NextResponse.json({ error: "User is not authorized" });

    await connectDB();
    const newProduct = await Products.create({
      name: formdata.name,
      userId: session?.user.id,
      price: Number(formdata.price),
      quantity: Number(formdata.quantity),
      lowStock: Number(formdata.lowStock),
      category: formdata.category, // ← add this
      productId: formdata.productId
    });
    return NextResponse.json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
