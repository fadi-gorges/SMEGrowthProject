"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { isMobile } from "react-device-detect";

const LogoutDialog = ({
  logoutDialogOpen,
  setLogoutDialogOpen,
  handleLogout,
}: {
  logoutDialogOpen: boolean;
  setLogoutDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return isMobile ? (
    <Drawer open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Log Out</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to log out?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive" onClick={handleLogout}>
            Log Out
          </Button>
          <DrawerClose>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h6>Log Out</h6>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p>Are you sure you want to log out?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setLogoutDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              handleLogout();
            }}
          >
            Log Out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
