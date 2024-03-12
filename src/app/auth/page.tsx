import AuthForm from "@/app/auth/_components/AuthForm";
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
    <div className="flex-1 flex flex-col justify-center items-center">
      <Tabs defaultValue="login" className="w-[90%] max-w-lg">
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
    </div>
  );
};

export default AuthPage;
