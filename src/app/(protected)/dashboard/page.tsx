import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import DashboardPage from "@/app/(protected)/dashboard/dashboardCard";
import { User } from "@/payload-types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard • AusBizGrowth",
  description: "View real-time data on enterprises",
};

const Dashboard = () => {
    return(
      <Main>
        <DashboardPage/>
      </Main>
    );

  }

export default Dashboard;
