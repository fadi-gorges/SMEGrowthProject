import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

type MainProps = HTMLAttributes<HTMLDivElement>;

const Main = ({ className, children, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        "page-container flex-1 flex flex-col mt-20 lg:mt-24 xl:mt-28 gap-5",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default Main;
