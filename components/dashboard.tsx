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


function DashBoard({
  email,
  name,
  image,
  totalVal,
  totalPrice,
  lowStock,
  allProducts,
  chartData,
  pieData
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





<div className="flex">

        <div className="flex  flex-col  gap-5 p-2">

          <div className="flex gap-4">
          <div className="bg-green-100 shadow-gray-300 p-5 rounded-xl">
            <div className="flex  justify-between  gap-4">
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
            <div className="flex gap-4 justify-between">
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
            <div className="flex gap-4  justify-between">
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
</div>
          


          <div className="bg-gray-50 grid grid-[2fr_1fr] gap-2 p-3 rounded-xl ">          
<div className="col-span-1 p-3">  
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
                        <span>
                           {product.name}
                          </span> 
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

<div className="col-span-1 p-3  rounded-xl"> 
                  <div className="flex gap-5 mb-3 text-center p-1">
                  <h1 className="">Low Stock </h1>
                  <TriangleAlert size={20} className="text-red-500" />
                </div>

                <div className="grid grid-cols-2 mb-3  px-3   text-sm text-gray-500">
                  <span>Products</span>
                  <span className="text-center">Quantity</span>
                </div>
                {/* rows */}

                 <div >
                   {allProducts
                    .filter((product) => product.quantity < 8)
                    .map((item) => (
                      <div
                        key={item._id}
             className="grid grid-cols-2 rounded-xl  bg-gray-100 p-2 mt-3 text-center  text-sm text-gray-500">
                      
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

                        <span className='text-sm '>{item.name}</span>
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



        <div className="flex-1">
{/* area graph here */}
          <div className='flex flex-col gap-5'>
             <NewProductChart data={chartData} />
             <CategoryPie data={pieData}/>
          </div>
        </div>
</div>

      </div>
    </div>
  );
}

export default DashBoard;
