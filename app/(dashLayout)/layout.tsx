
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
   

        <div className="flex h-screen overflow-hidden">
     {session?.user && <Sidebar session={session.user} />}
  {/* <aside className="lg:w-60 shrink-0 overflow-y-auto">
  </aside> */}

  <main className="flex-1 overflow-y-auto">
    {children}
  </main>
</div>
  );
}
