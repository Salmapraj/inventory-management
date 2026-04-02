"use client";
import { Products } from "@/types/products";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
function InventoryDash({ products }: { products: Products[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const categories = [...new Set(products.map((p) => p.category))];

  const handleDelete = async (productId: string) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      router.refresh();
    } catch (error) {
      console.log("Failed to delete product");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredProducts = products
  .filter((product) =>product.name.toLowerCase().includes(search.toLowerCase()))
  .filter((p)=>selectedCategory==="All Products"?true: p.category===selectedCategory)

  return (
    <div className=" rounded-xl p-5">
      <div className="mb-6 flex gap-8">
        {/* for search bar  */}

        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          value={search}
          id="search"
          autoComplete="on"
          placeholder="Search products..."
          className="px-3 py-2  border bg-gray-50 border-gray-300 rounded-lg w-64 text-sm focus:ring-1  outline-none "
        />

        <div className="relative inline-block w-36">
          <div
          className="flex justify-evenly gap-2 text-gray-500 text-sm border rounded-lg  bg-gray-50 border-gray-300 p-1">
            <span className=" px-3">{selectedCategory} </span>
            {click ? (
              <ChevronUp
                onClick={() => setClick(false)}
                size={16}
                className="cursor-pointer"
              />
            ) : (
              <ChevronDown
                onClick={() => setClick(true)}
                size={16}
                className="cursor-pointer"
              />
            )}
          </div>
          {click && (
            <div className="absolute top-6 z-10 w-full ">
              <div className=" text-sm text-gray-500   border rounded-br-lg rounded-bl-lg border-gray-300 cursor-pointer bg-gray-50">
                <span  
                        onClick={() => {
                      setSelectedCategory("All Products");
                      setClick(false);
                    }}     
                      className="hover:bg-blue-100 p-2  block"
>All Products</span>
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setClick(false);
                    }}
                    className="hover:bg-blue-100 p-2"
                  >

                    <span className="mb-2  ">
{category}
</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/add-products">
                 <button className="bg-[#1d1f30] text-gray-100 py-2 px-4 rounded-md hover:bg-gray-700">
                   Add Products
                 </button>
                    </Link>
      </div>
      <div className="">
        <table className="w-full text-sm bg-gray-50 border rounded-xl border-gray-300">
          <thead>
            <tr className="border  text-left text-gray-600 border-gray-300 ">
              <th className="py-3 px-2">Product Name</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2"> Price</th>
              <th className="py-3 px-2"> Qty</th>
              <th className="py-3 px-2"> Status</th>
              <th className="py-3 px-2"> Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts?.map((product: Products) => (
              <tr
                key={product._id}
                className="border text-gray-500 text-left border-gray-300  hover:bg-gray-100"
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
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:underline"
                  >
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
