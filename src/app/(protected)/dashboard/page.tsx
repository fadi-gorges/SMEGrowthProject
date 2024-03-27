import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { User } from "@/payload-types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard • AusBizGrowth",
  description: "",
};

const DashboardPage = async () => {
  const user = (await getServerUser()) as User;

  return (
    <Main>
      <h1>Dashboard</h1>
      <h5>
        You are logged in as <b>{user.email}</b>
      </h5>
    </Main>
  );
};

export default DashboardPage;
