"use client";
import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/");
  }
  return <LoginForm />;
}
export default Login;
