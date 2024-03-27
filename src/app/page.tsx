import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AusBizGrowth",
  description: "",
};

const HomePage = async () => {
  const user = await getServerUser();

  if (user) redirect("/dashboard");

  return (
    <Main>
      <h1>Home Page</h1>
      <h5>You are not logged in.</h5>
    </Main>
  );
};

export default HomePage;
