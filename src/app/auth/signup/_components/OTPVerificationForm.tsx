"use client";
import { verifyAndLoginUser } from "@/actions/auth/verifyAndLoginUser";
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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils/cn";
import { OtpData, otpSchema } from "@/lib/validations/auth/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const OTPVerificationForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const otpForm = useForm<OtpData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      token: "",
    },
  });

  const onVerify = async (data: OtpData) => {
    setIsLoading(true);

    try {
      const res = await verifyAndLoginUser(data);

      if (res.success) {
        router.replace("/auth/complete");
      }
    } catch (e: any) {
      otpForm.setError("token", { message: e.message });
    }

    setIsLoading(false);
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
            <h3>Enter verification code</h3>
          </CardTitle>
          <CardDescription>
            <p>
              A 6 digit verification code has been sent to your email. Enter the
              code below.
            </p>
          </CardDescription>
        </CardHeader>
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onVerify)}>
            <CardContent className="flex justify-center">
              <FormField
                control={otpForm.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="h-12 w-12 text-xl sm:h-16 sm:w-16 sm:text-2xl md:h-20 md:w-20 md:text-3xl"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full"
              >
                Verify account
                <ArrowRightIcon size={16} />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default OTPVerificationForm;
