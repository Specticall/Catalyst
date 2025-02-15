/*
COMPONENT_DEPENDENCIES=loading-spinner
DEPENDENCIES=
DEV_DEPENDENCIES=class-variance-authority
*/
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/lib";
import { forwardRef, Ref } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-sm text-sm transition-colors disabled:pointer-events-none px-6 py-3 cursor-pointer transition disabled:bg-slate-500 leading-[100%] items-center",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-accent hover:opacity-80 disabled:bg-highlight/70",
        secondary:
          "bg-base border border-border text-white hover:bg-secondary/10 disabled:bg-highlight/70",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    to?: string;
  };

function Button(
  { className, variant, isLoading, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      ref={ref}
      disabled={props.disabled || isLoading}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
      {isLoading && <LoadingSpinner className="stroke-white ml-2" />}
    </button>
  );
}

Button.displayName = "Button";

export default forwardRef(Button);
