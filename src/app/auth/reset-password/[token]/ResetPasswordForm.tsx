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
import {
  PasswordData,
  passwordSchema,
} from "@/lib/validations/auth/passwordSchema";
import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ResetPasswordFormProps = React.HTMLAttributes<HTMLDivElement>;

const ResetPasswordForm = ({ className, ...props }: ResetPasswordFormProps) => {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const { user, resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    disabled: isLoading,
  });

  const onSubmit = async (data: PasswordData) => {
    setError("");
    setIsLoading(true);

    try {
      await resetPassword({
        password: data.password,
        passwordConfirm: data.confirmPassword,
        token: params?.token!,
      });
    } catch (e: any) {
      setError(e.message);
      setIsLoading(false);
      return;
    }

    toast.success("Your password has been reset successfully.");
    router.replace("/");
  };

  const passwordFormEl = (
    <Card
      className={cn(
        "w-full max-w-xl flex flex-col justify-center -translate-y-4",
        className
      )}
      {...props}
    >
      <div className="form-slide-in">
        <CardHeader>
          <CardTitle>
            <h3>Reset Password</h3>
          </CardTitle>
          <CardDescription>
            <p>Enter a new password to reset your account.</p>
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New Password"
                        required
                        minLength={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
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
              <Button type="submit" loading={isLoading} className="w-full mb-3">
                Continue
              </Button>
              {!user && (
                <Link
                  href="/auth/login"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-center underline"
                  )}
                >
                  <small>Back to login</small>
                </Link>
              )}
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );

  return (
    <>
      {error && (
        <Alert className="w-full max-w-xl bg-destructive mb-4">
          <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-destructive-foreground font-semibold">
            <AlertCircle className="h-5 w-5" />
            {error}
          </AlertDescription>
        </Alert>
      )}
      {passwordFormEl}
    </>
  );
};

export default ResetPasswordForm;
