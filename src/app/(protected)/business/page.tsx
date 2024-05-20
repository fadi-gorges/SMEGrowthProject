import AddEnterpriseCard from "@/app/(protected)/business/_components/AddEnterpriseCard";
import Main from "@/components/page/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Business Details",
  description: "",
};

const EditBusinessPage = () => {
  return (
    <Main>
      <AddEnterpriseCard />
    </Main>
  );
};

export default EditBusinessPage;
