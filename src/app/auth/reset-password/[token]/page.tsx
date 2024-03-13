import ResetPasswordForm from "@/app/auth/reset-password/[token]/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
  description: "Reset your SME@UTS account password.",
};

const ResetPasswordPage = async () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <ResetPasswordForm />
    </main>
  );
};

export default ResetPasswordPage;
