import Main from "@/components/page/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "",
};

const AboutPage = () => {
  return (
    <Main>
      <h1>About</h1>
    </Main>
  );
};

export default AboutPage;
