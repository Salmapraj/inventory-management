"use client";
import { Products } from "@/types/products";

function InventoryDash({ products }: { products: Products[] }) {
  return (
    <div className=" rounded-xl p-5">
      <div className="mb-6 flex gap-8">
        {/* for search bar  */}

        <input
          type="text"
          placeholder="Search products..."
          className="px-3 py-2 rounded-lg w-64 text-sm focus:ring-2  outline-none "
        />
        <button>Add Product</button>
      </div>
      <div className="">
        <table className="w-full text-sm">
          <thead>
            <tr className="border  text-left border-gray-300 ">
              <th className="py-3 px-2">Product Name</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2"> Price</th>
              <th className="py-3 px-2"> Qty</th>
              <th className="py-3 px-2"> Status</th>
              <th className="py-3 px-2"> Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border  text-left border-gray-300  hover:bg-gray-100"
              >
                <td className="py-3 px-2">{product.name}</td>
                <td className="py-3 px-2">{product.category}</td>
                <td className="py-3 px-2">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="py-3 px-2">{product.quantity}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-3 py-2 rounded-full text-xs font-medium
                  ${
                    product.quantity === 0
                      ? "bg-red-100 text-red-600"
                      : product.quantity < 8
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                  >
                    {product.quantity === 0
                      ? "Out of Stock"
                      : product.quantity < 8
                        ? "Low Stock"
                        : "In Stock"}
                  </span>
                </td>

                <td className="py-3 px-2 flex gap-4">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryDash;
