'use client'
import React, { useState } from "react";
import { Metadata } from "next";
import { SearchIcon } from "lucide-react";
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

/*export const metadata: Metadata = {
  title: "Search",
  description: "",
};*/
interface Business {
  id: number;
  name: string;
  sector: string;
  location: string;
  primaryProduct: string;
  primaryService: string;
  numberOfStaff: number;
  contact: string;
}
const businesses: Business[] = [
  {
    id: 1,
    name: "Company A",
    sector: "Technology",
    location: "New York",
    primaryProduct: "Software",
    primaryService: "Consulting",
    numberOfStaff: 75,
    contact: "email@companya.com",
  },
  {
    id: 2,
    name: "Company B",
    sector: "Retail",
    location: "San Francisco",
    primaryProduct: "Clothing",
    primaryService: "Customer Service",
    numberOfStaff: 25,
    contact: "contact@companyb.com",
  },
  {
    id: 3,
    name: "Company C",
    sector: "Healthcare",
    location: "Chicago",
    primaryProduct: "Pharmaceuticals",
    primaryService: "Healthcare",
    numberOfStaff: 150,
    contact: "info@companyc.com",
  },
  {
    id: 4,
    name: "Company D",
    sector: "Finance",
    location: "Los Angeles",
    primaryProduct: "Financial Services",
    primaryService: "Advisory",
    numberOfStaff: 5,
    contact: "support@companyd.com",
  },
  {
    id: 5,
    name: "BIG NAME",
    sector: "Finance",
    location: "Los Angeles",
    primaryProduct: "Financial Services",
    primaryService: "Advisory",
    numberOfStaff: 8,
    contact: "bigname@company.com",
  },
];
type StaffRangeKey = "1-10" | "10-50" | "50-100" | "100-200" | ">200";
type StaffRange = { [key in StaffRangeKey]: [number, number] };
const staffRanges: StaffRange = {
  "1-10": [1, 10],
  "10-50": [10, 50],
  "50-100": [50, 100],
  "100-200": [100, 200],
  ">200": [200, Infinity],
};

const isInStaffRange = (count: number, range: StaffRangeKey): boolean => {
  const [min, max] = staffRanges[range];
  return count >= min && count <= max;
};

const SearchPage = () => {
  
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State variable for the search query
  const [selectedStaffRange, setSelectedStaffRange] = useState<StaffRangeKey | "">("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses); // State for filtered business list

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const performSearch = () => {
    const results = businesses.filter((business) => {
      const nameMatch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
      const staffMatch = selectedStaffRange
        ? isInStaffRange(business.numberOfStaff, selectedStaffRange)
        : true;

      return nameMatch && staffMatch;
    });

    setFilteredBusinesses(results); // Update the filtered businesses
    setIsTableVisible(true); // Show the table with the search results
    setOpenAccordion("");
  };
  return (  
    <main className="flex-1 flex flex-col gap-5 px-20 pt-10">
      <div className="border border-gray-100">
      <h1>Search SME</h1>
      <div className = "simple search">
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
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="10-50">10-50</SelectItem>
                  <SelectItem value="50-100">50-100</SelectItem>
                  <SelectItem value="100-200">100-200</SelectItem>
                  <SelectItem value=">200">Over 200</SelectItem>
                </SelectGroup>
              </SelectContent>  
            </Select>
            <Select>
            <p>Industry Sector</p>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select.." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="a">a</SelectItem>
                  <SelectItem value="b">b</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
            <p>Location</p>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Location..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="a">a</SelectItem>
                  <SelectItem value="b">b</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
            <p>Primary Product</p>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select.." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="a">a</SelectItem>
                  <SelectItem value="b">b</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
            <p>Primary Service</p>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select.." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="a">a</SelectItem>
                  <SelectItem value="b">b</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> 
            <Button type ="button" className="Save Search mt-8" variant={"outline"}>Save Search Settings</Button>
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
              <TableHead>Location</TableHead>
              <TableHead>Number of Staff</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.sector}</TableCell>
                <TableCell>{business.location}</TableCell>
                <TableCell>{business.numberOfStaff}</TableCell>
                <TableCell>{business.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      </div>
    </main>
  );
};

export default SearchPage;

