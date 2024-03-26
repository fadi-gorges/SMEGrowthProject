import { buttonVariants } from "../ui/button";

const ReturnToSite = () => {
  return (
    <a href="/dashboard" className={buttonVariants({ variant: "outline" })}>
      Return to Site
    </a>
  );
};

export default ReturnToSite;
