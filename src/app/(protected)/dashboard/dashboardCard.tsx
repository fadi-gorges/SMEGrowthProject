"use client";
import { readAllEnterprises } from "@/actions/enterprises/readAllEnterprises";
import { getOrganisation } from "@/actions/organisations/readOrganisation";
import { Switch } from "@/components/ui/switch";
import { Enterprise } from "@/payload-types";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [organisation, setOrganisation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enterprisesResp = await readAllEnterprises();
        const orgRes = await getOrganisation();
        setLoading(false);

        if (!orgRes.success || !enterprisesResp.success) {
          console.error("Failed to fetch data.");
          return;
        }

        setOrganisation(orgRes.organisation.name);

        setEnterprises(enterprisesResp.enterprises);
      } catch (error) {
        console.error(error || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setEnterprises((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-3xl font-bold mb-4">{organisation} Dashboard</h1>
      {enterprises.length > 0 && (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  HGBs Identified
                </th>
                <th scope="col" className="py-3 px-6">
                  Growth
                </th>
                <th scope="col" className="py-3 px-6">
                  Number of Employees
                </th>
                <th scope="col" className="py-3 px-6">
                  Contacted
                </th>
                <th scope="col" className="py-3 px-6">
                  Connected
                </th>
                <th scope="col" className="py-3 px-6">
                  Engaged
                </th>
                <th scope="col" className="py-3 px-6">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {enterprises.map((enterprise) => (
                <tr className="bg-white border-b" key={enterprise.id}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {enterprise.name}
                  </th>
                  <td className="py-4 px-6">
                    {enterprise.growthPotential &&
                      enterprise.growthPotential + "%"}
                  </td>
                  <td className="py-4 px-6">
                    {enterprise.numEmployees && enterprise.numEmployees}
                  </td>
                  <td className="py-4 px-6">
                    <Switch className="data-[state=checked]:bg-green-500" />
                  </td>
                  <td className="py-4 px-6">
                    <Switch className="data-[state=checked]:bg-green-500" />
                  </td>
                  <td className="py-4 px-6">
                    <Switch className="data-[state=checked]:bg-green-500" />
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(enterprise.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
