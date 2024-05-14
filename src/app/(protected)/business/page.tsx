
import Main from "@/components/page/Main";
import { Metadata } from "next";
import dynamic from 'next/dynamic';
export const metadata: Metadata = {
  title: "Edit Business Details",
  description: "",
};
const AddEnterpriseCard = dynamic(() => import('@/app/(protected)/business/_components/AddEnterpriseCard'), { ssr: false });

const EditBusinessPage = () => {
  return (
    <Main>
      <AddEnterpriseCard />
      
    </Main>
  );
};

export default EditBusinessPage;
