import SignupFlow from "@/app/auth/signup/_components/SignupFlow";
import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up to get started with our Australian Business Growth Recommender Platform.",
};

const SignupPage = async () => {
  const user = await getServerUser();

  if (user) redirect("/dashboard");

  return (
    <Main className="justify-center items-center" enableHexBackground>
      <SignupFlow />
    </Main>
  );
};

export default SignupPage;
