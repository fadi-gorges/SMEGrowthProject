import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils/cn";

import Spinner from "../Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition",
  {
    variants: {
      variant: {
        default: "bg-blue-700 text-white hover:bg-blue-800",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-foreground/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        muted: "bg-muted/[40%] hover:bg-muted/[50%]",
        ghost: "hover:bg-foreground/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  spinnerSize?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      spinnerSize = 16,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <Spinner size={spinnerSize} />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
