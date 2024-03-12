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
import { SignupData, signupSchema } from "@/lib/validations/auth/signupSchema";
import { LoginData, loginSchema } from "@/lib/validations/loginSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
      email: "",
      password: "",
    },
  });

  const form = type === "login" ? loginForm : signupForm;

  useEffect(() => {
    if (user) {
      router.replace(searchParams?.get("next") || "/");
    }
  }, [user]);

  const onLogin = async (data: SignupData) => {
    setError("");
    setIsLoading(true);

    try {
      await login(data);
      setIsLoading(false);
      toast.success("You have logged in successfully.");
    } catch (e: any) {
      setError((e.message as string).replace("Error: ", ""));
      setIsLoading(false);
      loginForm.resetField("password");
      loginForm.resetField("password");
    }
  };

  const onSignup = async (data: SignupData) => {
    setError("");
    setSignUpSuccess(false);
    setIsLoading(true);

    try {
      await createUser(data);
      setIsLoading(false);
      setSignUpSuccess(true);
    } catch (e: any) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      signupForm.resetField("password");
      signupForm.resetField("password");
    }
  };

  return (
    <Card
      key={type}
      className={cn("min-h-[400px] flex flex-col justify-center", className)}
      {...props}
    >
      <div className="group-data-[state=active]:animate-in group-data-[state=active]:fade-in-25 group-data-[state=active]:slide-in-from-top-1 group-data-[state=active]:duration-300">
        <CardHeader>
          <CardTitle>{type === "login" ? "Log In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {type === "login"
              ? "Log in to access your SME@UTS account."
              : "Create a new SME@UTS account."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(type === "login" ? onLogin : onSignup)}
          >
            <CardContent className="space-y-2">
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
                control={form.control}
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
                        autoCorrect="off"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password..."
                        minLength={type === "login" ? 1 : 8}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col gap-1">
              <Button type="submit" loading={isLoading} className="w-full mb-3">
                Continue
              </Button>
              {type === "login" && (
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-center underline"
                >
                  Forgot your password?
                </Link>
              )}
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default AuthForm;
