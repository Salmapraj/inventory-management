import AuthClient from "@/components/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
async function signup() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-md w-full ">
      <AuthClient />
    </div>
  );
}

export default signup;
