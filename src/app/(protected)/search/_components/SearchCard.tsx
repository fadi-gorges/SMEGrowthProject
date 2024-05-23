"use client";
import { setEngagement } from "@/actions/engagements/setEngagement";
import { readAllEnterprises } from "@/actions/enterprises/readAllEnterprises";
import { createSearchProfile } from "@/actions/searchProfiles/createSearchProfile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Enterprise } from "@/payload-types";
import { RefreshCcwIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const populateBusinessesFromServer = async () => {
  try {
    const response = await readAllEnterprises();
    if (!response.success) {
      console.error("Error:", response.error);
      return [];
    }
    const enterprises = response.enterprises;
    const businessesmap = enterprises.map((enterprise) => ({
      id: enterprise.id,
      name: enterprise.name,
      manufacturer: enterprise.manufacturer,
      numEmployees: enterprise.numEmployees,
      suburb: enterprise.suburb,
      description: enterprise.description,
      growthPotential: enterprise.growthPotential,
      updatedAt: enterprise.updatedAt,
      createdAt: enterprise.createdAt,
      website: enterprise.website,
      postCode: enterprise.postCode,
      industrySector: enterprise.industrySector
    }));
    console.log("Businesses populated:", businesses);
    return businessesmap;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
var businesses: Enterprise[] = [];

type StaffRangeKey =
  | "1-10"
  | "10-50"
  | "50-100"
  | "100-200"
  | ">200"
  | "<200"
  | "Any";
const staffRanges: Record<StaffRangeKey, [number, number]> = {
  "1-10": [1, 10],
  "10-50": [10, 50],
  "50-100": [50, 100],
  "100-200": [100, 200],
  ">200": [200, Infinity],
  "<200": [0, 200],
  Any: [0, Infinity],
};
type GrowthPotentialRangeKey = "0-25" | "25-50" | "50-75" | "75-100" | "Any";
const growthPotentialRanges: Record<GrowthPotentialRangeKey, [number, number]> =
  {
    "0-25": [0, 25],
    "25-50": [25, 50],
    "50-75": [50, 75],
    "75-100": [75, 100],
    Any: [0, 100],
  };
const statesAndTerritories = [
  "Any",
  "New South Wales",
  "Victoria",
  "Queensland",
  "South Australia",
  "Western Australia",
  "Tasmania",
  "Northern Territory",
  "Australian Capital Territory",
];
const sectors = ["Any","Technology", "Retail", "Healthcare", "Finance", "Agriculture", "Manufacturing","Construction"];
const isInStaffRange = (count: number, range: StaffRangeKey): boolean => {
  const [min, max] = staffRanges[range];
  return count >= min && count <= max;
};

const isInGrowthPotentialRange = (
  potential: number,
  range: GrowthPotentialRangeKey
): boolean => {
  const [min, max] = growthPotentialRanges[range];
  return potential >= min && potential <= max;
};

const SearchCard = () => {
  useEffect(() => {
    populateBusinessesFromServer().then((businessesmap) => {
      const businessesArray: Enterprise[] = businessesmap;
      businesses = businessesArray;
    });
  }, []);
  const [searchProfileName, setSearchProfileName] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [postcodeQuery, setpostcodeQuery] = useState("");
  const [selectedStaffRange, setSelectedStaffRange] = useState<
    StaffRangeKey | ""
  >("");
  const [selectedSector, setSelectedSector] = useState<string | "">("");
  const [filteredBusinesses, setFilteredBusinesses] =
    useState<Enterprise[]>(businesses); // State for filtered business list
  const [selectedGrowthPotentialRange, setSelectedGrowthPotentialRange] =
    useState<GrowthPotentialRangeKey | "">("");
  const [selectedState, setSelectedState] = useState<string | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState<string[]>([]);
  const saveBusiness = (businessId: string) => {
    const data = {
      enterprise: businessId,
      contacted: false,
      connected: false,
      engaged: false,
    };
    setEngagement(data);
    setSavedBusinesses((prevState) => {
      if (prevState.includes(businessId)) {
        return prevState.filter((id) => id !== businessId);
      } else {
        return [...prevState, businessId];
      }
    });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handlepostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpostcodeQuery(e.target.value);
  };
  const handleSearchProfileNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchProfileName(e.target.value);
  };
  const performSearch = () => {
    const results = businesses.filter((business) => {
      const nameMatch = business.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const postcodeMatch =
        !postcodeQuery || business.postCode?.toString().includes(postcodeQuery);
      const staffMatch = selectedStaffRange
        ? isInStaffRange(business.numEmployees!, selectedStaffRange)
        : true;
      const sectorMatch =
        selectedSector === "Any" ||
        selectedSector === "" || 
        business.industrySector?.toLowerCase() === selectedSector.toLowerCase();
      const growthPotentialMatch = selectedGrowthPotentialRange
        ? isInGrowthPotentialRange(
            business.growthPotential!,
            selectedGrowthPotentialRange
          )
        : true;

      return (
        nameMatch &&
        staffMatch &&
        sectorMatch &&
        growthPotentialMatch &&
        postcodeMatch
      );
    });
    const sortedResults = results.sort(
      (a, b) => b.growthPotential! - a.growthPotential!
    );
    setFilteredBusinesses(sortedResults); // Update the filtered businesses
    setIsTableVisible(true); // Show the table with the search results

  };
  const resetSearch = () => {
    setSearchQuery("");
    setSelectedStaffRange("");
    setSelectedSector("");
    setSelectedGrowthPotentialRange("");
    setpostcodeQuery("");
    setFilteredBusinesses(businesses);
    setIsTableVisible(false);
  };
  const makeSearchProfile = async () => {
    if (postcodeQuery == "") {
      var postcodeQ = 0;
    } else {
      var postcodeQ: number = +postcodeQuery;
    }
    const data = {
      name: searchProfileName,
      searchQuery: searchQuery,
      industrySector: selectedSector,
      employeesRange: selectedStaffRange,
      growthPotentialRange: selectedGrowthPotentialRange,
      postcode: postcodeQ || undefined,
    };

    const response = await createSearchProfile(data);

    if (response.success) {
      alert("Search profile created successfully");
      setIsDialogOpen(false);
    } else {
      alert("Error creating search profile: " + response.error);
    }
  };
  return (
    <div className="h-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <div className="search">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Use ABN or web URL to search for a specific business"
              value={searchQuery} // Bind the search query state to the input
              onChange={handleSearchChange} // Handle input changes
            />
            <Button type="submit" onClick={performSearch}>
              Search<SearchIcon></SearchIcon>
            </Button>
          </div>
          <Accordion
            type="single"
            className="w-full pt-4"
            value="item-1" 
          >
            <AccordionItem value="item-1">
              <AccordionContent>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p>Growth Potential (%)</p>
                    <Select
                      value={selectedGrowthPotentialRange}
                      onValueChange={(val) =>
                        setSelectedGrowthPotentialRange(
                          val as GrowthPotentialRangeKey
                        )
                      }
                    >
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
                  </div>
                  <div>
                    <p>Number of Staff</p>
                    <Select
                      value={selectedStaffRange}
                      onValueChange={(val) =>
                        setSelectedStaffRange(val as StaffRangeKey)
                      }
                    >
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
                          <SelectItem value="<200">Less than 200</SelectItem>
                          <SelectItem value=">200">Over 200</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p>Industry Sector</p>
                    <Select
                      value={selectedSector}
                      onValueChange={(val) => setSelectedSector(val)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Sector" />
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
                  </div>
                  <div>
                    <p>State/Territory</p>
                    <Select
                      value={selectedState}
                      onValueChange={(val) => setSelectedState(val)}
                    >
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select State/Territory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statesAndTerritories.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p>Postcode</p>
                    <Input
                      type="text"
                      placeholder="Search by postcode..."
                      className="w-[180px]"
                      value={postcodeQuery} // Bind the search query state to the input
                      onChange={handlepostcodeChange} // Handle input changes
                    />
                  </div>
                </div>
                <div className="mt-4 space-x-2">
                  <Button onClick={resetSearch}>
                    Reset
                    <RefreshCcwIcon />
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button type="button">Save Search Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Search Profile</DialogTitle>
                      </DialogHeader>
                      <div>
                        Add a name:{" "}
                        <Input onChange={handleSearchProfileNameChange}></Input>
                      </div>
                      <div>
                        Growth Potential: {selectedGrowthPotentialRange}
                      </div>
                      <div>Number of Staff: {selectedStaffRange}</div>
                      <div>Industry Sector: {selectedSector}</div>
                      <div>State/Territory: {selectedState}</div>
                      <div>Postcode: {postcodeQuery}</div>
                      <div>Search Query: {searchQuery}</div>
                      <Button onClick={makeSearchProfile}>Save</Button>
                    </DialogContent>
                  </Dialog>
                </div>
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
                <TableHead>Industry Sector</TableHead>
                <TableHead>Number of Staff</TableHead>
                <TableHead>Growth Potential</TableHead>
                <TableHead>Learn More</TableHead>
                <TableHead>Add to Dashboard</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>{business.name}</TableCell>
                  <TableCell>{business.industrySector}</TableCell>
                  <TableCell>{business.numEmployees}</TableCell>
                  <TableCell>{business.growthPotential}%</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link">About</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>About {business.name}</DialogTitle>
                        </DialogHeader>
                        <div>Suburb: {business.suburb}</div>
                        <div>Website: {business.website}</div>
                        <div>Postcode: {business.postCode} </div>
                        <div>{business.description}</div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      onClick={() => saveBusiness(business.id)}
                    >
                      {savedBusinesses.includes(business.id) ? "Added" : "Add"}
                    </Button>
                  </TableCell>
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
