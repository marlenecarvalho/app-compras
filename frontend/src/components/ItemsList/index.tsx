import { useEffect, useRef, useState } from 'react';
import CategoryBadge from '../CategoryBadge';
import { Categoria, Item } from '../types';
import { MoreVertical, Trash2 } from 'lucide-react';

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
  className = '',
}: ItemsListProps) => {
  return (
    <ul className={`space-y-3 ${className}`}>
      {itens.map((item) => {
        const cat = categories.find((c) => c.id === item.categoria);
        const Emoji = (cat?.emoji as any) || undefined;

        const subtitle =
          item.unidade?.toLowerCase() === 'kg'
            ? `${item.quantidade} kg`
            : `${item.quantidade} ${Number(item.quantidade) > 1 ? 'unidades' : 'unidade'}`;
            
        

        return (
          <ItemRow
            key={item.id}
            item={item}
            subtitle={subtitle}
            cat={{
              name: cat?.nome,
              color: cat?.cor,
              Emoji,
            }}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        );
      })}
    </ul>
  );
};

function ItemRow({
  item,
  subtitle,
  cat,
  onRemove,
  onToggle,
}: {
  item: Item;
  subtitle: string;
  cat: { name?: string; color?: string; Emoji?: React.ComponentType<{ size?: number; className?: string }> };
  onRemove?: (id: number) => void;
  onToggle?: (id: number, comprado: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // fecha dropdown clicando fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const comprado = !!item.comprado;

  return (
    <li
      className={` flex items-center justify-center
         gap-85 rounded-2xl border px-80 py-3 shadow-lg transition-colors
        ${comprado ? 'border-emerald-700 bg-emerald-950/20' : 'border-zinc-800 bg-zinc-900/60'}`}
    >
      {/* Esquerda: checkbox + título/subtítulo */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-emerald-500"
          checked={comprado}
          onChange={(e) => onToggle?.(item.id, e.target.checked)}
        />
        <div>
          <div
            className={`text-base font-medium transition-colors
              ${comprado ? 'line-through text-emerald-400' : 'text-zinc-100'}`}
          >
            {item.nome}
          </div>
          <div className={`text-xs ${comprado ? 'text-emerald-300/80' : 'text-zinc-400'}`} >{subtitle}</div>
        </div>
      </div>

      {/* Direita: badge + menu */}
      <div className="flex items-center gap-2">
        {cat.name && (
          <CategoryBadge name={cat.name} color={cat.color} Emoji={cat.Emoji} className="mr-1" />
        )}

        {/* Botão menu (três pontinhos) */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            className="rounded-xl border border-zinc-800 p-2 hover:bg-zinc-800"
            onClick={() => setOpen((v) => !v)}
          >
            <MoreVertical size={16} />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="menu"
              className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-md shadow-xl"
            >
              {/* Aqui vai a lixeira (Excluir) DENTRO do menu */}
              <button
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
                onClick={() => {
                  setOpen(false);
                  onRemove?.(item.id);
                }}
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
