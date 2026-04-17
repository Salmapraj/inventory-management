import "../globals.css";
import Sidebar from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/signup");
  }
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen ">
      <Sidebar session={session?.user} />

<main className="overflow-y-auto min-w-0">
  {children}
</main>
    </div>
  );
}
