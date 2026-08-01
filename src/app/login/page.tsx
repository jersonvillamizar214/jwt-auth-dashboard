import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { Controls } from "@/components/ui";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute right-6 top-6">
        <Controls />
      </div>
      <AuthForm mode="login" />
    </main>
  );
}
