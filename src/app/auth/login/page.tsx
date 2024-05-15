import LoginForm from "@/app/auth/login/_components/LoginForm";
import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your AusBizGrowth account.",
};

const LoginPage = async () => {
  const user = await getServerUser();

  if (user) redirect("/dashboard");

  return (
    <Main className="justify-center items-center" enableHexBackground>
      <LoginForm />
    </Main>
  );
};

export default LoginPage;
