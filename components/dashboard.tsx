"use client";
import {
  Package,
  TrendingUp,
  DollarSign,
  HandCoins,
  TrendingDown,
  TriangleAlert,
} from "lucide-react";
import NewProductChart from "./newProductchart";
import CategoryPie from "./categoryPie";
import { DashboardProps } from "@/types/dashboardProp";
import Link from "next/link";

function DashBoard({
  email,
  name,
  image,
  totalVal,
  totalPrice,
  lowStock,
  allProducts,
  chartData,
  pieData,
}: DashboardProps) {
  return (
    <div className="p-8      h-full">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-green-800 mb-3">Dashboard</h1>
        <p className="text-lg">
          Welcome to dashboard!
          <span className="ml-2 font-semibold text-green-800">
            {name.toLowerCase()}
          </span>
        </p>
        <p className="text-sm text-gray-400">
          Here's an overview of your inventory
        </p>
      </div>

      {allProducts.length === 0 ? (
        <div className="h-screen items-center  flex flex-col gap-5 justify-center">
          <h1 className="text-3xl text-gray-500 font-medium">
            {" "}
            No Products to show
          </h1>

          <Link href="/add-products">
            <button className="bg-[#1d1f30] text-gray-100 py-2 px-4 rounded-md hover:bg-gray-700">
              Add Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-5 w-full min-w-0">
          <div className="flex flex-col  gap-5 p-2 min-w-0 w-full lg:w-2/3">
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 ">
              <div className="bg-green-100 shadow-gray-300 sm:p-2 lg:p-5 rounded-xl">
                <div className="flex  gap-4 ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="  bg-green-600 p-2 rounded-xl">
                      <Package className="text-gray-200 w-8 h-8 lg:w-10  " />
                    </div>
                    <div className="">
                      <p className="text-lg font-semibold text-gray-700">
                        {totalVal}
                      </p>
                      <span className="text-sm text-gray-400">
                        Total Products
                      </span>
                    </div>
                  </div>
                  {/* Trending chart here */}

                  <div className="flex flex-col justify-center items-center">
                    <TrendingUp size={18} className="text-green-600" />
                    <span className="text-green-600 text-xs">+{totalVal}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 shadow-gray-300 p-2 lg:p-5  rounded-xl">
                <div className="flex gap-4 ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="  bg-blue-600 p-2 rounded-xl">
                      <DollarSign className="text-gray-200 w-8 h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div className="">
                      <p className="text-lg font-semibold text-gray-700">
                        ${totalPrice.toFixed(2)}
                      </p>
                      <span className="text-sm text-gray-400">Total Value</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <HandCoins size={18} className="text-blue-600" />
                    <span className="text-blue-600 text-xs">
                      ${totalPrice.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-100 shadow-gray-300 p-2 lg:p-5   rounded-xl">
                <div className="flex gap-4 ">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="  bg-red-500 p-2 rounded-xl">
                      <TriangleAlert className="text-gray-200   w-8 h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div className="">
                      <p className="text-lg font-semibold text-gray-700">
                        {lowStock}
                      </p>
                      <span className="text-sm text-gray-400">Low Stock</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <TrendingDown size={18} className="text-red-600" />
                    <span className="text-red-600 text-xs">{lowStock}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-2">
              {/* stock levels */}
              <div className="lg:col-span-2 p-3 border border-gray-300 rounded-lg">
                {" "}
                <h1 className="text-sm  font-medium mb-3">Stock Levels</h1>
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 items-center px-2 mb-2 text-sm font-medium text-gray-500">
                  <h1 className="text-center">Product </h1>
                  <h1 className=" text-center">Category</h1>
                  <h1 className=" text-center">Quantity</h1>
                </div>
                <div className="text-sm text-gray-500 ">
                  {allProducts.slice(0, 4).map((product) => (
                    <div
                      key={product._id}
                      className="grid grid-cols-[2fr_1fr_1fr] gap-x-3  rounded-xl bg-gray-100 p-1 items-center mb-3"
                    >
                      <div className="flex gap-3 items-center">
                        <svg
                          className={`w-4 h-4 ${
                            product.quantity === 0
                              ? "text-red-400"
                              : product.quantity < 8
                                ? "text-orange-500"
                                : " text-green-500"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                        </svg>
                        <span>{product.name}</span>
                      </div>

                      <span className="text-center">{product.category}</span>

                      <span
                        className={`text-center ${
                          product.quantity === 0
                            ? "text-red-400"
                            : product.quantity < 8
                              ? "text-orange-500"
                              : "text-green-500"
                        }`}
                      >
                        {product.quantity} units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* low */}
              <div className="lg:col-span-1 p-3 border border-gray-300 rounded-lg">
                {" "}
                <div className="flex gap-5 mb-3 text-center p-1">
                  <h1 className="">Low Stock </h1>
                  <TriangleAlert size={20} className="text-red-500" />
                </div>
                <div className="grid grid-cols-2 mb-3  px-3   text-sm text-gray-500">
                  <span>Products</span>
                  <span className="text-center">Quantity</span>
                </div>
                {/* rows */}
                <div>
                  {allProducts
                    .filter((product) => product.quantity < 8)
                    .map((item) => (
                      <div
                        key={item._id}
                        className="grid grid-cols-2 rounded-xl  bg-gray-100 p-2 mt-3 text-center  text-sm text-gray-500"
                      >
                        <div className="flex items-center  text-sm">
                          <svg
                            className={`w-4 h-4  ${
                              item.quantity === 0
                                ? "text-red-400"
                                : item.quantity < 8
                                  ? "text-orange-500"
                                  : " text-green-500"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                          </svg>

                          <span className="text-sm ">{item.name}</span>
                        </div>
                        <span className="text-red-400">
                          {item.quantity} left
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            {/* area graph here */}
            <div className="w-full overflow-x-auto">
              <NewProductChart data={chartData} />
            </div>
            <div className="w-full overflow-x-auto">
              <CategoryPie data={pieData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
