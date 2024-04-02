import { Metadata } from "next";
import {
  SearchIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input"
export const metadata: Metadata = {
  title: "Search",
  description: "",
};

const SearchPage = () => {
  return (
    <main className="padding top-margin flex-1 flex flex-col gap-5">
      
      <h1>Search SME</h1>
      <Input type = "name" placeholder = "Search for highgrowth SME's" />
      <button><SearchIcon></SearchIcon></button>
      <table>
        <text>test search</text>
      </table>
      
    </main>
  );
};

export default SearchPage;
