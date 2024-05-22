"use client";
import { readAllSearchProfiles } from "@/actions/searchProfiles/readAllSearchProfiles";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SearchProfile } from "@/payload-types";
import { useEffect, useState } from "react";

const NotificationSettings = () => {
  const [profiles, setProfiles] = useState<SearchProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<SearchProfile[]>([]);
  const [frequency, setFrequency] = useState("");
  const [type, setType] = useState("");
  const [applyToAllYes, setApplyToAllYes] = useState(false);
  const [applyToAllNo, setApplyToAllNo] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const getProfiles = async() => {
    const profileresponse = await readAllSearchProfiles();
    if (profileresponse.success) {
      setProfiles(profileresponse.searchProfiles);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const handleApplyToAllYesToggle = () => {
    setApplyToAllYes(!applyToAllYes);
    if (!applyToAllYes) {
      setApplyToAllNo(false);
    }
  };

  const handleApplyToAllNoToggle = () => {
    setApplyToAllNo(!applyToAllNo);
    if (!applyToAllNo) {
      setApplyToAllYes(false);
    }
  };

  const handleProfileSelection = (profile: SearchProfile) => {
    if (selectedProfiles.includes(profile)) {
      setSelectedProfiles(selectedProfiles.filter((p) => p !== profile));
    } else {
      setSelectedProfiles([...selectedProfiles, profile]);
    }
  };

  const handleUpdateButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <>
      <h1>Manage Notification Preferences</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          paddingBottom: "90px",
          borderRadius: "5px",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.18)",
        }}
      >
        <label
          htmlFor="frequency"
          style={{ fontWeight: "bold", paddingBottom: "5px" }}
        >
          Frequency:
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="" disabled>
            Select frequency
          </option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="NewAddedSme">New added SME</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          paddingBottom: "90px",
          borderRadius: "5px",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.18)",
        }}
      >
        <label
          htmlFor="type"
          style={{ fontWeight: "bold", paddingBottom: "5px" }}
        >
          Type:
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push Notification</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          paddingBottom: applyToAllNo ? "18px" : "100px",
          borderRadius: "5px",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.18)",
        }}
      >
        <label
          htmlFor="applyToAll"
          style={{ fontWeight: "bold", paddingBottom: "15px" }}
        >
          Apply to All:
        </label>
        <div
          style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}
        >
          <input
            type="checkbox"
            id="applyToAllYes"
            checked={applyToAllYes}
            onChange={handleApplyToAllYesToggle}
            style={{ marginRight: "5px" }}
          />
          <label htmlFor="applyToAllYes">Yes</label>
          <input
            type="checkbox"
            id="applyToAllNo"
            checked={applyToAllNo}
            onChange={handleApplyToAllNoToggle}
            style={{ marginLeft: "20px", marginRight: "5px" }}
          />
          <label htmlFor="applyToAllNo">No</label>
        </div>
        {applyToAllNo ? (
          <div
            style={{
              backgroundColor: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              marginTop: "10px",
            }}
          >
            {profiles.map(
              (profile) => (
                <div
                  key={profile.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    id={profile.id}
                    checked={selectedProfiles.includes(profile)}
                    onChange={() => handleProfileSelection(profile)}
                    style={{ marginRight: "5px" }}
                  />
                  <label htmlFor={profile.id}>{profile.name}</label>
                </div>
              )
            )}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Switch
            checked={isChecked}
            onCheckedChange={handleToggle}
            className="custom-class"
          />
          <span style={{ marginLeft: "10px" }}>Pause Notifications</span>
        </div>
        <Button
          variant={buttonClicked ? "success" : "default"}
          onClick={handleUpdateButtonClick}
        >
          {buttonClicked ? "Updated" : "Update"}
        </Button>
      </div>
    </>
  );
};

export default NotificationSettings;
