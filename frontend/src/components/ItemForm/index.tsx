type ItemFormProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
 
};

export const ItemForm = ({ value, onChange, placeholder="Digite o nome do item", }: ItemFormProps) => {
    return (
        <input 
        type="text"
        title="Item"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex w-56 items-center justify-between rounded-xl border border-violet-400/40
         bg-zinc-900/60 px-3 py-2 text-zinc-200 outline-none ring-violet-500/40 transition focus:ring-2"       />
    )
}