import { forwardRef } from "react";
import { FieldError } from "../FieldError";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-zinc-700">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
          {hint && (
            <span className="ml-2 font-normal text-zinc-400 text-xs">
              {hint}
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        className={[
          "w-full px-4 py-3.5 bg-white border rounded-xl text-sm text-zinc-800",
          "placeholder-zinc-400 outline-none transition-all duration-200",
          "focus:ring-2 focus:ring-indigo-100",
          error
            ? "border-red-300 focus:border-red-400"
            : "border-zinc-200 focus:border-indigo-400",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <FieldError msg={error} />}
    </div>
  ),
);
Input.displayName = "Input";
