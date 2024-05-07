"use client";
import { completeSignup } from "@/actions/auth/completeSignup";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { cn } from "@/lib/utils/cn";
import { readDataURL } from "@/lib/utils/readDataUrl";
import {
  CompleteSignupData,
  completeSignupSchema,
  userTypes,
} from "@/lib/validations/auth/completeSignupSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRightIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

const CompleteSignupForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
  const { user } = useAuth();

  const [pictureUrl, setPictureUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const completeSignupForm = useForm<CompleteSignupData>({
    resolver: zodResolver(completeSignupSchema),
    disabled: isLoading,
    defaultValues: {
      mobileNumber: user?.mobileNumber || "",
      userType: user?.userType || undefined,
      organisation: "",
      jobTitle: user?.jobTitle || "",
      // picture: undefined,
    },
  });

  const onPictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPictureUrl("");
      return;
    }

    const url = await readDataURL(file);
    setPictureUrl(url);
  };

  const onCompleteSignup = async (data: CompleteSignupData) => {
    setError("");
    setIsLoading(true);

    const body = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        body.append(key, value);
      }
    });

    // if (data.picture) {
    //   const resizedPicture = await resizeImage(data.picture, 320, 320);
    //   body.set("picture", resizedPicture);
    // }

    try {
      const res = await completeSignup(body);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error);
        return;
      }

      router.replace("/auth/payment");
    } catch (e: any) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col justify-center -translate-y-6 w-full max-w-xl",
        className
      )}
      {...props}
    >
      <div className="form-slide-in">
        <CardHeader>
          <CardTitle>
            <h3>Complete your Profile!</h3>
          </CardTitle>
        </CardHeader>
        <Form {...completeSignupForm}>
          <form onSubmit={completeSignupForm.handleSubmit(onCompleteSignup)}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="bg-destructive">
                  <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-destructive-foreground font-semibold">
                    <AlertCircle className="h-4 w-4" />
                    <small>{error}</small>
                  </AlertDescription>
                </Alert>
              )}
              <FormField
                control={completeSignupForm.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder="Mobile Number"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={completeSignupForm.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user type" />
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
                )}
              />
              <FormField
                control={completeSignupForm.control}
                name="organisation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Organisation"
                        autoComplete="organization"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={completeSignupForm.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Job Title"
                        autoComplete="organization-title"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24">
                    <AvatarImage
                      alt="Profile Picture"
                      src={pictureUrl}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <User2Icon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-3">
                    <FormLabel>Upload Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png"
                        required
                        value={undefined}
                        onChange={onPictureChange}
                      />
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full"
              >
                Continue to Payment
                <ArrowRightIcon size={16} />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default CompleteSignupForm;
