"use client";

import axios from "axios";
import { useState } from "react";

function AddProducts() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    try {
      const response = await axios.post(`/api/add`, formData);
      console.log("form submiited");
      setPname("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setLowStock("8");
      setSku("");
    } catch (err) {
      console.log(err);
    }
  };

  const [pname, setPname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lowStock, setLowStock] = useState("8");
  const [sku, setSku] = useState("");
  const formData = {
    name: pname,
    category: category,
    price: price,
    quantity: quantity,
    lowStock: lowStock,
    productId: sku,
  };
  return (
    <div className="p-5 ">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-green-800">
          Add New Product
        </h1>
        <p className="text-sm text-gray-400">
          Fill in the details to add a new product
        </p>
      </div>

      {/* Form */}
      <div className="flex justify-center">
        <div className="bg-white   rounded-xl p-8 max-w-lg">
          <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col gap-5  "
          >
            {/* Product Name */}
            <div className="flex flex-col gap-1 ">
              <label className="text-sm font-medium text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. COSRX Snail Essence"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
                required
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border text-gray-500 border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300 bg-white"
              >
                <option value="">Select a category</option>
                <option value="Essence">Essence</option>
                <option value="Serum">Serum</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Cleanser">Cleanser</option>
                <option value="Sunscreen">Sunscreen</option>
                <option value="Toner">Toner</option>
                <option value="Lip oil">Lip oil</option>
                <option value="Mask">Mask</option>
              </select>
            </div>

            {/* Price and Quantity side by side */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            {/* SKU */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                SKU
                <span className="text-gray-400 font-normal ml-1">
                  (Optional)
                </span>
              </label>
              <p className="text-xs text-gray-400">
                Unique identifier for your product
              </p>
              <input
                type="text"
                placeholder="e.g. COS-SNL-001"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Low Stock Threshold */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Low Stock Alert
              </label>
              <p className="text-xs text-gray-400">
                Get alerted when quantity drops below this number
              </p>
              <input
                type="number"
                placeholder="e.g. 10"
                value={lowStock}
                onChange={(e) => setLowStock(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end mt-2">
              <button className="px-5 py-2 rounded-lg text-sm text-gray-500 border border-gray-200 hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-sm text-white bg-green-600 hover:bg-green-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
