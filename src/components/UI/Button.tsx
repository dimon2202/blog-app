import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost-danger";
  loading?: boolean;
  loadingText?: string;
}

export const Button = ({
  variant = "primary",
  loading = false,
  loadingText,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:active:scale-100",
    outline:
      "border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-800",
    "ghost-danger":
      "border border-zinc-200 text-zinc-600 hover:border-red-300 hover:text-red-500",
  };

  return (
    <button
      disabled={disabled || loading}
      className={[base, variants[variant], className].join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
};


