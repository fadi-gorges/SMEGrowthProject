import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { HTMLAttributes } from "react";

type MainProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "small" | "normal";
  enableHexBackground?: boolean;
};

const Main = ({
  padding = "normal",
  enableHexBackground = false,
  className,
  ...props
}: MainProps) => {
  return (
    <>
      {enableHexBackground && (
        <Image
          src="/images/hex.png"
          alt=""
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
      <main
        className={cn(
          "flex-1 flex flex-col gap-5",
          padding === "small" ? "small-page-padding" : "page-padding",
          enableHexBackground && "z-10",
          className
        )}
        {...props}
      />
    </>
  );
};

export default Main;
