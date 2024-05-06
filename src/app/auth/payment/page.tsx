import PaymentDetailsForm from "@/app/auth/payment/_components/PaymentDetailsForm";
import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Payment Details",
  description: "",
};

const PaymentDetailsPage = async () => {
  const user = await getServerUser();

  if (!user) redirect("/");

  if (!user.signupComplete || user.paymentSuccessful) redirect("/dashboard");

  return (
    <Main className="justify-center items-center">
      <PaymentDetailsForm />
    </Main>
  );
};

export default PaymentDetailsPage;
