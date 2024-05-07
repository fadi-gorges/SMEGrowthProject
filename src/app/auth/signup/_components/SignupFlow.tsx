"use client";
import InitialSignupForm from "@/app/auth/signup/_components/InitialSignupForm";
import OTPVerificationForm from "@/app/auth/signup/_components/OTPVerificationForm";
import { useState } from "react";

const SignupFlow = () => {
  const [stage, setStage] = useState<"initial" | "otp">("initial");

  const handleInitialSignupComplete = () => {
    setStage("otp");
  };

  switch (stage) {
    case "initial":
      return (
        <InitialSignupForm
          initialSignupComplete={handleInitialSignupComplete}
        />
      );
    case "otp":
      return <OTPVerificationForm />;
    default:
      return null;
  }
};

export default SignupFlow;
