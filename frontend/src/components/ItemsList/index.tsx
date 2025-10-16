import { useEffect, useRef, useState } from "react";
import CategoryBadge from "../CategoryBadge";
import { Categoria, Item } from "../types";
import { MoreVertical, Trash2 } from "lucide-react";

type EmojiIcon = React.ComponentType<{ size?: number; className?: string }>;

type ItemsListProps = {
  itens: Item[];
  categories: Categoria[];
  onRemove?: (id: number) => void;
  onToggle?: (id: number, comprado: boolean) => void;
  className?: string;
};

export const ItemsList = ({
  itens,
  categories,
  onRemove,
  onToggle,
  className = "",
}: ItemsListProps) => {
  return (
    <ul className={`space-y-3 ${className}`}>
      {itens.map((item) => {
        const cat = categories.find((c) => c.id === item.categoria);
        const Emoji = cat?.emoji as EmojiIcon | undefined;

        const subtitle =
          item.unidade?.toLowerCase() === "kg"
            ? `${item.quantidade} kg`
            : `${item.quantidade} ${
                Number(item.quantidade) > 1 ? "unidades" : "unidade"
              }`;

        return (
          <ItemRow
            key={item.id}
            item={item}
            subtitle={subtitle}
            cat={{ name: cat?.nome, color: cat?.cor, Emoji }}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        );
      })}
    </ul>
  );
};

/* ---- ITEM ROW ----------------------------------------------------------- */

function ItemRow({
  item,
  subtitle,
  cat,
  onRemove,
  onToggle,
}: {
  item: Item;
  subtitle: string;
  cat: {
    name?: string;
    color?: string;
    Emoji?: EmojiIcon;
  };
  onRemove?: (id: number) => void;
  onToggle?: (id: number, comprado: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // fecha dropdown clicando fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const comprado = !!item.comprado;

  return (
    <li
      className={`
        group
        flex items-center justify-between
        rounded-xl border border-zinc-800/60
        bg-zinc-900/60
        px-4 py-3
        w-150
        shadow-sm
        backdrop-blur
        transition
        hover:border-zinc-700
        ${comprado ? "border-emerald-700 bg-emerald-950/20" : ""}
      `}
    >
      {/* ESQUERDA: checkbox + textos */}
      <div className="flex min-w-0 items-start gap-3">
        <input
          type="checkbox"
          className="mt-[2px] h-5 w-5 rounded-[6px] border-2 border-violet-500/80 accent-emerald-500 focus:ring-0"
          checked={comprado}
          onChange={(e) => onToggle?.(item.id, e.target.checked)}
        />

        <div className="min-w-0">
          <div
            className={`truncate text-sm font-semibold transition-colors
              ${comprado ? "line-through text-emerald-400" : "text-zinc-100"}
            `}
            title={item.nome}
          >
            {item.nome}
          </div>
          <div
            className={`text-xs ${
              comprado ? "text-emerald-300/80" : "text-zinc-400"
            }`}
          >
            {subtitle}
          </div>
        </div>
      </div>

      {/* DIREITA: badge + menu */}
      <div className="ml-3 flex shrink-0 items-center gap-2">
        {cat.name && (
          <CategoryBadge
            name={cat.name}
            color={cat.color}
            Emoji={cat.Emoji}
            className="mr-1"
          />
        )}

        {/* menu 3 pontinhos */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="
              grid h-8 w-8 place-items-center
              rounded-lg border border-zinc-800/60
              bg-zinc-900/60 text-violet-300
              hover:border-zinc-700
            "
          >
            <MoreVertical size={16} />
          </button>

          {open && (
            <div
              role="menu"
              className="
                absolute right-0 z-20 mt-2 w-40 rounded-lg
                border border-zinc-800 bg-zinc-900/95 p-1
                shadow-xl backdrop-blur
              "
            >
              <button
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onRemove?.(item.id);
                }}
                className="
                  flex w-full items-center justify-start gap-2
                  rounded-md px-3 py-2 text-sm
                  text-red-400 hover:bg-zinc-800/70
                "
              >
                <Trash2 size={16} className="text-red-400" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
