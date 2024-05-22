import AuthTabs from "@/app/auth/_components/AuthTabs";
import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log In",
  description: "",
};

const AuthPage = async () => {
  const user = await getServerUser();

  if (user) redirect("/");

  return (
    <Main className="items-center">
      <AuthTabs />
    </Main>
  );
};

export default AuthPage;
