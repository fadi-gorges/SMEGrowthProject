import SidebarLayout from "@/app/(protected)/_components/SidebarLayout";
import { getServerUser } from "@/lib/utils/getServerUser";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser();

  if (!user?.mobileNumber || !user.jobTitle || !user.userType || !user.picture)
    redirect("/auth/complete");

  if (!user) redirect("/");

  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedLayout;
