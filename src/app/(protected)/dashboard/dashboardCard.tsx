"use client";
import { readAllEnterprises } from "@/actions/enterprises/readAllEnterprises";
import { getOrganisation } from "@/actions/organisations/readOrganisation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Enterprise } from "@/payload-types";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [organisation, setOrganisation] = useState("");

  const [showEnterprise, setShowEnterprise] = useState<Enterprise>();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enterprisesResp = await readAllEnterprises();
        const orgRes = await getOrganisation();

        if (!orgRes.success || !enterprisesResp.success) {
          console.error("Failed to fetch data.");
          return;
        }

        setOrganisation(orgRes.organisation.name);

        setEnterprises(enterprisesResp.enterprises);
      } catch (error) {
        console.error(error || "An error occurred");
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
      {enterprises.length > 0 ? (
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
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setShowEnterprise(enterprise);
                        setOpenDetailsDialog(true);
                      }}
                    >
                      {enterprise.name}
                    </div>
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
          <AlertDialog
            open={openDetailsDialog}
            onOpenChange={setOpenDetailsDialog}
          >
            <AlertDialogTrigger />
            <AlertDialogContent className="p-5">
              <AlertDialogCancel className="absolute top-2 right-2">
                <button
                  aria-label="Close"
                  className="text-gray-700 hover:text-gray-900"
                >
                  &#10005;
                </button>
              </AlertDialogCancel>
              <h1 className="text-3xl font-bold mb-4">
                {showEnterprise?.name} Enterprise Details
              </h1>

              <h4 className="text-2xl font-bold">
                {" "}
                Growth Potential: {showEnterprise?.growthPotential}%
              </h4>

              <div className="text-sm text-gray-700">
                <h3 className="text-2xl font-bold"> Description </h3>
                <p className="mb-5">
                  {" "}
                  {showEnterprise?.description || "Not given."}{" "}
                </p>

                <div className="mb-5">
                  <h3 className="text-2xl font-bold"> Identification </h3>
                  <p>
                    <strong>ABN:</strong> {showEnterprise?.abn}
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    {showEnterprise?.website ? (
                      <a
                        href={showEnterprise?.website || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {showEnterprise?.website}
                      </a>
                    ) : (
                      "Not given"
                    )}
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="text-2xl font-bold"> Business Type </h3>
                  <p>
                    <strong>SME:</strong>{" "}
                    {showEnterprise?.sme ? "Yes" : "No" || "Not given"}
                  </p>
                  <p>
                    <strong>Manufacturer:</strong>{" "}
                    {showEnterprise?.manufacturer ? "Yes" : "No" || "Not given"}
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="text-2xl font-bold"> Address </h3>
                  <p>
                    <strong>Suburb:</strong>{" "}
                    {showEnterprise?.suburb || "Not given"}
                  </p>
                  <p>
                    <strong>Post Code:</strong>{" "}
                    {showEnterprise?.postCode || "Not given"}
                  </p>
                </div>

                <p>
                  <strong>Number of Employees:</strong>{" "}
                  {showEnterprise?.numEmployees || "Not given"}
                </p>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default DashboardPage;
