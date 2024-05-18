import Main from "@/components/page/Main";
import { Metadata } from "next";
import ProfilesCard from "@/app/(protected)/profiles/_components/ProfilesCard";
export const metadata: Metadata = {
  title: "Manage Profiles",
  description: "",
};

const ManageProfilesPage = () => {
  return (
    <Main padding="small">
      <ProfilesCard/>
    </Main>
  );
};

export default ManageProfilesPage;
