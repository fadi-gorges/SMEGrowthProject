'use client'
import React, { useEffect, useState } from 'react';
import { Engagement, Enterprise, Organisation,SearchProfile } from "@/payload-types";
import { readAllEngagements } from "@/actions/engagements/readAllEngagements";
import { readAllSearchProfiles } from "@/actions/searchProfiles/readAllSearchProfiles";
import { setEngagement } from "@/actions/engagements/setEngagement";
import { deleteEngagement } from "@/actions/engagements/deleteEngagement";
import { readAllEnterprises } from "@/actions/enterprises/readAllEnterprises";
import { Switch } from "@/components/ui/switch";
import { getOrganisation } from "@/actions/organisations/readOrganisation";
import { AlertDialog, AlertDialogContent, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

const DashboardPage = () => {
    const [engagements, setEngagements] = useState<Engagement[]>([]);
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
    const [profiles, setProfiles] = useState<SearchProfile[]>([]);
    const [filteredEnterprises, setFilteredEnterprises] = useState<Enterprise[]>([]);
    const [userOrganisation, setUserOrganisation] = useState<Omit<Organisation, "id" | "createdAt" | "updatedAt">>({
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
                const profilesResp = await readAllSearchProfiles();
                const orgRes = await getOrganisation();

                if (!engagementsResp.success || !enterprisesResp.success || !orgRes.success || !profilesResp.success) {
                    console.error('Failed to fetch data.');
                    setLoading(false);
                    return;
                }

                setUserOrganisation({
                    name: orgRes.organisation?.name,
                    members: orgRes.organisation?.members,
                });

                setEnterprises(enterprisesResp.enterprises);
                setEngagements(engagementsResp.engagements);
                setProfiles(profilesResp.searchProfiles);
                setLoading(false);

                applyFilters(profilesResp.searchProfiles[0], enterprisesResp.enterprises);
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

  const getSearchProfileName = () => {
    return profiles.length > 0 ? profiles[0].name : 'No Profile';
  };
  
  const getEnterpriseDetails = (enterpriseId: string) => {
    const enterprise = enterprises.find((e) => e.id === enterpriseId);

    return enterprise;
  }
 

 

  const fetchEngagements = async () => {
    try {
        const engagementsResp = await readAllEngagements();
        if (engagementsResp.success) {
            setEngagements(engagementsResp.engagements);
        } else {
            console.error('Failed to fetch engagements');
        }
    } catch (error) {
        console.error('An error occurred while fetching engagements:', error);
    }
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
    console.log('Attempting to delete engagement with ID:', id);
    const response = await deleteEngagement(id);
    if (response.success) {
        setEngagements(currentEngagements => currentEngagements.filter(e => e.id !== id));
        await fetchEngagements();
    } else {
        console.error('Failed to delete the engagement:', response.error);
    }
};

const handleCreate = async (enterpriseId: string, contacted: boolean, connected: boolean, engaged: boolean) => {
    const engagementData = {
        enterprise: enterpriseId,
        contacted: contacted,
        connected: connected,
        engaged: engaged,
        user: 'temp-user-id', 
        id: 'temp-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const response = await setEngagement(engagementData);
    if (response.success) {
        setEngagements(prevEngagements => [...prevEngagements, engagementData]);
        await fetchEngagements();
        console.log('Engagement successfully created');
    } else {
        console.error('Failed to create engagement:', response.error);
    }
};
const applyFilters = (profile: SearchProfile, enterprises: Enterprise[]) => {
    const filtered = enterprises.filter(enterprise => {
        const matchesName = profile.searchQuery ? enterprise.name.includes(profile.searchQuery) : true;
        const matchesEmployees = profile.employeesRange ? checkRange(enterprise.numEmployees, profile.employeesRange) : true;
        const matchesGrowth = profile.growthPotentialRange ? checkRange(enterprise.growthPotential, profile.growthPotentialRange) : true;
        return matchesName && matchesEmployees && matchesGrowth;
    });
    setFilteredEnterprises(filtered);
};

const checkRange = (value: number | null | undefined, range: string): boolean => {
    if (range.toLowerCase() === "any") return true;
    if (value === null || value === undefined) return false;
    const [min, max] = range.split('-').map(Number);

    return value >= min && value <= max;
};

const engagedEnterpriseIds = new Set(engagements.map(e => e.enterprise));

const unengagedEnterprises = enterprises.filter(enterprise => !engagedEnterpriseIds.has(enterprise.id));

const [showEnterpriseId, setShowEnterpriseId] = useState("");
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    
    <div className="p-5 w-full">
        <h1 className="text-3xl font-bold mb-4">{userOrganisation.name} Dashboard</h1>
        {engagements.length > 0 && (
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
                                <div
                                  className="hover:cursor-pointer"
                                  onClick={() => {
                                    setShowEnterpriseId(engagement.enterprise.toString());
                                    setOpenDetailsDialog(true);
                                  }}
                                >
                                {getEnterpriseName(engagement.enterprise.toString())}
                                </div>
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
                            <td className="py-4 px-6">{getEnterpriseGrowth(engagement.enterprise.toString()) +"%" || 'Not given'}</td>
                            <td className="py-4 px-6">{getEnterpriseEmployees(engagement.enterprise.toString()) || 'Not given'}</td>
                            <td className="py-4 px-6">
                                <button onClick={() => handleDelete(engagement.id)} className="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        <h1 className="text-3xl font-bold mb-4"></h1>
        <h4 className="text-2xl font-bold mb-4">Enterprises not yet engaged based on Search: {getSearchProfileName()} </h4>
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
                        <th scope="col" className="py-3 px-6">Create</th> 
                    </tr>
                </thead>
                <tbody>
                    
                {filteredEnterprises.map((enterprise) => (
                        <tr className="bg-white border-b" key={enterprise.id}>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {enterprise.name}
                            </th>
                            <td className="py-4 px-6">
                                <Switch disabled onCheckedChange={() => handleToggle(enterprise.id, 'contacted')} className="data-[state=checked]:bg-green-500" />
                            </td>
                            <td className="py-4 px-6">
                                <Switch disabled onCheckedChange={() => handleToggle(enterprise.id, 'connected')} className="data-[state=checked]:bg-green-500" />
                            </td>
                            <td className="py-4 px-6">
                                <Switch disabled onCheckedChange={() => handleToggle(enterprise.id, 'engaged')} className="data-[state=checked]:bg-green-500" />
                            </td>
                            <td className="py-4 px-6">{enterprise.growthPotential+"%" || 'Not given'}</td>
                            <td className="py-4 px-6">{enterprise.numEmployees || 'Not given'}</td>
                            <td className="py-4 px-6">
                                <button onClick={() => handleCreate(enterprise.id, false, false, false)} className="text-green-500 hover:text-green-700">Create</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <AlertDialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
          <AlertDialogTrigger />
          <AlertDialogContent className="p-5">
          <AlertDialogCancel className="absolute top-2 right-2">
            <button aria-label="Close" className="text-gray-700 hover:text-gray-900">
            &#10005; 
            </button>
          </AlertDialogCancel>
          <h1 className="text-3xl font-bold mb-4">{getEnterpriseDetails(showEnterpriseId)?.name} Enterprise Details</h1>
          
          <h4 className = "text-2xl font-bold"> Growth Potential: {getEnterpriseDetails(showEnterpriseId)?.growthPotential}%</h4>

          <div className="text-sm text-gray-700">
            <h3 className = "text-2xl font-bold"> Description </h3>
              <p className = "mb-5"> {getEnterpriseDetails(showEnterpriseId)?.description || "Not given"} </p>
            
          <div className = "mb-5">
            <h3 className = "text-2xl font-bold"> Identification </h3>
              <p><strong>ABN:</strong> {getEnterpriseDetails(showEnterpriseId)?.abn}</p>
              <p>
                <strong>Website:</strong>{" "}
                {getEnterpriseDetails(showEnterpriseId)?.website ? (
                  <a
                    href={getEnterpriseDetails(showEnterpriseId)?.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getEnterpriseDetails(showEnterpriseId)?.website}
                  </a>
                ) : (
                  "Not given"
                )}
              </p>
          </div>
          
          <div className = "mb-5">
            <h3 className = "text-2xl font-bold"> Business Type </h3>
            <p><strong>SME:</strong> {getEnterpriseDetails(showEnterpriseId)?.sme ? 'Yes' : 'No' || "Not given"}</p>
            <p><strong>Manufacturer:</strong> {getEnterpriseDetails(showEnterpriseId)?.manufacturer ? 'Yes' : 'No' || "Not given"}</p>
          </div>
          
          <div className = "mb-5">
            <h3 className = "text-2xl font-bold"> Address </h3>
            <p><strong>Suburb:</strong> {getEnterpriseDetails(showEnterpriseId)?.suburb || "Not given" }</p>
            <p><strong>Post Code:</strong> {getEnterpriseDetails(showEnterpriseId)?.postCode || "Not given" }</p>
          </div>
              
            <p><strong>Number of Employees:</strong> {getEnterpriseDetails(showEnterpriseId)?.numEmployees || 'Not given'}</p>
            
            
            
          </div>    
          </AlertDialogContent>
        </AlertDialog>
    </div>

    

           
);

};

export default DashboardPage;
