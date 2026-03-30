import InventoryDash from "@/components/inventory";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import { Products } from "@/model/Product";

async function Inventory() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  await connectDB();
  const rawproducts = await Products.find({ userId: session?.user.id }).lean();

  const products = rawproducts.map((p) => ({
    ...p,
    _id: p._id.toString(), // ObjectId → string
    createdAt: p.createdAt?.toISOString(), // Date → string
    updatedAt: p.updatedAt?.toISOString(),
  }));
console.log("products",products)
  return (
    <div className=" min-h-screen bg-blue-50 py-7 px-6    ">
      <InventoryDash  products={products}/>
    </div>
  );
}

export default Inventory;
