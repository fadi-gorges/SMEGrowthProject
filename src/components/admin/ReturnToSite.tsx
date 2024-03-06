import Link from "next/link";
import { buttonVariants } from "../ui/button";

const ReturnToSite = () => {
  return (
    <Link href="/" className={buttonVariants({ variant: "outline" })}>
      Return to Site
    </Link>
  );
};

export default ReturnToSite;
