import NotificationSettings from "@/app/(protected)/notifications/_components/NotificationSettings";
import Main from "@/components/page/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "",
};

const NotificationsPage = () => {
  return (
    <Main>
      <NotificationSettings />
    </Main>
  );
};

export default NotificationsPage;
