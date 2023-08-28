import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { SignIn } from "~/components/auth";

export const LoginPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <SignIn provider="discord" className={"w-48"} />
    </main>
  );
};

export default LoginPage;
