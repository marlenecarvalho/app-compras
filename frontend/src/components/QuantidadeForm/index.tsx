import React, { useEffect, useRef, useState } from 'react';

type QuantidadeFormProps = {
  quantidade: number;
  setQuantidade: (quantidade: number) => void;
  unidade: string;                         // "Un.", "L", "Kg"
  setUnidade: (unidade: string) => void;
  unidadesDisponiveis?: string[];
  className?: string;
};

const UNITS_DEFAULT = ['Un.', 'L', 'Kg'];

export const QuantidadeForm = ({
  quantidade,
  setQuantidade,
  unidade,
  setUnidade,
  unidadesDisponiveis = UNITS_DEFAULT,
  className = '',
}: QuantidadeFormProps) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // fecha dropdown ao clicar fora
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  // helper pra borda roxa contínua entre input e select
  const sharedBorder =
    'border border-violet-400/40 bg-zinc-900/70 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* INPUT QUANTIDADE */}
      <div className="flex">
        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => {
            const n = Math.max(1, Number(e.target.value || 1));
            setQuantidade(n);
          }}
          className={`h-10 w-16 rounded-l-xl px-3 ${sharedBorder} border-r-0`}
        />

        {/* BOTÃO DO DROPDOWN (UNIDADE) */}
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`h-10 w-24 rounded-r-xl px-3 flex items-center justify-between ${sharedBorder}`}
        >
          <span className="text-sm">{unidade || 'Un.'}</span>
          <svg
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
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
      </div>

      {/* DROPDOWN MENU */}
      {open && (
        <ul
          ref={menuRef}
          role="listbox"
          className="absolute z-50 mt-12 w-24 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur"
        >
          {unidadesDisponiveis.map((opt) => {
            const active = opt === (unidade || 'Un.');
            return (
              <li
                key={opt}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setUnidade(opt);
                  setOpen(false);
                }}
                className={`flex cursor-pointer select-none items-center justify-between px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/80 ${
                  active ? 'bg-zinc-800/60' : ''
                }`}
              >
                <span>{opt}</span>
                {active && (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 11.086l6.543-6.543a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
