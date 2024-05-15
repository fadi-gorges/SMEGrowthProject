"use client"
import { useState } from 'react';
import { createEnterprise } from '@/actions/enterprises/createEnterprise'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; 
import { toast } from "sonner";
import { enterpriseSchema } from "@/lib/validations/enterprises/enterpriseSchema";
import Papa from 'papaparse'; // Import Papaparse library
const AddEnterpriseCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(enterpriseSchema),
    defaultValues: {
      name: '',
      abn: '',
      industrySector: '',
      numEmployees: '', // Change default value to empty string
      website: '',
      address: '',
      revenue: '', // Change default value to empty string
      valuation: '', // Change default value to empty string
      establishedDate: '', // Change default value to empty string
    }
  });
  
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const processDataFromCsv = (csvData:any) => {
    Papa.parse(csvData, {
      complete: (result:any) => {
        console.log("Parsed CSV data:", result.data);
        // Here you can process the parsed data as needed
        // For example, you can call a function to handle the data
        handleParsedData(result.data);
      },
      error: (error:any) => {
        console.error("Error parsing CSV file:", error);
      }
    });
  };
  const sendCsvDataToBackend = async (csvData: any) => {
    try {
      const enterprises = csvData.slice(1).map((row: any) => ({
        name: row[1], // Adjust index to match the position of the name column
        abn: row[2], // Adjust index to match the position of the ABN column
        industrySector: row[3], // Adjust index to match the position of the industrySector column
        numEmployees: parseInt(row[4]), // Adjust index to match the position of the numEmployees column
        website: row[5], // Adjust index to match the position of the website column
        address: row[6],
        revenue: parseInt(row[7]),
        valuation: parseInt(row[8]),
        establishedDate: row[9] ? new Date(row[9]) : null, // Adjust index to match the position of the establishedDate column
      }));
  
      for (const enterprise of enterprises) {
        const res = await createEnterprise(enterprise);
        console.log("API Response for enterprise:", res);
      }
  
      toast.success("Enterprises created successfully");
    } catch (error) {
      console.error("Error occurred during CSV data submission:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  
  const handleParsedData = (data: any) => {
    console.log("Handling parsed data:", data);
    
    sendCsvDataToBackend(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setShowModal(true);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Handle CSV file processing here
    // Example: Read the file contents and create enterprises
    console.log("File submitted:", file);
    // After processing, close the modal and reset the file state
    setShowModal(false);
    setFile(null);
    processDataFromCsv(file);
  };

  const closeModal = () => {
    setShowModal(false);
    setFile(null);
  };
  const handleChooseFileClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };



  const onSubmit = async (data:any) => {
    console.log("Form submitted with data:", data);
    setIsLoading(true);
  
    try {
      data.numEmployees = parseInt(data.numEmployees);
  data.revenue = parseInt(data.revenue);
  data.valuation = parseInt(data.valuation);
      // Convert establishedDate to a Date object
      data.establishedDate = new Date(data.establishedDate);
  
      const res = await createEnterprise(data);
      console.log("API Response:", res);
      setIsLoading(false);
  
      if (!res.success) {
        toast.error(res.error || 'An error occurred. Please try again.');
        return;
      }
  
      toast.success("Enterprise created successfully");
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  const handleFormSubmit = (e:any) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(methods.getValues()); // Manually handle form submission
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className="mt-8">
        <div className='flex'>

        <h2 className="text-xl font-bold mb-4">Add New Enterprise</h2>
        <h2 className="text-xl ml-auto text-blue-600 underline"onClick={openModal} style={{ cursor: 'pointer' }}>Use csv file...</h2>
        </div>
      
    <p className="text-gray-600 mb-6">Fill in the details to add a new enterprise.</p>
        <div>
          <FormItem>
            <FormLabel>Name:</FormLabel>
            <Input type="text" {...methods.register('name')} required />
          </FormItem>
          <FormItem>
            <FormLabel>ABN:</FormLabel>
            <Input type="text" {...methods.register('abn')} required />
          </FormItem>
          <FormItem>
            <FormLabel>Industry Sector:</FormLabel>
            <Input type="text" {...methods.register('industrySector')} />
          </FormItem>
          <FormItem>
            <FormLabel>Number of Employees:</FormLabel>
            <Input type="number" {...methods.register('numEmployees')} />
          </FormItem>
          <FormItem>
            <FormLabel>Website:</FormLabel>
            <Input type="text" {...methods.register('website')} />
          </FormItem>
          <FormItem>
            <FormLabel>Address:</FormLabel>
            <Input type="text" {...methods.register('address')} />
          </FormItem>
          <FormItem>
            <FormLabel>Revenue:</FormLabel>
            <Input type="number" {...methods.register('revenue')} />
          </FormItem>
          <FormItem>
            <FormLabel>Valuation:</FormLabel>
            <Input type="number" {...methods.register('valuation')} />
          </FormItem>
          <FormItem>
            <FormLabel>Established Date:</FormLabel>
            <Input type="date" {...methods.register('establishedDate')} />
          </FormItem>
          <Button className="mt-10 w-1/3"type="submit" loading={isLoading}>Add Enterprise</Button>
        </div>
      </form>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-xl font-bold mb-4">Using CSV file</h2>
          <div className="flex items-center"> {/* Flex container for button and input */}
            <Button onClick={handleChooseFileClick}>Choose File</Button>
            <input
              id="file-input"
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          
          <span className="ml-5">{file?.name || "No file selected"}</span>
          </div>
          <div className="flex justify-between">
  
            <Button onClick={closeModal} className="mt-4" variant="outline">
              Close
            </Button>
            <Button onClick={handleSubmit} disabled={!file} className="mt-4">
               Confirm
            </Button>
          </div>
        </div>
      </div>
      )}
    </FormProvider>
    
  );
};

export default AddEnterpriseCard;
