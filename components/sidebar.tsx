"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {Session} from "@/types/session"


function Sidebar({session}:{session:Session}) {
  const pathname = usePathname();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/signup"); // redirect to login page
        },
      },
    });
  };

  const {name,image,email}= session
  return (
    <div className="flex justify-between flex-col h-full bg-[#1d1f30]">

    <div className="py-8  px-5 overflow-y-auto bg-[#1d1f30]">
      <h1 className="text-xl text-gray-100  font-semibold mb-5">
        Inventory App
      </h1>
        <div className="flex flex-col justify-between gap-2 ">
          <h2 className="text-gray-400  px-2">Inventory</h2>

          <Link href="/dashboard">
            <div
              className={`flex items-center  gap-3 p-2  cursor-pointer transition duration-200  ease-in-out
${pathname === "/dashboard" ? "bg-gray-500 rounded-lg text-gray-100" : "text-gray-400 hover:text-gray-100 "}              
  `}
            >
              <svg
                className={`w-5 h-5 transition duration-200 ease-in-out

                  `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"></path>
              </svg>{" "}
              <h2
                className={` text-lg
                   `}
              >
                Dashboard
              </h2>
            </div>
          </Link>

          <Link href="/inventory">
            <div
              className={`flex items-center  gap-3 p-2  cursor-pointer transition duration-200 ease-in-out
${pathname === "/inventory" ? "bg-gray-500 rounded-lg text-gray-50" : "text-gray-400 hover:text-gray-200 "}              
                `}
            >
              <svg
                className={`w-5 h-5 transition duration-200 ease-in-out
                  `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M3 10H21V20.0044C21 20.5543 20.5551 21 20.0066 21H3.9934C3.44476 21 3 20.5552 3 20.0044V10ZM9 12V14H15V12H9ZM2 3.99981C2 3.44763 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44372 22 3.99981V8H2V3.99981Z"></path>
              </svg>
              <h2
                className={` text-lg 
                  `}
              >
                Inventory
              </h2>
            </div>
          </Link>

          <Link href="/add-products">
            <div
              className={`flex items-center  gap-3  p-2  cursor-pointer transition duration-200 ease-in-out
              ${pathname === "/add-products" ? "bg-gray-500 rounded-lg text-gray-100" : "text-gray-400 hover:text-gray-100"}              
`}
            >
              <svg
                className="w-6 h-6 transition duration-200 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
              </svg>
              <h2 className="text-lg">Add product</h2>
            </div>
          </Link>

          <Link href="/settings">
            <div
              className={`flex items-center  gap-3  p-2  cursor-pointer transition duration-200 ease-in-out
              ${pathname === "/settings" ? "bg-gray-500 rounded-lg text-gray-100" : "text-gray-400 hover:text-gray-100 "}              
`}
            >
              {" "}
              <svg
                className="w-6 h-5 transition duration-200 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z"></path>
              </svg>
              <h2 className="text-lg">Settings</h2>
            </div>
          </Link>
          <div
            onClick={handleSignOut}
            className="flex items-center  gap-3  p-2 text-gray-400 cursor-pointer transition duration-200 hover:text-gray-100"
          >
            <svg
              className="w-6 h-5 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
            </svg>
            <h2>Logout</h2>
          </div>
        </div>


        </div>

      {/* <div className="absolute  bottom-0 left-0 right-0">
<div className="flex gap-3 py-4  px-5  justify-center bg-gray-900 text-gray-100">
  <span className="bg-gray-200 rounded-xl">{image}</span>
  <span className="text-sm ">{email}
  </span>
</div>
      </div> */}

        <div className="flex gap-3 py-4 px-5 justify-center bg-gray-900 text-gray-100 shrink-0">
    <span className="bg-gray-200 rounded-xl">{image}</span>
    <span className="text-sm">{email}</span>
  </div>


   
    </div>
  );
}

export default Sidebar;
