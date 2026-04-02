import DashBoard from "@/components/dashboard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { connectDB } from "@/lib/db";
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
  const rawproducts = await Products.find({ userId: session.user.id }).lean();

  const products = rawproducts.map((p) => ({
    ...p,
    _id: p._id.toString(), // ObjectId → string
    createdAt: p.createdAt?.toISOString(), // Date → string
    updatedAt: p.updatedAt?.toISOString(),
  }));
  const totalQuantity = products.length;

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const lowStock = products.filter((product) => product.quantity < 8).length;

  const chartData = products.reduce(
    (acc, product) => {
      const date = new Date(product.createdAt).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
      const existing = acc.find(
        (item: { date: string; products: number }) => item.date === date,
      );
      if (existing) {
        existing.products += 1;
      } else {
        acc.push({ date, products: 1 });
      }
      return acc;
    },
    [] as { date: string; products: number }[],
  );

  const categoryMap = products.reduce(
    (acc, product) => {
      const category = product.category;
      if (acc[category]) {
        acc[category] = (acc[category] || 0) + product.quantity;
      } else {
        acc[category] = product.quantity;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieChartData = Object.entries(
    categoryMap as Record<string, number>,
  ).map(([name, value]) => ({
    name,
    value,
  }));


  return (
    <div className="bg-blue-50 py-5     ">
      <DashBoard
        {...session.user}
        totalVal={totalQuantity}
        totalPrice={totalPrice}
        lowStock={lowStock}
        allProducts={products}
        chartData={chartData}
        pieData={pieChartData}
      />
    </div>
  );
}

export default dashboard;
