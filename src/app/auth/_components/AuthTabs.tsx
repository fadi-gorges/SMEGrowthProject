"use client";
import AuthForm from "@/app/auth/_components/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/auth";

const AuthTabs = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
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
  );
};

export default AuthTabs;
