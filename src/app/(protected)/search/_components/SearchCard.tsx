'use client'
import React, { useState } from "react";
import { RefreshCcwIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { link } from "fs";
interface Business {
  id: number;
  name: string;
  sector: string;
  location: string;
  numberOfStaff: number;
  contact: string;
  about: string;
}
const businesses: Business[] = [
  {
    id: 1,
    name: "TechHelp",
    sector: "Technology",
    location: "Sydney",
    numberOfStaff: 75,
    contact: "email@companya.com",
    about:"About test for company A",
  },
  {
    id: 2,
    name: "ShopLand",
    sector: "Retail",
    location: "Brisbane",
    numberOfStaff: 25,
    contact: "contact@companyb.com",
    about:"",
  },
  {
    id: 3,
    name: "HospitalCare",
    sector: "Healthcare",
    location: "Melbourne",
    numberOfStaff: 150,
    contact: "info@companyc.com",
    about:"",
  },
  {
    id: 4,
    name: "MoneyHelp",
    sector: "Finance",
    location: "Canberra",
    numberOfStaff: 5,
    contact: "support@companyd.com",
    about:"",
  },
  {
    id: 5,
    name: "BIG NAME",
    sector: "Finance",
    location: "Hobart",
    numberOfStaff: 8,
    contact: "bigname@company.com",
    about:"",
  },
  {
    id: 6,
    name: "Something",
    sector: "Agriculture",
    location: "Knowhere",
    numberOfStaff: 800,
    contact: "nowhere@company.com",
    about:"We plant potatoes on the moon",
  },
  {
    id: 7,
    name: "GreenMeadows",
    sector: "Agriculture",
    location: "Perth",
    numberOfStaff: 50,
    contact: "contact@greenmeadows.com",
    about: "Organic farming and sustainable agriculture practices.",
  },
  {
    id: 8,
    name: "NextGen IT",
    sector: "Technology",
    location: "Adelaide",
    numberOfStaff: 100,
    contact: "info@nextgenit.com",
    about: "Leading provider of cloud-based IT solutions.",
  },
  {
    id: 9,
    name: "Fashionista",
    sector: "Retail",
    location: "Gold Coast",
    numberOfStaff: 30,
    contact: "support@fashionista.com",
    about: "Trendy clothing and accessories for the modern fashionista.",
  },
  {
    id: 10,
    name: "HealthFirst",
    sector: "Healthcare",
    location: "Darwin",
    numberOfStaff: 200,
    contact: "contact@healthfirst.com",
    about: "Innovative healthcare solutions and patient care.",
  },
];
type StaffRangeKey = "1-10" | "10-50" | "50-100" | "100-200" | ">200" |"Any";
const staffRanges: Record<StaffRangeKey, [number, number]>   = {
  "1-10": [1, 10],
  "10-50": [10, 50],
  "50-100": [50, 100],
  "100-200": [100, 200],
  ">200": [200, Infinity],
  "Any":[0,Infinity]
};
const sectors = ["Any","Technology", "Retail", "Healthcare", "Finance", "Agriculture"];
const isInStaffRange = (count: number, range: StaffRangeKey): boolean => {
  const [min, max] = staffRanges[range];
  return count >= min && count <= max;
};

const SearchCard = () => {
  
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State variable for the search query
  const [selectedStaffRange, setSelectedStaffRange] = useState<StaffRangeKey | "">("");
  const [selectedSector, setSelectedSector] = useState<string| "">("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses); // State for filtered business list

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const performSearch = () => {
    const results = businesses.filter((business) => {
      const nameMatch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
      const staffMatch = selectedStaffRange ? isInStaffRange(business.numberOfStaff, selectedStaffRange) : true;
      const sectorMatch = selectedSector === "Any" || selectedSector === "" || business.sector === selectedSector;
  
      return nameMatch && staffMatch && sectorMatch;
    });

    setFilteredBusinesses(results); // Update the filtered businesses
    setIsTableVisible(true); // Show the table with the search results
    setOpenAccordion("");
  };
  const resetSearch = () => {
    setSearchQuery("");
    setSelectedStaffRange("");
    setSelectedSector("");
    setFilteredBusinesses(businesses);
    setIsTableVisible(false);
  };
  return (  
    <main className="flex-1 flex flex-col gap-5 px-20 pt-10">
      <div className="border border-gray-100">
      <h1>Search SME</h1>
      <div className = "search">
        <div className="flex items-center gap-2">
        <Input
            type="text"
            placeholder="Search for highgrowth SME's"
            value={searchQuery} // Bind the search query state to the input
            onChange={handleSearchChange} // Handle input changes
          />
        <Button type ="submit" onClick={performSearch}>Search<SearchIcon></SearchIcon></Button>
        </div>
      <Accordion 
        type = "single" 
        collapsible className="w-full" 
        value={openAccordion} // Control which section is open
        onValueChange={(val) => setOpenAccordion(val)} // Update accordion state
      >
        <AccordionItem value="item-1">
          <AccordionTrigger><p>Advanced Options</p></AccordionTrigger>
          <AccordionContent>
            <Select
              value={selectedStaffRange}
              onValueChange={(val) => setSelectedStaffRange(val as StaffRangeKey)}
            >
              <p>Number of Staff</p>
              <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Staff Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="10-50">10-50</SelectItem>
                  <SelectItem value="50-100">50-100</SelectItem>
                  <SelectItem value="100-200">100-200</SelectItem>
                  <SelectItem value=">200">Over 200</SelectItem>
                </SelectGroup>
              </SelectContent>  
            </Select>
            <Select value={selectedSector}
              onValueChange={(val) => setSelectedSector(val)}>
            <p>Industry Sector</p>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
              <SelectGroup>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={resetSearch}>
          Reset<RefreshCcwIcon />
            </Button>
            <Button type ="button" className="Save Search mt-8 ">Save Search Settings</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      <p>Search Results</p>
      {isTableVisible && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Number of Staff</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Learn More</TableHead>
              <TableHead>Save SME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.sector}</TableCell>
                <TableCell>{business.numberOfStaff}</TableCell>
                <TableCell>{business.contact}</TableCell>
                <TableCell><Dialog>
                    <DialogTrigger asChild><Button variant="link">About</Button></DialogTrigger>
                    <DialogContent>
                    <DialogHeader><DialogTitle>About {business.name}</DialogTitle></DialogHeader>
                    <div>{business.about}</div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell><Button type ="button">Save</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      </div>
    </main>
  );
};

export default SearchCard;