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
  numberOfStaff: number;
  contact: string;
  about: string;
  growthPotential: number,
}
import { useRouter } from "next/navigation";
import { Enterprises } from "@/payload/collections/Enterprises";

const businesses: Business[] = [
  {
    id: 1,
    name: "TechHelp",
    sector: "Technology",
    numberOfStaff: 75,
    contact: "email@companya.com",
    about:"About test for company A",
    growthPotential: 80,
  },
  {
    id: 2,
    name: "ShopLand",
    sector: "Retail",
    numberOfStaff: 25,
    contact: "contact@companyb.com",
    about:"",
    growthPotential: 30,
  },
  {
    id: 3,
    name: "HospitalCare",
    sector: "Healthcare",
    numberOfStaff: 150,
    contact: "info@companyc.com",
    about:"",
    growthPotential: 90,
  },
  {
    id: 4,
    name: "MoneyHelp",
    sector: "Finance",
    numberOfStaff: 5,
    contact: "support@companyd.com",
    about:"",
    growthPotential: 57,
  },
  {
    id: 5,
    name: "BIG NAME",
    sector: "Finance",
    numberOfStaff: 8,
    contact: "bigname@company.com",
    about:"",
    growthPotential: 23,
  },
  {
    id: 6,
    name: "Something",
    sector: "Agriculture",
    numberOfStaff: 800,
    contact: "nowhere@company.com",
    about:"We plant potatoes on the moon",
    growthPotential: 89,
  },
  {
    id: 7,
    name: "GreenMeadows",
    sector: "Agriculture",
    numberOfStaff: 50,
    contact: "contact@greenmeadows.com",
    about: "Organic farming and sustainable agriculture practices.",
    growthPotential: 23,
  },
  {
    id: 8,
    name: "NextGen IT",
    sector: "Technology",
    numberOfStaff: 100,
    contact: "info@nextgenit.com",
    about: "Leading provider of cloud-based IT solutions.",
    growthPotential: 85,
  },
  {
    id: 9,
    name: "Fashionista",
    sector: "Retail",
    numberOfStaff: 30,
    contact: "support@fashionista.com",
    about: "Trendy clothing and accessories for the modern fashionista.",
    growthPotential: 99,
    
  },
  {
    id: 10,
    name: "HealthFirst",
    sector: "Healthcare",
    numberOfStaff: 200,
    contact: "contact@healthfirst.com",
    about: "Innovative healthcare solutions and patient care.",
    growthPotential: 7,
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
type GrowthPotentialRangeKey = "0-25" | "25-50" | "50-75" | "75-100" | "Any";
const growthPotentialRanges: Record<GrowthPotentialRangeKey, [number, number]> = {
  "0-25": [0, 25],
  "25-50": [25, 50],
  "50-75": [50, 75],
  "75-100": [75, 100],
  "Any": [0, 100], // Define range for "Any"
};
const sectors = ["Any","Technology", "Retail", "Healthcare", "Finance", "Agriculture"];
const isInStaffRange = (count: number, range: StaffRangeKey): boolean => {
  const [min, max] = staffRanges[range];
  return count >= min && count <= max;
};

const isInGrowthPotentialRange = (potential: number, range: GrowthPotentialRangeKey): boolean => {
    const [min, max] = growthPotentialRanges[range];
    return potential >= min && potential <= max;
  };

const SearchCard = () => {
  const router = useRouter();
  

  const [isTableVisible, setIsTableVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State variable for the search query
  const [selectedStaffRange, setSelectedStaffRange] = useState<StaffRangeKey | "">("");
  const [selectedSector, setSelectedSector] = useState<string| "">("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses); // State for filtered business list
  const [selectedGrowthPotentialRange, setSelectedGrowthPotentialRange] = useState<GrowthPotentialRangeKey | "">("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const performSearch = () => {
    const results = businesses.filter((business) => {
      const nameMatch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
      const staffMatch = selectedStaffRange ? isInStaffRange(business.numberOfStaff, selectedStaffRange) : true;
      const sectorMatch = selectedSector === "Any" || selectedSector === "" || business.sector === selectedSector;
      const growthPotentialMatch = selectedGrowthPotentialRange ? isInGrowthPotentialRange(business.growthPotential, selectedGrowthPotentialRange) : true;
  
      return nameMatch && staffMatch && sectorMatch && growthPotentialMatch;
    });
    const sortedResults = results.sort((a, b) => b.growthPotential - a.growthPotential);
    setFilteredBusinesses(sortedResults); // Update the filtered businesses
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
          value={selectedGrowthPotentialRange}
          onValueChange={(val) => setSelectedGrowthPotentialRange(val as GrowthPotentialRangeKey)}
        >
          <p>Growth Potential (%)</p>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select Growth Potential" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="0-25">0-25%</SelectItem>
              <SelectItem value="25-50">25-50%</SelectItem>
              <SelectItem value="50-75">50-75%</SelectItem>
              <SelectItem value="75-100">75-100%</SelectItem>
            </SelectGroup>
          </SelectContent>  
        </Select>
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
              <TableHead>Growth Potential</TableHead>
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
                <TableCell>{business.growthPotential}%</TableCell>
                <TableCell><Dialog>
                    <DialogTrigger asChild><Button variant="link">About</Button></DialogTrigger>
                    <DialogContent>
                    <DialogHeader><DialogTitle>About {business.name}</DialogTitle></DialogHeader>
                    <div>Contact: {business.contact}</div>
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