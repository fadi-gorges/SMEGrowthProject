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

const SearchPage = () => {
  
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");

  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => true);
    setOpenAccordion("");
  };
  return (  
    <main className="flex-1 flex flex-col gap-5 px-10 pt-6">
      <h1>Search SME</h1>
      <div className = "simple search">
        <div className="flex items-center gap-2">
        <Input type = "name" placeholder = "Search for highgrowth SME's" />
        <Button type ="submit" onClick={toggleTableVisibility}>Search<SearchIcon></SearchIcon></Button>
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
            <Select>
              <p>Number of Staff</p>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select.." />
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
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Example data - you can replace it with real data when needed */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Company A</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>email@companya.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default SearchPage;

