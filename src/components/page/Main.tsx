import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

const Main = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <main
      className={cn("page-padding flex-1 flex flex-col gap-5", className)}
      {...props}
    />
  );
};

export default Main;
