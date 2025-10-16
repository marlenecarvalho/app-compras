import React, { useEffect, useRef, useState } from 'react';
import { Categoria } from '../types';

type Props = {
  categories: Categoria[];
  selected?: string;                         // id da categoria selecionada
  onSelect: (categoriaId: string) => void;
  className?: string;
};

export const CategoriasList = ({
  categories,
  selected = '',
  onSelect,
  className = '',
}: Props) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const selectedCat = categories.find((c) => c.id === selected) || null;
  const SelectedIcon = selectedCat?.emoji || null;

  // Fecha ao clicar fora
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Botão de seleção */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-40 items-center justify-between rounded-xl border border-violet-400/40 bg-zinc-900/60 px-3 py-2 text-zinc-200 outline-none ring-violet-500/40 transition focus:ring-2"
      >
        <span className="flex items-center gap-2">
          {SelectedIcon ? <SelectedIcon className="h-4 w-4" /> : null}
          <span className={`${selectedCat ? '' : 'text-zinc-400'}`}>
            {selectedCat ? selectedCat.nome : 'Selecione'}
          </span>
        </span>

        {/* Chevron que gira quando abre */}
        <svg
          className={`h-4 w-4 transition-transform ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          ref={menuRef}
          role="listbox"
          className="absolute z-50 mt-2 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-sm shadow-2xl"
        >
          {categories.map((cat) => {
            const Icon = cat.emoji;
            const isActive = cat.id === selected;

            return (
              <li
                key={cat.id}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onSelect(cat.id);
                  setOpen(false);
                }}
                className={`flex cursor-pointer select-none items-center gap-3 px-3 py-2.5 text-sm transition
                  hover:bg-zinc-800/80 ${isActive ? 'bg-zinc-800/60' : ''}`}
              >
                {/* ícone com cor da categoria */}
                <span
                  className="grid h-6 w-6 place-items-center rounded-md border"
                  style={{
                    color: cat.cor ?? '#a1a1aa',
                    borderColor: cat.cor ?? '#3f3f46',
                    backgroundColor: `${(cat.cor ?? '#3f3f46')}20`,
                  }}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : '🏷️'}
                </span>

                <span className="text-zinc-200">{cat.nome}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
