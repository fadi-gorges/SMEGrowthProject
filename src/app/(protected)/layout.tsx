import SidebarLayout from "@/app/(protected)/_components/SidebarLayout";
import { getServerUser } from "@/lib/utils/getServerUser";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser();

  if (!user) redirect("/");

  if (!user.signupComplete) redirect("/auth/complete");

  if (!user.paymentSuccessful) redirect("/auth/payment");

  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedLayout;
