"use client";
import { updateUser } from "@/actions/auth/updateUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils/cn";
import { readDataURL } from "@/lib/utils/readDataUrl";
import {
  UpdateUserData,
  updateUserSchema,
} from "@/lib/validations/auth/updateUserSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User2Icon, XCircleIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";

const AccountSettingsCard = () => {
  const { user, userPicture, fetchMe } = useAuth();

  const [pictureInputKey, setPictureInputKey] = useState(0);
  const [pictureUrl, setPictureUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const updateUserForm = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    disabled: isLoading,
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      picture: undefined,
      jobTitle: user?.jobTitle,
      organisation: user?.organisation,
      mobileNumber: user?.mobileNumber,
    },
  });

  const onPictureChange = async (
    field: ControllerRenderProps<UpdateUserData, "picture">,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = await readDataURL(file);
    setPictureUrl(url);

    field.onChange(file);
  };

  const onSubmit = async (data: UpdateUserData) => {
    setIsLoading(true);

    const body = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        body.append(key, value);
      }
    });

    try {
      const res = await updateUser(body);
      setIsLoading(false);

      if (res.success) {
        toast.success("Your account has been updated.");
        fetchMe();
        return;
      }

      toast.error(res.error);
    } catch (e) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
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
                    <AvatarImage
                      alt="Profile Picture"
                      src={pictureUrl || (userPicture?.url as string)}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <User2Icon />
                    </AvatarFallback>
                  </Avatar>
                  <FormField
                    control={updateUserForm.control}
                    name="picture"
                    render={({ field }) => (
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
                          {pictureUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setPictureUrl("");
                                setPictureInputKey((k) => k + 1);
                              }}
                            >
                              <XCircleIcon />
                            </Button>
                          )}
                        </div>

                        <FormControl>
                          <Input
                            key={pictureInputKey}
                            type="file"
                            accept="image/jpeg,image/png"
                            {...field}
                            value={undefined}
                            onChange={(e) => onPictureChange(field, e)}
                            className="hidden"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                          placeholder={user.mobileNumber}
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
                          placeholder={user.jobTitle}
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
                  name="organisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organisation</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          autoComplete="organization"
                          placeholder={user.organisation}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-2">
              <h3 className="text-lg font-medium leading-6">
                Security Settings
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="two-factor">Two-factor authentication</Label>
                  <div className="ml-auto">
                    <Toggle id="two-factor" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enabling two-factor authentication makes your account more
                  secure.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-2">
              <h3 className="text-lg font-medium leading-6">
                Notification Preferences
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="email-newsletter">Email newsletter</Label>
                  <div className="ml-auto">
                    <Toggle defaultChecked id="email-newsletter" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive the latest updates and news in your inbox.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-2">
              <h3 className="text-lg font-medium leading-6">
                Account Deletion
              </h3>
              <div className="space-y-2">
                <Button type="button" variant="outline">
                  Delete Account
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Once you delete your account, there is no way to recover it.
                </p>
              </div>
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
