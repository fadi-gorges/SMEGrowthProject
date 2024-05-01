import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { User } from "@/payload-types";
import React from 'react';

interface Business {
  id: number;
  name: string;
}

const businesses: Business[] = [
  { id: 1, name: 'Apple'},
  { id: 2, name: 'Samsung'},
];

export const metadata = {
  title: "Dashboard • AusBizGrowth",
  description: "",
};

const styles = {
  header: {
    fontSize: '24px',
    color: '#333',
    paddingBottom: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr', // Adjust number of columns as needed
    padding: '10px 0',
    fontWeight: 'bold'
  },
  businessRow: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr', // Ensure this matches the header
    marginBottom: '10px',
    alignItems: 'center',
    gap: '10px' // Add gap if needed
  },
  statusButton: {
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    border: 'none',
    cursor: 'pointer', // Optional, for better user experience
  }
};

const DashboardPage = async () => {
  const user = (await getServerUser()) as User;

  return (
    <Main>
      <h1>{user ? `${user.organisation} Dashboard` : "Loading Dashboard..."}</h1>
      <h5>
        You are logged in as <b>{user ? user.email : "loading..."}</b>
      </h5>
      <div style={{ marginTop: '20px' }} className="">
        <div className="text-lg">Businesses Recommended</div>
        <div className="font-bold columns-5">
          <div>HGBs Identified</div>
          <div>Contacted</div>
          <div>Connected</div>
          <div>Engaged</div>
          <div>Name of Search Profile</div>
        </div>
        {businesses.map((business) => (
          <div key={business.id} className="columns-5">
            <div>{business.name}</div>
            <div className="">
              <button style={{ ...styles.statusButton, background: '#27AE60'}}></button>
            </div>
            <div>
              <button style={{ ...styles.statusButton, background: '#27AE60'}}></button>
            </div>
            <div>
              <button style={{ ...styles.statusButton, background: '#27AE60'}}></button>
            </div>
            <div>Mining NSW SME</div>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default DashboardPage;
