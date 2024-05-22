"use client"
import { useState , useRef } from 'react';
import { createEnterprise } from '@/actions/enterprises/createEnterprise'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; 
import { toast } from "sonner";
import { enterpriseSchema } from "@/lib/validations/enterprises/enterpriseSchema";
import Papa from 'papaparse'; // Import Papaparse library

import { Row } from 'react-day-picker';
const AddEnterpriseCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(enterpriseSchema),
    defaultValues: {
      name: '',
      abn: '',
      numEmployees: '', // Change default value to empty string
      website: '',
      suburb: '',
      postCode: '', // Change default value to empty string
      sme: '', // Change default value to empty string
      industrySector: '',
      manufacturer: '', // Change default value to empty string
      growthPotential: '',
      description:'',
    }
  });
  //get random number for numemployee and growth
  const getRandomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  //processing data for csv
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
    const convertToBoolean = (value: any) => {
      if (typeof value === 'string') {
        if (value.toLowerCase() === 'yes') {
          return true;
        } else if (value.toLowerCase() === 'no') {
          return false;
        }
      }
      return null; // In case the value is neither 'yes' nor 'no' or not a string
    };
    const getRandomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
    try {
      const enterprises = csvData.map((row: any) => {
        console.log(row);
        const sme = convertToBoolean(row[2]);
        const manufacturer = convertToBoolean(row[3])
        const abn = row[1] ? row[1].replace(/\s+/g, '') : undefined;
        console.log(row[2])
        const industrySector= null;
        return {
        
          name: row[0], 
          abn: abn,

          
          sme:sme, 
          manufacturer: manufacturer,
          website: row[4], 
          suburb: row[5],
          postCode: row[6] ? parseInt(row[6]) : null,
          description: row[7],
          numEmployees: sme ? getRandomNumberInRange(1, 250) : null,
          growthPotential: getRandomNumberInRange(1, 100),
          industrySector :industrySector,
        };
      });
  
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
      data.postCode = data.postCode ? parseInt(data.postCode, 10) : null;
      data.numEmployees = data.sme ? getRandomNumberInRange(1, 250) : null;
      data.growthPotential= getRandomNumberInRange(1, 100);
      data.manufacturer = data.manufacturer !== "" ? data.manufacturer : false;
      data.sme = data.sme !== "" ? data.sme : false;
      data.industrySector = data.industrySector;
      const res = await createEnterprise(data);
      console.log("API Response:", res);
      setIsLoading(false);
  
      if (!res.success) {
        toast.error(res.error || 'An error occurred. Please try again.');
        return;
      }
  
      toast.success("Enterprise created successfully");
      if (formRef.current) {
        formRef.current.reset!();
      }
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
      <form ref={formRef} onSubmit={handleFormSubmit} className="mt-8">
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
          <FormItem className="mb-4">
        <FormLabel>Industry:</FormLabel>

        <select {...methods.register('industrySector')} required>
          <option value="">Select industry</option>
          <option value="manufacturer">Manufacturer</option>
          <option value="retail">Retail</option>
          <option value="finance">Finance</option>
          <option value="agriculture">Agriculture</option>
          <option value="construction">Construction</option>
          <option value="technology">Technology</option>
        </select>
      </FormItem>
          
          <FormItem className="mb-4">
            <FormLabel className=" mb-2">Is Sme:</FormLabel>
            
          <input className="m-3" type="checkbox" {...methods.register('sme')} />
          <span className="text-sm">SME</span>
        
          </FormItem>
          <FormItem>
      </FormItem>
          <FormItem>
            <FormLabel>Website:</FormLabel>
            <Input type="text" {...methods.register('website')} />
          </FormItem>
          <FormItem>
            <FormLabel>Suburb:</FormLabel>
            <Input type="text" {...methods.register('suburb')} />
          </FormItem>
          <FormItem>
            <FormLabel>postCode:</FormLabel>
            <Input type="number" {...methods.register('postCode')} />
          </FormItem>
          <FormItem>
            <FormLabel>Description:</FormLabel>
            <Input type="text" {...methods.register('description')} />
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
