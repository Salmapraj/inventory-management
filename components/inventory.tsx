"use client";
import { Products } from "@/types/products";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  ChevronDown,
  ChevronUp,
  SquarePen,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
function InventoryDash({ products }: { products: Products[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    price: 0,
    quantity: 0.0,
    category: "",
    productId: "",
  });
  const categories = [...new Set(products.map((p) => p.category))];

  // delete product
  const handleDelete = async (productId: string) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      router.refresh();
    } catch (error) {
      console.log("Failed to delete product");
    }
  };

  // update product
  const handleSaveChanges = async(id:string) => {
    try {
     const response= await axios.put(`/api/update/${id}`,editForm);
     console.log('put response',response)
     setEditingProduct(null);
     router.refresh();
    } catch (err) {
      
      console.error('Failed to save changes', err);
      
    }
  };




// filtering products based on search and category
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((p) =>
      selectedCategory === "All Products"
        ? true
        : p.category === selectedCategory,
    );

  const handleEdit = (
    product: Products,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    setEditingProduct(product); //open modal
    setEditForm({
      //pre-fill form with existing data
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: Number(product.quantity),
      productId: product.productId,
      category: product.category,
    });
  };

  return (
    <main className="w-full  rounded-xl p-5 min-w-0">
      <div className="mb-6 grid   items-center   grid-cols-[auto] md:grid-cols-[1fr_auto_auto] gap-4">
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

        <div className="relative inline-block w-36 ">
          <div className="flex justify-evenly gap-2 text-gray-500 text-sm border rounded-lg  bg-gray-50 border-gray-300 p-1">
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
                >
                  All Products
                </span>
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setClick(false);
                    }}
                    className="hover:bg-blue-100 p-2"
                  >
                    <span className="mb-2 ">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/add-products">
          <button className="bg-[#1d1f30] text-sm text-gray-100 py-2 px-3 rounded-md hover:bg-gray-700">
            Add Product
          </button>
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-md text-sm bg-gray-50 border-none rounded-xl ">
          <thead>
            <tr className="  text-left text-gray-600  ">
              <th className="py-3 px-2">Product Name</th>
              <th className="py-3 px-2">SKU</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2"> Price</th>
              <th className="py-3 px-2"> Qty</th>
              <th className="py-3 px-2"> Created At</th>
              <th className="py-3 px-2"> Status</th>
              <th className="py-3 px-2"> Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts?.map((product: Products) => (
              <tr
                key={product._id}
                className=" text-gray-500 text-left   hover:bg-gray-100"
              >
                <td className="py-3 px-2">{product.name}</td>
                <td className="py-3 px-2">{product.productId}</td>

                <td className="py-3 px-2">{product.category}</td>
                <td className="py-3 px-2">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="py-3 px-2">{product.quantity}</td>
                <td className="py-3 px-2">
                  {product?.createdAt?.split("T")[0]}
                </td>

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
                  <SquarePen
                    onClick={(e) => handleEdit(product, e)}
                    size={17}
                    className="text-blue-500 cursor-pointer"
                  />

                  <Trash2
                    onClick={() => handleDelete(product._id)}
                    size={17}
                    className="text-red-400 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal for edit function */}
      {editingProduct && (
        <div
          onClick={() => {
            setEditingProduct(null);
          }}
          className="inset-0 bg-black/40 fixed z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl bg-gray-50 max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h1>Edit</h1>
              <button>
                <XCircle
                  size={22}
                  onClick={() => setEditingProduct(null)}
                  className="hover:text-red-500 cursor-pointer"
                />
              </button>
            </div>

            {/* name prooduct */}
            <div className="mb-5 flex flex-col gap-2">
              <label className="text-gray-600 text-xs">Product Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="text-gray-400  border border-gray-400 p-2 rounded-xl focus:border-gray-500 "
              />
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-4 mb-3">
              <div>
                <label className="text-gray-600 text-xs">SKU</label>
                <input
                  type="text"
                  value={editForm.productId}
                  onChange={(e) =>
                    setEditForm({ ...editForm, productId: e.target.value })
                  }
                  className="text-gray-400 w-full  border border-gray-400 p-2 rounded-xl focus:border-gray-500 "
                />
              </div>

              <div className="">
                <label className="text-gray-600 text-xs">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="text-gray-400 w-full  border border-gray-300 p-2 rounded-xl  "
                >
                  <option value="serum">Serum</option>
                  <option value="moisturizer">Moisturizer</option>
                  <option value="Sunscreen">Sunscreen</option>
                  <option value="cleanser">Cleanser</option>
                  <option value="lipoil">Lip Oil</option>
                  <option value="facemask">Face Mask</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-4 mb-4">
              <div>
                <label className="text-gray-600 text-sm"> Price($)</label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: Number(e.target.value) })
                  }
                  className="w-full text-gray-400  border border-gray-400 p-2 rounded-xl"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm">Quantity</label>
                <input
                  type="number"
                  value={editForm.quantity}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      quantity: Number(e.target.value),
                    })
                  }
                  min={0}
                  className="w-full text-gray-400  border border-gray-400 p-2 rounded-xl focus:border-gray-500 "
                />
              </div>
            </div>

            <p className="text-gray-500 text-xs mr-5">
              status preview:
              <span
                className={`px-3 py-2 rounded-full text-xs font-medium
                  ${
                    editForm.quantity === 0
                      ? "bg-red-100 text-red-600"
                      : editForm.quantity < 8
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
              >
                {editForm.quantity === 0
                  ? "Out of Stock"
                  : editForm.quantity < 8
                    ? "Low Stock"
                    : "In Stock"}
              </span>{" "}
            </p>
            <hr className="text-gray-400  my-3" />
            <div className="flex gap-6">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-sm text-gray-500 border cursor-pointer border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveChanges(editForm._id)}
                className="px-4 py-2 cursor-pointer text-sm bg-[#1d1f30] text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default InventoryDash;
