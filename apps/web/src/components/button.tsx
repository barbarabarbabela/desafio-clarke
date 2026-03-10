import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  startIcon?: IconType;
  endIcon?: IconType;
  variant?: "flat" | "outline" | "plain";
}

export default function Button({
  children,
  startIcon: StartIcon,
  endIcon: EndIcon,
  variant = "flat",
  disabled,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center cursor-pointer justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    flat: "bg-yellow-400 text-zinc-900 hover:bg-yellow-300 active:bg-yellow-500",
    outline:
      "border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-100 active:bg-yellow-200 bg-transparent",
    plain:
      "text-yellow-600 hover:bg-yellow-100 active:bg-yellow-200 bg-transparent",
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {StartIcon && <StartIcon size={18} />}
      {children}
      {EndIcon && <EndIcon size={18} />}
    </button>
  );
}
