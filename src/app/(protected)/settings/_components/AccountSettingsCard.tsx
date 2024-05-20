"use client";
import { deleteUser } from "@/actions/auth/deleteUser";
import { updateSubscription } from "@/actions/auth/updateSubscription";
import { updateUser } from "@/actions/auth/updateUser";
import { getOrganisation } from "@/actions/organisations/readOrganisation";
import { updateOrganisation } from "@/actions/organisations/updateOrganisation";
import ResponsiveAlertDialog from "@/components/ResponsiveAlertDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import { userTypes } from "@/lib/validations/auth/completeSignupSchema";
import {
  UpdateUserData,
  updateUserSchema,
} from "@/lib/validations/auth/updateUserSchema";
import { Organisation } from "@/payload-types";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AccountSettingsCard = () => {
  const router = useRouter();
  const { user, fetchMe } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [unsubscribeDialogOpen, setUnsubscribeDialogOpen] = useState(false);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const [userOrganisation, setUserOrganisation] = useState<
    Omit<Organisation, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    members: [],
  });

  const updateUserForm = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    disabled: isLoading,
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      jobTitle: user?.jobTitle || "",
      mobileNumber: user?.mobileNumber || "",
      userType: user?.userType || undefined,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getOrganisation();

        if (!res.success) {
          return;
        }

        const { organisation } = res;
        setUserOrganisation({
          name: organisation?.name,
          members: organisation?.members,
        });
      } catch (error) {}
    })().then();
  }, []);

  useEffect(() => {
    updateUserForm.reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      jobTitle: user?.jobTitle || "",
      mobileNumber: user?.mobileNumber || "",
      userType: user?.userType || undefined,
    });
  }, [user]);

  const onSubmit = async (data: UpdateUserData) => {
    setIsLoading(true);

    try {
      const res = await updateUser(data);

      await updateOrganisation({
        name: userOrganisation?.name,
        members: userOrganisation?.members,
      });

      setIsLoading(false);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Your account has been updated.");

      fetchMe();

      document.getElementById("page-div")?.scrollTo(0, 0);
    } catch (e) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    setIsDeleting(true);

    try {
      const res = await deleteUser();
      setIsDeleting(false);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Your account has been deleted.");
      router.replace("/");
    } catch (e) {
      setIsDeleting(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleUnsubscribe = async () => {
    setIsUnsubscribing(true);
    try {
      const res = await updateSubscription(false);
      setIsUnsubscribing(false);
      toast.success("You have successfully unsubscribed.");
      router.replace("/auth/payment");
    } catch (e) {
      setIsUnsubscribing(false);
      toast.error("An error occured, please try again");
    }
  };

  if (!user) return null;

  return (
    <Card className="w-full lg:max-w-3xl">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account details and preferences.
        </CardDescription>
      </CardHeader>
      <Form {...updateUserForm}>
        <form onSubmit={updateUserForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-medium leading-6">
                Profile Information
              </h3>
              <div className="grid gap-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback>
                      <User2Icon />
                    </AvatarFallback>
                  </Avatar>
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "cursor-pointer"
                        )}
                      >
                        Change Profile Picture
                      </FormLabel>
                    </div>
                  </FormItem>
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={updateUserForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            autoCapitalize="on"
                            autoComplete="given-name"
                            placeholder={user?.firstName}
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updateUserForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            autoCapitalize="on"
                            autoComplete="family-name"
                            placeholder={user.lastName}
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={updateUserForm.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          autoCapitalize="on"
                          autoComplete="tel"
                          placeholder={user.mobileNumber || ""}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateUserForm.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={user.jobTitle || ""}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="organisation"
                  render={() => (
                    <FormItem>
                      <FormLabel>Organisation Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={"Input user organisation"}
                          value={userOrganisation?.name}
                          onChange={(e) => {
                            setUserOrganisation((prevState) => ({
                              name: e.target.value,
                              members: prevState?.members,
                            }));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateUserForm.control}
                  name="userType"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          required
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  user?.userType || "Select a user type"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(userTypes).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {key}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium leading-6">Unsubscribe</h3>
                <small className="text-muted-foreground">
                  To unsubscribe, please click the &quot;unsubscribe&quot;
                  button.
                </small>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (user?.paymentSuccessful) {
                    setUnsubscribeDialogOpen(true);
                  }
                }}
              >
                {user?.paymentSuccessful ? "Unsubscribe" : "Subscribe"}
              </Button>
              <ResponsiveAlertDialog
                title="Unsubscribe"
                description="This action cannot be undone. This will remove your subscription."
                open={unsubscribeDialogOpen}
                setOpen={setUnsubscribeDialogOpen}
              >
                <Button
                  variant="destructive"
                  loading={isUnsubscribing}
                  onClick={handleUnsubscribe}
                >
                  Unsubscribe
                </Button>
              </ResponsiveAlertDialog>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium leading-6">
                  Account Deletion
                </h3>
                <small className="text-muted-foreground">
                  Once you delete your account, there is no way to recover it.
                </small>
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
              <ResponsiveAlertDialog
                title="Delete Account"
                description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
              >
                <Button
                  variant="destructive"
                  loading={isDeleting}
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </Button>
              </ResponsiveAlertDialog>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" loading={isLoading} className="w-full">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AccountSettingsCard;
