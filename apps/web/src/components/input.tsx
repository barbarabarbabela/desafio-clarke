import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  endIcon?: ReactNode;
}

export default function Input({
  label,
  endIcon,
  id,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-600 uppercase tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg text-gray-900 placeholder:text-gray-300 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:opacity-40 ${className ?? ""}`}
          {...props}
        />
        {endIcon && (
          <span className="absolute right-4 flex items-center text-gray-400">
            {endIcon}
          </span>
        )}
      </div>
    </div>
  );
}
