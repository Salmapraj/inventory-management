import DashBoard from "@/components/dashboard";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Products } from "@/model/Product";

async function dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/signup");
  }
 
  await connectDB();
  const products = await Products.find({ userId: session.user.id });
  const totalQuantity = products.length;

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const lowStock = products.filter((product) => product.quantity < 8).length;

  return (
    <div className=" min-h-screen bg-blue-50 py-5 px-3    ">
      <DashBoard
        {...session.user}
        totalVal={totalQuantity}
        totalPrice={totalPrice}
        lowStock={lowStock}
        allProducts={products}
      />
    </div>
  );
}

export default dashboard;
