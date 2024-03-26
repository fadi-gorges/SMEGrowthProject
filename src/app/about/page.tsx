import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "",
};

const AboutPage = () => {
  return (
    <main className="padding top-margin flex-1 flex flex-col gap-5">
      <h1>About</h1>
    </main>
  );
};

export default AboutPage;
