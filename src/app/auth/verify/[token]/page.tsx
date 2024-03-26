import { buttonVariants } from "@/components/ui/button";
import { getServerUser } from "@/lib/utils/getServerUser";
import getPayloadClient from "@/payload/payloadClient";
import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Account",
};

const VerifyPage = async ({ params }: { params: { token: string } }) => {
  const user = await getServerUser();

  if (user) redirect("/");

  const payload = await getPayloadClient();

  try {
    await payload.verifyEmail({
      collection: "users",
      token: params.token,
    });

    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-5">
        <h5>Your account has been verified.</h5>
        <Link
          href="/auth"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <h6>Log In</h6>
          <LogInIcon />
        </Link>
      </div>
    );
  } catch (e: any) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h5>{e.message}</h5>
      </div>
    );
  }
};

export default VerifyPage;
