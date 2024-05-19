'use client'
import React, { useEffect, useState } from "react";
import { readAllSearchProfiles } from "@/actions/searchProfiles/readAllSearchProfiles";
import { deleteSearchProfile } from "@/actions/searchProfiles/deleteSearchProfile";
import { SearchProfile } from "@/payload-types";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2Icon, TrashIcon } from "lucide-react";

const ProfilesCard = () => {
  const [searchProfiles, setSearchProfiles] = useState<SearchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileToDelete, setProfileToDelete] = useState<SearchProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await readAllSearchProfiles();
      if (response.success) {
        setSearchProfiles(response.searchProfiles);
      } else {
        console.error('Error fetching search profiles:', response.error);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteSearchProfile(id);
    if (response.success) {
      setSearchProfiles(searchProfiles.filter(profile => profile.id !== id));
      setIsDialogOpen(false);
      setProfileToDelete(null);
    } else {
      console.error('Error deleting search profile:', response.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-4">Manage Search Profiles</h1>
      <div className="flex flex-wrap gap-4">
        {searchProfiles.map(profile => (
          <Card key={profile.id} className="w-80">
            <CardHeader>
              <CardTitle>{profile.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p>Search Query: {profile.searchQuery}</p>
                <p>Manufacturer: {profile.manufacturer ? "Yes" : "No"}</p>
                <p>Employees Range: {profile.employeesRange}</p>
                <p>Growth Potential Range: {profile.growthPotentialRange}%</p>
                <p>Postcode: {profile.postcode}</p>
              </CardDescription>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  setProfileToDelete(profile);
                  setIsDialogOpen(true);
                }}
                variant="destructive"
                style={{ padding: '5px', minWidth: '30px'}}
              >
                <Trash2Icon style={{ fontSize: '16px' }}></Trash2Icon>
              </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete the profile {profileToDelete?.name}?</div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleDelete(profileToDelete!.id)} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilesCard;