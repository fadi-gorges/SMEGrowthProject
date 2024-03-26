import AuthForm from "@/app/auth/_components/AuthForm";
import Main from "@/components/page/Main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <Tabs defaultValue="login" className="w-full max-w-xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="group">
          <AuthForm type="login" />
        </TabsContent>
        <TabsContent value="signup" className="group">
          <AuthForm type="signup" />
        </TabsContent>
      </Tabs>
    </Main>
  );
};

export default AuthPage;
