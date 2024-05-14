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
        <h2 className="text-xl ml-auto text-blue-600">Adding csv file...</h2>
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
          <Button className="mt-10 ml-20"type="submit" loading={isLoading}>Add Enterprise</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddEnterpriseCard;
