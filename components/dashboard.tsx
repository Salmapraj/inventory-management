"use client";
import {
  Package,
  TrendingUp,
  DollarSign,
  HandCoins,
  TrendingDown,
  TriangleAlert,
} from "lucide-react";

interface Session {
  email: string;
  name: string;
  image?: string | null | undefined;
}

interface Products {
  _id: number;
  name: string;
  price: string;
  quantity: number;
  category: string;
  lowStock: string;
}

interface DashboardProps extends Session {
  totalVal: number;
  totalPrice: number;
  lowStock: number;
  allProducts: Products[];
}

function DashBoard({
  email,
  name,
  image,
  totalVal,
  totalPrice,
  lowStock,
  allProducts,
}: DashboardProps) {
  return (
    <div className=" min-h-screen ">
      <div className="p-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800 mb-3">
            Dashboard
          </h1>
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

        <div className="grid grid-cols-3 gap-5 p-2">
          <div className="bg-green-100 shadow-gray-300 p-5 rounded-xl">
            <div className="flex  justify-between">
              <div className="flex gap-4 items-center justify-center">
                <div className="  bg-green-600 p-2 rounded-xl">
                  <Package size={29} className="text-gray-200" />
                </div>
                <div className="">
                  <p className="text-lg font-semibold text-gray-700">
                    {totalVal}
                  </p>
                  <span className="text-sm text-gray-400">Total Products</span>
                </div>
              </div>
              {/* Trending chart here */}
              <div className="flex flex-col justify-center items-center">
                <TrendingUp size={18} className="text-green-600" />
                <span className="text-green-600 text-xs">+{totalVal}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 shadow-gray-300 p-5  rounded-xl">
            <div className="flex  justify-between">
              <div className="flex gap-4 items-center justify-center">
                <div className="  bg-blue-600 p-2 rounded-xl">
                  <DollarSign size={29} className="text-gray-200" />
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

          <div className="bg-red-100 shadow-gray-300 p-5   rounded-xl">
            <div className="flex  justify-between">
              <div className="flex gap-4 items-center justify-center">
                <div className="  bg-red-500 p-2 rounded-xl">
                  <TriangleAlert size={29} className="text-gray-200" />
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

          <div className="bg-gray-50 grid rounded-xl col-span-2">
            <div className="p-5">
              <h1 className="text-lg  font-medium mb-5">Stock Levels</h1>
              <div className="flex justify-between ml-3 items-center">
                <h1 className="w-1/3">Product </h1>
                <h1 className="w-1/3 text-center">Category</h1>
                <h1 className="w-1/3 text-center">Quantity</h1>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {allProducts.slice(0,3).map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between rounded-xl bg-gray-100 p-1 items-center mb-3"
                  >

                  <svg className={`w-3 h-3 mr-3 ${
                  product.quantity<8?"text-red-400":"text-green-500"}`}
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>
                   
                    <div className="w-1/3 ">
                      <span>{product.name}</span>
                    </div>

                    <div className="w-1/3 text-center">
                      <span>{product.category}</span>
                    </div>

                    <div className="w-1/3 text-center">
                      <span className={` ${
                  product.quantity<8?"text-red-400":"text-green-500"}`}>{product.quantity} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
