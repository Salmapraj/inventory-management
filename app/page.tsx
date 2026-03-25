import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {

const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex  min-h-screen  items-center justify-center">
      <div className="container  mx-auto px-4 py-8 text-center text-gray-800">
        <h1 className="text-4xl font-bold mb-6 ">Inventory Management</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Streamline your inventory tracking with our powerful, easy-to-use
          management system. Keep your stock organized and up-to-date
          effortlessly.
        </p>

        <div className="flex gap-6 justify-center mt-14">
          <Link href="/signup">
            <button className="bg-purple-800 text-md font-medium text-gray-50 py-3 hover:bg-purple-700 cursor-pointer px-8 hover:bg rounded-xl">
              Sign In
            </button>
          </Link>
          <Link href="/learnmore">
            <button className="bg-gray-50 text-md font-medium cursor-pointer px-8 text-purple-900 hover:bg-gray-100  py-3 border border-purple-700 rounded-xl">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
