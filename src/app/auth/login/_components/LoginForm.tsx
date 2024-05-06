"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { LoginData, loginSchema } from "@/lib/validations/auth/loginSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginForm = React.HTMLAttributes<HTMLDivElement>;

const LoginForm = ({ className, ...props }: LoginForm) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    disabled: isLoading,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: LoginData) => {
    setError("");
    setIsLoading(true);

    try {
      await login(data);
      setIsLoading(false);
      router.replace(searchParams?.get("next") || "/dashboard");
      router.refresh();
    } catch (e: any) {
      setError((e.message as string).replace("Error: ", ""));
      setIsLoading(false);
      loginForm.resetField("password");
      loginForm.resetField("password");
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
            <h3>Sign In</h3>
          </CardTitle>
          <CardDescription>
            <p>Please log in to continue to your account.</p>
          </CardDescription>
        </CardHeader>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLogin)}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="bg-destructive">
                  <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-xs sm:text-sm text-destructive-foreground font-semibold">
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
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
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
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Link
                      href="/auth/reset-password"
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "px-1"
                      )}
                    >
                      <small>Forgot Password?</small>
                    </Link>
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
                <p>Sign in</p>
              </Button>
              <div className="flex items-center justify-center gap-2">
                <small>New here?</small>
                <Link
                  href="/auth/signup"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "underline p-0"
                  )}
                >
                  <small>Sign up!</small>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default LoginForm;
