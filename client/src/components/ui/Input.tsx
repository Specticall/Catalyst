import { InputHTMLAttributes, Ref, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/utils/lib";

type Props = {
  /**
   * Displays a label indicator above the component
   */
  label?: string;

  /**
   * Content when value is undefined
   */
  placeholder: string;

  /**
   * `className` for the child input element
   */
  inputClassName?: string;

  /**
   * Displays a loading skeleton in place of the component
   */
  isLoading?: boolean;

  /**
   * Display an nicely formatted error message
   */
  errorMessage?: string;
};

function Input(
  {
    label,
    isLoading,
    placeholder,
    errorMessage,
    inputClassName,
    onBlur,
    ...props
  }: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className={props.className}>
      <div className="flex justify-between">
        {label && <label className="pb-2 text-primary">{label}</label>}
      </div>
      {!isLoading ? (
        <input
          {...props}
          ref={ref}
          onBlur={onBlur}
          className={cn(
            "border border-border bg-highlight rounded-sm w-full px-5 py-3 text-white disabled:text-slate-500 outline-none focus:border-accent-highlight transition placeholder:text-secondary disabled:cursor-not-allowed",
            errorMessage && "border-red-400 ",
            inputClassName
          )}
          placeholder={placeholder}
        />
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

export default forwardRef(Input);
