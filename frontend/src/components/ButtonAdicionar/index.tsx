import { Plus } from "lucide-react";

type ButtonAdicionarProps = {
  onClick: () => void;
  disable?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const ButtonAdicionar = ({
  onClick,
  disable = false,
  type = "button",
  className = "",
}: ButtonAdicionarProps) => {
  const base =
    "grid h-11 w-11 place-items-center rounded-full bg-violet-600 text-white " +
    "hover:bg-violet-500 transition disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <button
      type={type}
      disabled={disable}
      onClick={onClick}
      className={`${base} ${className}`}
    >
      <Plus size={18} />
    </button>
  );
};
