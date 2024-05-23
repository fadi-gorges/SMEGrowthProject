"use client";
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'; // For modal
import { createOrganisation } from "@/actions/organisations/createOrganisation";
import { updateOrganisation } from "@/actions/organisations/updateOrganisation";
import { getOrganisation } from "@/actions/organisations/readOrganisation";
import { OrganisationData } from '@/lib/validations/organisations/organisationSchema';
import { CSSProperties } from 'react'; 

const ShareOrganisation: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    async function fetchEmails() {
      const response = await getOrganisation();
      if (response.success && response.organisation) {
        setEmails(response.organisation.members);
      }
    }
    fetchEmails();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAddEmail = async () => {
    if (!validateEmail(email)) {
      setMessage("Invalid email address");
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
      return;
    }

    if (email && !emails.includes(email)) {
      const updatedEmails = [...emails, email];
      const data: OrganisationData = {
        name: "OrganisationName", // Replace with actual organisation name if necessary
        members: updatedEmails,
      };
      console.log("Adding email with data:", data);
      const response = await updateOrganisation(data);
      if (response.success) {
        setEmails(updatedEmails);
        setEmail("");
        setMessage(`Waiting for ${email} to accept invitation`);
        setPopupMessage(`Please wait until ${email} for the status to change`);
        setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
      } else {
        console.error("Failed to add email:", response.error);
        setMessage("Failed to add email");
        setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
      }
    } else {
      setMessage("Email already exists");
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  const handleRemoveEmail = async (emailToRemove: string) => {
    const updatedEmails = emails.filter(e => e !== emailToRemove);
    const data: OrganisationData = {
      name: "OrganisationName", // Replace with actual organisation name if necessary
      members: updatedEmails,
    };
    console.log("Removing email with data:", data);
    const response = await updateOrganisation(data);
    if (response.success) {
      setEmails(updatedEmails);
    } else {
      console.error("Failed to remove email:", response.error);
      setMessage("Failed to remove email");
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  const confirmDeleteEmail = (email: string) => {
    setEmailToDelete(email);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    if (emailToDelete) {
      handleRemoveEmail(emailToDelete);
    }
    setShowDeleteConfirmation(false);
    setEmailToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setEmailToDelete(null);
  };

  const modalStyles: CSSProperties = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed'
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
        {popupMessage && (
          <Dialog.Root open={!!popupMessage} onOpenChange={() => setPopupMessage(null)}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <Dialog.Content className="bg-white rounded shadow-lg" style={modalStyles}>
              <Dialog.Title>Please wait</Dialog.Title>
              <Dialog.Description>
                {popupMessage.split(' ').slice(0, 4).join(' ')}<br />
                {popupMessage.split(' ').slice(4).join(' ')}
              </Dialog.Description>
              <button onClick={() => setPopupMessage(null)} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                OK
              </button>
            </Dialog.Content>
          </Dialog.Root>
        )}
        <div className="flex justify-between items-center border-b py-2 font-bold">
          <span>Members</span>
          <span>Status</span>
          <span>Delete</span>
        </div>
        <ul>
          {emails.map((email, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span>{email}</span>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-2 bg-yellow-500"></span>
                <span>pending</span>
              </div>
              <button
                onClick={() => confirmDeleteEmail(email)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showDeleteConfirmation && (
        <Dialog.Root open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="bg-white rounded shadow-lg" style={modalStyles}>
            <Dialog.Title>Confirm Delete</Dialog.Title>
            <Dialog.Description>
              The email link for {emailToDelete} will no longer be valid.
            </Dialog.Description>
            <div className="flex justify-around mt-4">
              <button onClick={handleDeleteCancel} className="bg-gray-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">
                OK
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  );
};

export default ShareOrganisation;
