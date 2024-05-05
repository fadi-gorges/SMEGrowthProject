import ResetPasswordForm from "@/app/auth/reset-password/[token]/ResetPasswordForm";
import Main from "@/components/page/Main";

export const metadata = {
  title: "Reset Password",
  description: "Reset your AusBizGrowth account password.",
};

const ResetPasswordPage = async () => {
  return (
    <Main className="items-center justify-center">
      <ResetPasswordForm />
    </Main>
  );
};

export default ResetPasswordPage;
