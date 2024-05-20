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

  const initialRows = [
    { id: 1, name: "Boogle", contacted: true, connected: true, engaged: true, profile: "Mining NSW SME" },
    { id: 2, name: "FaceBok", contacted: true, connected: false, engaged: false, profile: "Mining NSW SME" },
    { id: 3, name: "Atlassian", contacted: true, connected: true, engaged: false, profile: "Mining NSW SME" },
    { id: 4, name: "Sonic ITM", contacted: true, connected: true, engaged: true, profile: "Mining NSW SME" },
    { id: 5, name: "SWP Mining", contacted: true, connected: true, engaged: false, profile: "Mining NSW SME" },
    { id: 6, name: "Totoma Unlimited", contacted: true, connected: false, engaged: false, profile: "Mining NSW SME" },
    { id: 7, name: "FramesU", contacted: true, connected: true, engaged: false, profile: "Mining NSW SME" },
    { id: 8, name: "Naru Cit", contacted: true, connected: true, engaged: true, profile: "Mining NSW SME" },
  ];

  return (
    <div className="p-5 w-full">
      <h1 className="text-3xl font-bold mb-4">Organisation Dashboard</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">HGBs Identified</th>
              <th scope="col" className="py-3 px-6">Contacted</th>
              <th scope="col" className="py-3 px-6">Connected</th>
              <th scope="col" className="py-3 px-6">Engaged</th>
              <th scope="col" className="py-3 px-6">Name of Search Profile</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody id="profile-table-body">
            {initialRows.map((row) => (
              <tr className="bg-white border-b" key={row.id} data-id={row.id}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{row.name}</th>
                <td className="py-4 px-6"><span className={`inline-flex rounded-full ${row.contacted ? 'bg-green-500' : 'bg-red-500'} w-3 h-3`}></span></td>
                <td className="py-4 px-6"><span className={`inline-flex rounded-full ${row.connected ? 'bg-green-500' : 'bg-red-500'} w-3 h-3`}></span></td>
                <td className="py-4 px-6"><span className={`inline-flex rounded-full ${row.engaged ? 'bg-green-500' : 'bg-red-500'} w-3 h-3`}></span></td>
                <td className="py-4 px-6">{row.profile}</td>
                <td className="py-4 px-6">
                  <button 
                    className="remove-btn text-red-500 hover:text-red-700"
                    data-id={row.id}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function () {
          document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
              const id = this.getAttribute('data-id');
              const row = document.querySelector(\`tr[data-id="\${id}"]\`);
              if (row && confirm('Are you sure you want to remove this item?')) {
                row.remove();
              }
            });
          });
        });
      ` }} />
    </div>
  );
};

export default DashboardPage;
