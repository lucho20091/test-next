import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignupForm from "@/components/RegisterForm";
import { LoadingProvider } from "../Providers";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <LoadingProvider>
      <SignupForm />
    </LoadingProvider>
  );
}
