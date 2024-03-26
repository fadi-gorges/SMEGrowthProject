import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "",
};

const SettingsPage = () => {
  return (
    <main className="padding top-margin flex-1 flex flex-col gap-5">
      <h1>Settings</h1>
    </main>
  );
};

export default SettingsPage;
