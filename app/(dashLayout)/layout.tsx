
import "../globals.css";
import Sidebar from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
   
        // <div className="flex min-h-screen overflow-hidden">

        //   <div className="w-30 md:w-60 bg-gray-100 shrink-0 h-screen overflow-y-auto">
        //     {session?.user && <Sidebar session={session.user} />}
        //   </div>

          
        //   <div className="flex-1 bg-gray-100 h-full overflow-y-auto">
        //     {children}
        //   </div>
        // </div>

        <div className="flex h-screen overflow-hidden">
  <aside className="w-30 md:w-60 shrink-0 overflow-y-auto">
     {session?.user && <Sidebar session={session.user} />}
  </aside>

  <main className="flex-1 overflow-y-auto">
    {children}
  </main>
</div>
  );
}
