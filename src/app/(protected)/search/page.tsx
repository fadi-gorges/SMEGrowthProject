import { Metadata } from "next";
import SearchCard from "@/app/(protected)/search/_components/SearchCard";
import Main from "@/components/page/Main";
export const metadata: Metadata = {
  title: "Search",
  description: "",
};


const SearchPage = () => {
  return(
    <Main padding="small">
      <SearchCard/>
    </Main>
  );
  
};

export default SearchPage;

