<div className="bg-gray-50 grid grid-cols-4 gap-2 p-3 rounded-xl ">          
<div className="col-span-2 p-3">  
                <h1 className="text-  font-medium mb-3">Stock Levels</h1>
                 
                  <div className="grid grid-cols-3 gap-x-3 items-center px-2 mb-2 text-sm font-medium text-gray-500">
                     <h1 className="text-center">Product </h1>
                  <h1 className=" text-center">Category</h1>
                  <h1 className=" text-center">Quantity</h1>
                   </div>
                  <div className="text-sm text-gray-500 ">
                  {allProducts.slice(0, 4).map((product) => (
                    <div
                      key={product._id}
                      className="grid grid-cols-[1fr_1fr_1fr] gap-x-3  rounded-xl bg-gray-100 p-1 items-center mb-3"
                    >
                     

                        <div className="flex gap-2 items-center">
                           <svg
                        className={`w-3 h-3 mr-3 ${
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
             className="grid grid-cols-2 rounded-xl gap-3 bg-gray-100 p-2 mt-3 text-center  text-sm text-gray-500">
                      
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