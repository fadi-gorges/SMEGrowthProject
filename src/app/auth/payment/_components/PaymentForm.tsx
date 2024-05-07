"use client";
import { addPaymentDetails } from "@/actions/auth/addPaymentDetails";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import {
  PaymentData,
  paymentSchema,
} from "@/lib/validations/auth/paymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PaymentForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const paymentForm = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    disabled: isLoading,
    defaultValues: {
      name: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    },
  });

  const onSubmit = async (data: PaymentData) => {
    setError("");
    setIsLoading(true);

    try {
      const res = await addPaymentDetails(data);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error);
        return;
      }

      toast.success("You have signed up successfully!");
      router.replace("/dashboard");
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
            <h4 className="text-center">Monthly Subscription</h4>
          </CardTitle>
        </CardHeader>
        <Form {...paymentForm}>
          <form onSubmit={paymentForm.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-3">
              <small className="text-xs">
                <span className="text-red-500">Notice:</span> You are signing up
                to an annual subscription payable monthly and renewed
                automatically on the anniversary of today&apos;s date.
              </small>
              <div className="flex justify-between">
                <div>
                  <h6>Pack Name:</h6>
                  <h3 className="font-bold">Subscription Pack</h3>
                </div>
                <div>
                  <h6>Subtotal:</h6>
                  <h3 className="font-bold">$995</h3>
                </div>
              </div>
              <Separator className="my-3" />
              <h5 className="text-center">Payment Details</h5>
              <small className="text-xs text-center">
                Payment is by{" "}
                <span className="text-red-500">credit card only</span>. You will
                be sent a tax invoice to your email address.
              </small>
              {error && (
                <Alert className="bg-destructive">
                  <AlertDescription className="flex justify-center items-center gap-2 md:gap-3 text-destructive-foreground font-semibold">
                    <AlertCircle className="h-4 w-4" />
                    <small>{error}</small>
                  </AlertDescription>
                </Alert>
              )}
              <FormField
                control={paymentForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentForm.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="4242 4242 4242 4242"
                        autoComplete="cc-number"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <div>
                  <FormLabel>Expiration Date *</FormLabel>
                  <div className="flex gap-2 py-2">
                    <FormField
                      control={paymentForm.control}
                      name="expMonth"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            autoComplete="cc-exp-month"
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem
                                  key={i}
                                  value={(i + 1).toString().padStart(2, "0")}
                                >
                                  {(i + 1).toString().padStart(2, "0")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="expYear"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            autoComplete="cc-exp-year"
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => (
                                <SelectItem
                                  key={i}
                                  value={(
                                    new Date().getFullYear() + i
                                  ).toString()}
                                >
                                  {new Date().getFullYear() + i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={paymentForm.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          autoComplete="cc-csc"
                          minLength={3}
                          maxLength={3}
                          required
                          className="w-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full"
              >
                Pay $995
                <ArrowRightIcon size={16} />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default PaymentForm;
