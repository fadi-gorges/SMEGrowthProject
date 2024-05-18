import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";

import { User } from "@/payload-types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard • AusBizGrowth",
  description: "",
};

const DashboardPage = async () => {
  const user = (await getServerUser()) as User;

  const rows = [
    {
      id: 1,
      name: "Boogle",
      contacted: true,
      connected: true,
      engaged: true,
      growth: "85%",
      profile: "Mining NSW SME",
    },
    {
      id: 2,
      name: "FaceBok",
      contacted: true,
      connected: false,
      engaged: false,
      growth: "78%",
      profile: "Mining NSW SME",
    },
    {
      id: 3,
      name: "Atlassian",
      contacted: true,
      connected: true,
      engaged: false,
      growth: "71%",
      profile: "Mining NSW SME",
    },
    {
      id: 4,
      name: "Sonic ITM",
      contacted: true,
      connected: true,
      engaged: true,
      growth: "69%",
      profile: "Mining NSW SME",
    },
    {
      id: 5,
      name: "SWP Mining",
      contacted: true,
      connected: true,
      engaged: false,
      growth: "64%",
      profile: "Mining NSW SME",
    },
    {
      id: 6,
      name: "Totoma Unlimited",
      contacted: true,
      connected: false,
      engaged: false,
      growth: "55%",
      profile: "Mining NSW SME",
    },
    {
      id: 7,
      name: "FramesU",
      contacted: true,
      connected: true,
      engaged: false,
      growth: "51%",
      profile: "Mining NSW SME",
    },
    {
      id: 8,
      name: "Naru Cit",
      contacted: true,
      connected: true,
      engaged: true,
      growth: "50%",
      profile: "Mining NSW SME",
    },
  ];

  return (
    <div className="p-5 w-full">
      <h1 className="text-3xl font-bold mb-4">Businesses Recommended</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                HGBs Identified
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
                Growth
              </th>
              <th scope="col" className="py-3 px-6">
                Name of Search Profile
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="bg-white border-b" key={row.id}>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  {row.name}
                </th>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex rounded-full ${
                      row.contacted ? "bg-green-500" : "bg-red-500"
                    } w-3 h-3`}
                  ></span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex rounded-full ${
                      row.connected ? "bg-green-500" : "bg-red-500"
                    } w-3 h-3`}
                  ></span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex rounded-full ${
                      row.engaged ? "bg-green-500" : "bg-red-500"
                    } w-3 h-3`}
                  ></span>
                </td>
                <td className="py-4 px-6">{row.growth}</td>
                <td className="py-4 px-6">{row.profile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
