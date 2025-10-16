import { Plus } from "lucide-react";

type ButtonAdicionarProps = {
    onClick: () => void;
    disable?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
};

export const ButtonAdicionar = ({ onClick, disable= false, type="button", className="" }: ButtonAdicionarProps) => {
    return (
        <button
        type={type}
        disabled={disable}
        onClick={onClick}
        className='bg-purple-500 hover:bg-purple-700 text-white font-bold px-3 py-3 left-7 rounded-full  disabled:cursor-not-allowed flex items-end-safe' >

           <Plus 
           size={18} strokeWidth={2}
           />

        </button>
    )}