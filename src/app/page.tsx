import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const HomePage = async () => {
  const user = await getServerUser();

  return (
    <Main>
      <h1>Home Page</h1>
      <h5>
        {user ? (
          <>
            You are signed in as <b>{user.email}</b>
          </>
        ) : (
          "You are not logged in."
        )}
      </h5>
    </Main>
  );
};

export default HomePage;
