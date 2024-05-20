import CompleteSignupForm from "@/app/auth/complete/_components/CompleteSignupForm";
import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Complete Signup",
  description: "",
};

const CompleteSignupPage = async () => {
  const user = await getServerUser();

  if (!user) redirect("/");

  if (user.signupComplete) redirect("/dashboard");

  return (
    <Main className="justify-center items-center" enableHexBackground>
      <CompleteSignupForm />
    </Main>
  );
};

export default CompleteSignupPage;
