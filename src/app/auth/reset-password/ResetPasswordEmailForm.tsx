"use client";
import { forgotPasswordAction } from "@/actions/auth/forgotPassword";
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
import { EmailData, emailSchema } from "@/lib/validations/auth/emailSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

type ResetPasswordEmailFormProps = React.HTMLAttributes<HTMLDivElement>;

const ResetPasswordEmailForm = ({
  className,
  ...props
}: ResetPasswordEmailFormProps) => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean>();
  const [message, setMessage] = React.useState("");

  const form = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
    disabled: isLoading,
  });

  const onSubmit = async (data: EmailData) => {
    setSuccess(undefined);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await forgotPasswordAction({ email: data.email });

      setSuccess(res.success);
      setMessage(
        res.success
          ? "Please follow the password reset link that was sent to your email."
          : res.error
      );
    } catch (e) {
      setSuccess(false);
      setMessage("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    !user &&
    (success ? (
      <Alert className="w-full max-w-xl bg-secondary text-secondary-foreground">
        <AlertDescription className="flex justify-center items-center gap-2 md:gap-3">
          <CheckCircleIcon className="w-6 h-6 mr-2" />
          <p className="font-bold">{message}</p>
        </AlertDescription>
      </Alert>
    ) : (
      <Card
        className={cn(
          "w-full max-w-xl flex flex-col justify-center",
          className
        )}
        {...props}
      >
        <div className="form-slide-in">
          <CardHeader>
            <CardTitle>
              <h3>Forgot Password</h3>
            </CardTitle>
            <CardDescription>
              <p>Enter your email address to receive a password reset link.</p>
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-2">
                {success === false && (
                  <Alert className="bg-destructive text-destructive-foreground">
                    <AlertDescription className="flex justify-center items-center gap-2 md:gap-3">
                      <AlertCircleIcon className="h-6 w-6 mr-2" />
                      <p className="text-xs sm:text-sm font-bold">{message}</p>
                    </AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={form.control}
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
              </CardContent>
              <CardFooter className="flex-col">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full mb-3"
                >
                  Continue
                  <ArrowRightIcon size={16} />
                </Button>
                <Link
                  href="/auth/login"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-center underline"
                  )}
                >
                  <small>Back to login</small>
                </Link>
              </CardFooter>
            </form>
          </Form>
        </div>
      </Card>
    ))
  );
};

export default ResetPasswordEmailForm;
