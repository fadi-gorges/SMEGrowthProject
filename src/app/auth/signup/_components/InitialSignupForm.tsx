"use client";

import { createUser } from "@/actions/auth/createUser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  InitialSignupData,
  initialSignupSchema,
} from "@/lib/validations/auth/initialSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type InitialSignupFormProps = React.HTMLAttributes<HTMLDivElement> & {
  initialSignupComplete: () => void;
};

const InitialSignupForm = ({
  initialSignupComplete,
  className,
  ...props
}: InitialSignupFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signupForm = useForm<InitialSignupData>({
    resolver: zodResolver(initialSignupSchema),
    disabled: isLoading,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignup = async (data: InitialSignupData) => {
    setError("");
    setIsLoading(true);

    try {
      const res = await createUser(data);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error);
        return;
      }

      initialSignupComplete();
    } catch (e: any) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }

    signupForm.resetField("password");
    signupForm.resetField("password");
    signupForm.resetField("confirmPassword");
    signupForm.resetField("confirmPassword");
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
            <h3>Sign Up</h3>
          </CardTitle>
          <CardDescription>
            <p>
              Sign up to get started with our Australian Business Growth
              Recommender Platform.
            </p>
          </CardDescription>
        </CardHeader>
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSignup)}
            className="space-y-3"
          >
            <CardContent className="space-y-4">
              {error && (
                <Alert className="bg-destructive">
                  <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-destructive-foreground font-semibold">
                    <AlertCircle className="h-4 w-4" />
                    <small>{error}</small>
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex gap-2">
                <FormField
                  control={signupForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="text"
                          autoCapitalize="on"
                          autoComplete="given-name"
                          placeholder="First Name"
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
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="text"
                          autoCapitalize="on"
                          autoComplete="family-name"
                          placeholder="Last Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        placeholder="Email"
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
                    <FormControl>
                      <Input
                        type="password"
                        minLength={8}
                        autoComplete="new-password"
                        placeholder="Password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
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
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <div className="flex gap-3 items-center">
                      <FormControl>
                        <Checkbox
                          className="rounded-[4px]"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormLabel>
                        <small className="text-foreground">
                          I accept the{" "}
                          <Link
                            href="/terms"
                            className={cn(
                              buttonVariants({ variant: "link" }),
                              "p-0 h-0"
                            )}
                          >
                            <small>terms and conditions</small>
                          </Link>
                        </small>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col gap-1 lg:gap-3">
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full"
              >
                Continue
                <ArrowRightIcon size={16} />
              </Button>
              <div className="flex items-center justify-center gap-2">
                <small>Already a member?</small>
                <Link
                  href="/auth/login"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "underline p-0"
                  )}
                >
                  <small>Sign in!</small>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default InitialSignupForm;
