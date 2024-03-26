import Image from "next/image";
import { cn } from "../lib/utils/cn";

export interface IMGIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export interface SVGIconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

const Icon = ({ className, size = 24, ...props }: IMGIconProps) => (
  <Image
    src="/icon.png"
    alt="Logo"
    className={className}
    {...props}
    width={size}
    height={size}
  />
);

const PayloadIcon = () => <Icon className="w-6 h-6 md:w-9 md:h-9" />;

const PayloadLogo = ({ className }: IMGIconProps) => (
  <h2 className="flex gap-6 items-center font-sans text-5xl">
    <Image
      src="/icon.png"
      alt="Logo"
      width={75}
      height={75}
      className={cn("h-16 w-16 md:h-20 md:w-20", className)}
    />
    AusBizGrowth Admin
  </h2>
);

export const Icons = {
  icon: Icon,
  payloadIcon: PayloadIcon,
  payloadLogo: PayloadLogo,
};
