import DashboardPage from "@/app/(protected)/dashboard/dashboardCard";
import Main from "@/components/page/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard • AusBizGrowth",
  description: "View real-time data on enterprises",
};

const Dashboard = () => {
  return (
    <Main>
      <DashboardPage />
    </Main>
  );
};

export default Dashboard;
