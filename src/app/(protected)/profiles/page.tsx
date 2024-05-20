import ProfilesCard from "@/app/(protected)/profiles/_components/ProfilesCard";
import Main from "@/components/page/Main";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manage Profiles",
  description: "",
};

const ManageProfilesPage = () => {
  return (
    <Main>
      <ProfilesCard />
    </Main>
  );
};

export default ManageProfilesPage;
