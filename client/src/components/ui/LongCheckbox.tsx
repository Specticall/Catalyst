import { HTMLAttributes, Ref, forwardRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/utils/lib";

type Props = {
  /**
   * Displays a label indicator above the component
   */
  label?: string;

  /**
   * Displays a loading skeleton in place of the component
   */
  isLoading?: boolean;

  /**
   * Display an nicely formatted error message
   */
  errorMessage?: string;
  value?: boolean;
  onCheck?: (value: boolean) => void;
};

function LongCheckbox(
  {
    label,
    isLoading,
    errorMessage,
    value,
    onCheck,
    ...props
  }: Props & HTMLAttributes<HTMLDivElement>,
  ref: Ref<HTMLInputElement>
) {
  const [checked, setChecked] = useState(false);
  const usedValue = typeof value === "undefined" ? checked : value;

  return (
    <div className={props.className}>
      {!isLoading ? (
        <div
          {...props}
          ref={ref}
          className={cn(
            "border border-border bg-base rounded-sm w-full px-5 py-3 text-white disabled:text-slate-500 outline-none focus:border-accent transition placeholder:text-secondary flex justify-between items-center disabled:cursor-not-allowed cursor-pointer hover:bg-highlight/50",
            usedValue && "border-accent-highlight",
            errorMessage && "border-red-400 "
          )}
          onClick={(e) => {
            if (props.onClick) props.onClick(e);
            setChecked((cur) => !cur);
            if (onCheck) onCheck(!usedValue);
          }}
        >
          {label}
          <div
            className={cn(
              "w-5 h-5 border border-border rounded-[0.125rem] transition duration-100",
              usedValue && "border-accent-highlight bg-accent-foreground"
            )}
          ></div>
        </div>
      ) : (
        <Skeleton
          containerClassName="block leading-0"
          height={"2.5rem"}
          className="mt-0 block"
        />
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 mt-1">
          <svg
            className="text-red-400 fill-red-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path>
            <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
          </svg>
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default forwardRef(LongCheckbox);
