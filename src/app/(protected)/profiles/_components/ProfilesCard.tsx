"use client";
import { deleteSearchProfile } from "@/actions/searchProfiles/deleteSearchProfile";
import { readAllSearchProfiles } from "@/actions/searchProfiles/readAllSearchProfiles";
import { updateSearchProfile } from "@/actions/searchProfiles/updateSearchProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchProfile } from "@/payload-types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
const StaffRanges = [
  "1-10",
  "10-50",
  "50-100",
  "100-200",
  ">200",
  "<200",
  "Any",
];
const GrowthPotentialRanges = ["0-25", "25-50", "50-75", "75-100", "Any"];
const sectors = ["Any","Technology", "Retail", "Healthcare", "Finance", "Agriculture", "Manufacturing","Construction"];
const ProfilesCard = () => {
  const [searchProfiles, setSearchProfiles] = useState<SearchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileToDelete, setProfileToDelete] = useState<SearchProfile | null>(
    null
  );
  const [profileToEdit, setProfileToEdit] = useState<SearchProfile | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await readAllSearchProfiles();
      if (response.success) {
        setSearchProfiles(response.searchProfiles);
      } else {
        console.error("Error fetching search profiles:", response.error);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteSearchProfile(id);
    if (response.success) {
      setSearchProfiles(searchProfiles.filter((profile) => profile.id !== id));
      setIsDeleteDialogOpen(false);
      setProfileToDelete(null);
    } else {
      console.error("Error deleting search profile:", response.error);
    }
  };

  const handleEdit = (profile: SearchProfile) => {
    setProfileToEdit(profile);
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = async (updatedProfile: SearchProfile) => {
    const updatedProfileData = {
      id: updatedProfile.id,
      name: updatedProfile.name,
      searchQuery: updatedProfile.searchQuery!,
      industrySector: updatedProfile.industrySector!,
      employeesRange: updatedProfile.employeesRange!,
      growthPotentialRange: updatedProfile.growthPotentialRange!,
      postcode: updatedProfile.postcode!,
    };
    const response = await updateSearchProfile(updatedProfileData);
    if (response.success) {
      // Update the profile in the state
      setSearchProfiles(
        searchProfiles.map((profile) =>
          profile.id === updatedProfile.id ? updatedProfile : profile
        )
      );
      setIsEditDialogOpen(false);
      setProfileToEdit(null);
      alert("Search profile updated successfully");
    } else {
      alert("Error updating search profile:" + response.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-4">Manage Search Profiles</h1>
      <div className="flex flex-wrap gap-4">
        {searchProfiles.length ? (
          searchProfiles.map((profile) => (
            <Card key={profile.id} className="w-80">
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p>Search Query: {profile.searchQuery}</p>
                  <p>Industry Sector: {profile.industrySector}</p>
                  <p>Employees Range: {profile.employeesRange}</p>
                  <p>Growth Potential Range: {profile.growthPotentialRange}%</p>
                  <p>Postcode: {profile.postcode}</p>
                </CardDescription>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    onClick={() => handleEdit(profile)}
                    style={{ padding: "5px", minWidth: "30px" }}
                  >
                    <EditIcon style={{ fontSize: "16px" }} />
                  </Button>
                  <Button
                    onClick={() => {
                      setProfileToDelete(profile);
                      setIsDeleteDialogOpen(true);
                    }}
                    variant="destructive"
                    style={{ padding: "5px", minWidth: "30px" }}
                  >
                    <Trash2Icon style={{ fontSize: "16px" }} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No Search Profiles saved.</p>
        )}
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to delete the profile {profileToDelete?.name}?
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => handleDelete(profileToDelete!.id)}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p>
              Name:{" "}
              <Input
                type="text"
                value={profileToEdit?.name}
                onChange={(e) =>
                  setProfileToEdit({
                    ...profileToEdit!,
                    name: e.target.value,
                  })
                }
              />
            </p>
            <p>
              Search Query:{" "}
              <Input
                type="text"
                value={profileToEdit?.searchQuery!}
                onChange={(e) =>
                  setProfileToEdit({
                    ...profileToEdit!,
                    searchQuery: e.target.value,
                  })
                }
              />
            </p>
            <p>
              Industry Sector:{" "}
              <Select
                value={profileToEdit?.industrySector!}
                onValueChange={(value) =>
                  setProfileToEdit({
                    ...profileToEdit!,
                    industrySector: value.toString(),
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Industry Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </p>
            <p>
              Employees Range:{" "}
              <Select
                value={profileToEdit?.employeesRange!}
                onValueChange={(value) =>
                  setProfileToEdit({
                    ...profileToEdit!,
                    employeesRange: value.toString(),
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Employees Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {StaffRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </p>
            <p>
              Growth Potential Range:{" "}
              <Select
                value={profileToEdit?.growthPotentialRange!}
                onValueChange={(value) =>
                  setProfileToEdit({
                    ...profileToEdit!,
                    growthPotentialRange: value.toString(),
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Growth Potential Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {GrowthPotentialRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}%
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </p>
            <p>
              Postcode:{" "}
              <Input
                type="text"
                value={profileToEdit?.postcode!}
                onChange={(e) => {
                  const input = e.target.value;
                  const regex = /^[0-9]*$/; // Only allow digits (0-9)
                  if (regex.test(input)) {
                    setProfileToEdit({
                      ...profileToEdit!,
                      postcode: Number(input),
                    });
                  }
                }}
              />
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveProfile(profileToEdit!)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilesCard;
