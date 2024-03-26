import { forgotPasswordAction } from "@/actions/auth/forgotPassword";
import ResetPasswordEmailForm from "@/app/auth/reset-password/ResetPasswordEmailForm";
import Main from "@/components/page/Main";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getServerUser } from "@/lib/utils/getServerUser";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Recover your SME@UTS account.",
};

const ResetPasswordEmailPage = async () => {
  const user = await getServerUser();

  let success;
  let message;

  if (user) {
    const res = await forgotPasswordAction({ email: user.email });

    success = res.success;
    message = res.success
      ? "Please follow the password reset link that was sent to your email."
      : res.error;
  }

  return (
    <Main className="items-center">
      {user ? (
        success !== undefined && (
          <Alert
            className={`w-full max-w-xl px-2 mt-3 ${
              success
                ? "bg-secondary text-secondary-foreground"
                : "bg-destructive text-destructive-foreground"
            }`}
          >
            <AlertDescription className="flex justify-center items-center gap-2 md:gap-3">
              {success ? (
                <CheckCircleIcon className="w-8 h-8 mr-2" />
              ) : (
                <AlertCircleIcon className="h-8 w-8 mr-2" />
              )}
              <p className="font-bold">{message}</p>
            </AlertDescription>
          </Alert>
        )
      ) : (
        <ResetPasswordEmailForm />
      )}
    </Main>
  );
};

export default ResetPasswordEmailPage;
