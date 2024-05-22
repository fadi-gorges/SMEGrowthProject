import ShareOrganisation from "@/app/(protected)/share/ShareOrganisation"; // Ensure this path is correct
import Main from "@/components/page/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Team Members",
  description: "",
};

const ShareOrganisationPage = () => {
  return (
    <Main>
      <ShareOrganisation />
    </Main>
  );
};

export default ShareOrganisationPage;
