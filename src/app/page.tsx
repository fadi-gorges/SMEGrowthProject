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
    <main className="padding top-margin flex-1 flex flex-col gap-5">
      <h1>Home Page</h1>
      <h5>You are not logged in.</h5>
    </main>
  );
};

export default HomePage;
