import ResetPasswordForm from "@/app/auth/reset-password/[token]/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
  description: "Reset your AusBizGrowth account password.",
};

const ResetPasswordPage = async () => {
  return (
    <main className="padding top-margin flex-1 flex flex-col items-center">
      <ResetPasswordForm />
    </main>
  );
};

export default ResetPasswordPage;
