'use client'
import React, { useEffect, useState } from 'react';
import { Engagement, Enterprise, Organisation } from "@/payload-types";
import { readAllEngagements } from "@/actions/engagements/readAllEngagements";
import { setEngagement } from "@/actions/engagements/setEngagement";
import { deleteEngagement } from "@/actions/engagements/deleteEngagement";
import { readAllEnterprises } from "@/actions/enterprises/readAllEnterprises";
import { Switch } from "@/components/ui/switch";
import { getOrganisation } from "@/actions/organisations/readOrganisation";

const DashboardPage = () => {
    const [engagements, setEngagements] = useState<Engagement[]>([]);
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
    const [userOrganisation, setUserOrganisation] = useState<
    Omit<Organisation, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    members: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const engagementsResp = await readAllEngagements();
        const enterprisesResp = await readAllEnterprises();
        const res = await getOrganisation();
        
        
        if (!engagementsResp.success || !enterprisesResp.success || !res.success) {
            console.error('Failed to fetch data.');
          setLoading(false);
          return;
        }
        const { organisation } = res;
        setUserOrganisation({
          name: organisation?.name,
          members: organisation?.members,
        });
        
        setEnterprises(enterprisesResp.enterprises);
        setEngagements(engagementsResp.engagements);
        setLoading(false);
      } catch (error) {
        console.error(error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getEnterpriseName = (enterpriseId: string) => {
    const enterprise = enterprises.find(e => e.id === enterpriseId);
    return enterprise ? enterprise.name : 'Unknown Enterprise';
  };

  const getEnterpriseGrowth = (enterpriseId: string) => {
    const enterprise = enterprises.find(e => e.id === enterpriseId);
    return enterprise ? enterprise.growthPotential : '?';
  };

  const getEnterpriseEmployees = (enterpriseId: string) => {
    const enterprise = enterprises.find(e => e.id === enterpriseId);
    return enterprise ? enterprise.numEmployees : '?';
  };

 

  



  const handleToggle = async (id: string, field: keyof Engagement) => {
    const updatedEngagements = engagements.map(engagement => {
        if (engagement.id === id) {
            console.log(`Toggling ${field} from ${engagement[field]} to ${!engagement[field]}`);
            return {
                ...engagement,
                [field]: !engagement[field]  // Toggle and ensure it's not null
            };
        }
        return engagement;
    });

    const updatedEngagement = updatedEngagements.find(e => e.id === id);
    if (updatedEngagement) {
        const engagementToSend = {
            ...updatedEngagement,
            contacted: updatedEngagement.contacted ?? false,  // Provide default value if null
            connected: updatedEngagement.connected ?? false,
            engaged: updatedEngagement.engaged ?? false,
            enterprise: typeof updatedEngagement.enterprise === 'string' ? updatedEngagement.enterprise : updatedEngagement.enterprise.id
        };

        const response = await setEngagement(engagementToSend);
        if (response.success) {
            setEngagements(updatedEngagements);
        } else {
            console.error('Failed to update engagement:', response.error);
        }
    }
};

const handleDelete = async (id: string) => {
    const response = await deleteEngagement(id);
    if (response.success) {
        setEngagements(currentEngagements => currentEngagements.filter(e => e.id !== id));
    } else {
        console.error('Failed to delete the engagement:', response.error);
    }
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    
    <div className="p-5 w-full">
        <h1 className="text-3xl font-bold mb-4">{userOrganisation.name} Dashboard</h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">HGBs Identified</th>
                        <th scope="col" className="py-3 px-6">Contacted</th>
                        <th scope="col" className="py-3 px-6">Connected</th>
                        <th scope="col" className="py-3 px-6">Engaged</th>
                        <th scope="col" className="py-3 px-6">Growth</th>
                        <th scope="col" className="py-3 px-6">Number of Employees</th>
                        <th scope="col" className="py-3 px-6">Delete</th> 
                    </tr>
                </thead>
                <tbody>
                    
                    {engagements.map((engagement) => (
                        <tr className="bg-white border-b" key={engagement.id}>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {getEnterpriseName(engagement.enterprise.toString())}
                            </th>
                            <td className="py-4 px-6">
                                <Switch checked={engagement.contacted as boolean} onCheckedChange={() => handleToggle(engagement.id, 'contacted')} className="data-[state=checked]:bg-green-500" />
                            </td>
                            <td className="py-4 px-6">
                                <Switch checked={engagement.connected as boolean} onCheckedChange={() => handleToggle(engagement.id, 'connected')} className="data-[state=checked]:bg-green-500" />
                            </td>
                            <td className="py-4 px-6">
                                <Switch checked={engagement.engaged as boolean} onCheckedChange={() => handleToggle(engagement.id, 'engaged')} className="data-[state=checked]:bg-green-500" />
                            </td>
                            <td className="py-4 px-6">{getEnterpriseGrowth(engagement.enterprise.toString())+"%"}</td>
                            <td className="py-4 px-6">{getEnterpriseEmployees(engagement.enterprise.toString())}</td>
                            <td className="py-4 px-6">
                                <button onClick={() => handleDelete(engagement.id)} className="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

};

export default DashboardPage;
