"use client";

import { createUser } from "@/actions/auth/createUser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils/cn";
import { LoginData, loginSchema } from "@/lib/validations/auth/loginSchema";
import { SignupData, signupSchema } from "@/lib/validations/auth/signupSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  type: "login" | "signup";
};

const AuthForm = ({ type, className, ...props }: AuthFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [error, setError] = useState("");

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    disabled: isLoading,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    disabled: isLoading,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      picture: undefined,
      jobTitle: "",
      organisation: "",
      mobileNumber: "",
    },
  });

  const onLogin = async (data: LoginData) => {
    setError("");
    setIsLoading(true);

    const res = await login(data);

    setIsLoading(false);

    if (res.success) {
      toast.success("You have logged in successfully.");
      router.replace(searchParams?.get("next") || "/dashboard");
      router.refresh();
    } else {
      setError(res.error.replace("Error: ", ""));
      loginForm.resetField("password");
      loginForm.resetField("password");
    }
  };

  const onSignup = async (data: SignupData) => {
    setError("");
    setSignUpSuccess(false);
    setIsLoading(true);

    const body = new FormData();
    body.append("email", data.email);
    body.append("password", data.password);
    body.append("firstName", data.firstName);
    body.append("lastName", data.lastName);
    body.append("mobileNumber", data.mobileNumber);
    body.append("jobTitle", data.jobTitle);
    body.append("organisation", data.organisation);
    body.append("picture", data.picture);

    try {
      await createUser(body);
      setIsLoading(false);
      setSignUpSuccess(true);
    } catch (e: any) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }

    signupForm.resetField("password");
    signupForm.resetField("password");
    window.scrollTo(0, 0);
  };

  const formFooter = (
    <CardFooter className="flex-col gap-1">
      <Button type="submit" loading={isLoading} className="w-full mb-3">
        Continue
      </Button>
    </CardFooter>
  );

  const loginFormEl = (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLogin)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="bg-destructive">
              <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-destructive-foreground font-semibold">
                <AlertCircle className="h-4 w-4" />
                {error}
              </AlertDescription>
            </Alert>
          )}
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  Password
                  <Link
                    href="/auth/reset-password"
                    className="text-xs md:text-sm text-center underline"
                  >
                    Forgot your password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password..."
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        {formFooter}
      </form>
    </Form>
  );

  const signupFormContent = (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSignup)}>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert className="bg-destructive">
              <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-destructive-foreground font-semibold">
                <AlertCircle className="h-4 w-4" />
                {error}
              </AlertDescription>
            </Alert>
          )}
          {signUpSuccess && (
            <Alert className="bg-secondary text-secondary-foreground">
              <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 font-semibold text-xs sm:text-sm">
                <MailIcon className="h-4 w-4" />
                Please check your email for a sign-in link
              </AlertDescription>
            </Alert>
          )}
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    minLength={type === "login" ? 1 : 8}
                    placeholder="Password..."
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={signupForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoCapitalize="on"
                      autoComplete="given-name"
                      placeholder="John"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoCapitalize="on"
                      autoComplete="family-name"
                      placeholder="Doe"
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
            control={signupForm.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoCapitalize="on"
                    autoComplete="tel"
                    placeholder="0412345678"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    required
                    {...field}
                    value={undefined}
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title *</FormLabel>
                <FormControl>
                  <Input type="text" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="organization"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        {formFooter}
      </form>
    </Form>
  );

  if (user) return null;

  return (
    <Card
      key={type}
      className={cn("flex flex-col justify-center", className)}
      {...props}
    >
      <div className="group-data-[state=active]:animate-in group-data-[state=active]:fade-in-25 group-data-[state=active]:slide-in-from-top-1 group-data-[state=active]:duration-300">
        <CardHeader>
          <CardTitle>{type === "login" ? "Log In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {type === "login"
              ? "Log in to access your AusBizGrowth account."
              : "Create a new AusBizGrowth account."}
          </CardDescription>
        </CardHeader>
        {type === "login" ? loginFormEl : signupFormContent}
      </div>
    </Card>
  );
};

export default AuthForm;
