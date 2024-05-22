"use client";
import React, { useState, useEffect } from 'react';

const ShareOrganisation: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch or setup if needed
  }, []);

  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail("");
      setMessage(`Waiting for ${email} to accept invitation`);
      setTimeout(() => setMessage(null), 5000); // Clear message after 3 seconds
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-3xl font-bold mb-4">Add Team Members</h1>
      <div className="mb-4">
        <div className="flex mb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="border p-2 flex-grow"
          />
          <button
            onClick={handleAddEmail}
            className="bg-blue-500 text-white p-2 ml-2"
          >
            Add
          </button>
        </div>
        {message && <p className="text-green-500">{message}</p>}
        <ul>
          {emails.map((email, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span>{email}</span>
              <button
                onClick={() => handleRemoveEmail(email)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShareOrganisation;
