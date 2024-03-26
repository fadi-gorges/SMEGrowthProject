import ResetPasswordForm from "@/app/auth/reset-password/[token]/ResetPasswordForm";
import Main from "@/components/page/Main";

export const metadata = {
  title: "Reset Password",
  description: "Reset your SME@UTS account password.",
};

const ResetPasswordPage = async () => {
  return (
    <Main className="items-center">
      <ResetPasswordForm />
    </Main>
  );
};

export default ResetPasswordPage;
