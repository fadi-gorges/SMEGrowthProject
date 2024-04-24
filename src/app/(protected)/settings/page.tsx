import AccountSettingsCard from "@/app/(protected)/settings/_components/AccountSettingsCard";
import Main from "@/components/page/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "",
};

const AccountSettingsPage = () => {
  return (
    <Main padding="small">
      <AccountSettingsCard />
    </Main>
  );
};

export default AccountSettingsPage;
