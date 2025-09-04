import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LoadingProvider } from "../Providers";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <LoadingProvider>
      <LoginForm />
    </LoadingProvider>
  );
}
