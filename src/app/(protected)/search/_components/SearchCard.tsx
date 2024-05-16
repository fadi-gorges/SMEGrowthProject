'use client'
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { readAllEnterprises } from "@/actions/enterprises/readAllEnterprises";
import { Enterprise } from "@/payload-types";

const populateBusinessesFromServer = async () =>{
  try{
    const response = await readAllEnterprises();
    if(!response.success){
      console.error('Error:', response.error);
      return[];
    }
    const enterprises = response.enterprises;
    const businessesmap = enterprises.map(enterprise => ({
      id: enterprise.id,
      name: enterprise.name,
      industrySector: enterprise.industrySector,
      numEmployees: enterprise.numEmployees,
      contact: enterprise.contact,
      about: enterprise.about,
      growthPotential: enterprise.growthPotential,
      updatedAt: enterprise.updatedAt,
      createdAt: enterprise.createdAt,
      website: enterprise.website,
      location: enterprise.location

    }));
    console.log('Businesses populated:', businesses);
    return businessesmap;
  }
  catch(error){
    console.error('Error:', error);
    return [];
  }
};
var businesses: Enterprise[] = [];

  
type StaffRangeKey = "1-10" | "10-50" | "50-100" | "100-200" | ">250" |"<250" |"Any";
const staffRanges: Record<StaffRangeKey, [number, number]>   = {
  "1-10": [1, 10],
  "10-50": [10, 50],
  "50-100": [50, 100],
  "100-200": [100, 200],  
  ">250": [250, Infinity],
  "<250": [0,250],
  "Any":[0,Infinity]
};
type GrowthPotentialRangeKey = "0-25" | "25-50" | "50-75" | "75-100" | "Any";
const growthPotentialRanges: Record<GrowthPotentialRangeKey, [number, number]> = {
  "0-25": [0, 25],
  "25-50": [25, 50],
  "50-75": [50, 75],
  "75-100": [75, 100],
  "Any": [0, 100]
};
const sectors = ["Any","Technology", "Retail", "Healthcare", "Finance", "Agriculture", "Manufacturing","Construction"];
const isInStaffRange = (count: number, range: StaffRangeKey): boolean => {
  const [min, max] = staffRanges[range];
  return count >= min && count <= max;
};

const isInGrowthPotentialRange = (potential: number, range: GrowthPotentialRangeKey): boolean => {
    const [min, max] = growthPotentialRanges[range];
    return potential >= min && potential <= max;
  };

const SearchCard = () => {
  useEffect(() => {
    populateBusinessesFromServer()
    .then(businessesmap => {
      const businessesArray: Enterprise[] = businessesmap;
      businesses = businessesArray;
    });
  }, [])
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State variable for the search query
  const [selectedStaffRange, setSelectedStaffRange] = useState<StaffRangeKey | "">("");
  const [selectedSector, setSelectedSector] = useState<string| "">("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Enterprise[]>(businesses); // State for filtered business list
  const [selectedGrowthPotentialRange, setSelectedGrowthPotentialRange] = useState<GrowthPotentialRangeKey | "">("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const performSearch = () => {
    
    const results = businesses.filter((business) => {
      const nameMatch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
      const staffMatch = selectedStaffRange ? isInStaffRange(business.numEmployees!, selectedStaffRange) : true;
      const sectorMatch = selectedSector === "Any" || selectedSector === "" || business.industrySector === selectedSector;
      const growthPotentialMatch = selectedGrowthPotentialRange ? isInGrowthPotentialRange(business.growthPotential!, selectedGrowthPotentialRange) : true;
  
      return nameMatch && staffMatch && sectorMatch && growthPotentialMatch;
    });
    const sortedResults = results.sort((a, b) => b.growthPotential! - a.growthPotential!);
    setFilteredBusinesses(sortedResults); // Update the filtered businesses
    setIsTableVisible(true); // Show the table with the search results
    setOpenAccordion("");
  };
  const resetSearch = () => {
    setSearchQuery("");
    setSelectedStaffRange("");
    setSelectedSector("");
    setSelectedGrowthPotentialRange("");
    setFilteredBusinesses(businesses);
    setIsTableVisible(false);
  };
  return (  
    <div className="h-full">
      <div>
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
                  <SelectItem value="100-250">100-200</SelectItem>
                  <SelectItem value="<250">Less than 250</SelectItem>
                  <SelectItem value=">250">Over 250</SelectItem>
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
            <Button type ="button" className="Save Search mt-8 ">Save Search Profile</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      <p>Search Results</p>
      {isTableVisible && (
        <Table className="h-full">
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
                <TableCell>{business.industrySector}</TableCell>
                <TableCell>{business.numEmployees}</TableCell>
                <TableCell>{business.growthPotential}%</TableCell>
                <TableCell><Dialog>
                    <DialogTrigger asChild><Button variant="link">About</Button></DialogTrigger>
                    <DialogContent>
                    <DialogHeader><DialogTitle>About {business.name}</DialogTitle></DialogHeader>
                    <div>Contact: {business.contact}</div>
                    <div>Website: {business.website}</div>
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
    </div>
  );
};

export default SearchCard;