import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

type MainProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "small" | "normal";
};

const Main = ({ padding = "normal", className, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        "flex-1 flex flex-col gap-5",
        padding === "small" ? "small-page-padding" : "page-padding",
        className
      )}
      {...props}
    />
  );
};

export default Main;
