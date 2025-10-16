

import { useState } from 'react';
import { Categoria } from '../types';
import { QuantidadeForm } from '../QuantidadeForm';
import { ButtonAdicionar } from '../ButtonAdicionar';
import { ItemForm } from '../ItemForm';
import { CategoriasList } from '../CategoriasList';

type FormsProps = {
  categories: Categoria[];
  onAddItem: (payload: {
    nome: string;
    quantidade: number;
    unidade: string;
    categoria: string;
  }) => void;
};

export const Forms = ({ categories, onAddItem }: FormsProps) => {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState<number>(1);
  // use o mesmo rótulo do dropdown (Un., L, Kg)
  const [unidade, setUnidade] = useState<string>('Un.');
  const [categoriaId, setCategoriaId] = useState<string>('');

  const disabled = !nome.trim() || !categoriaId || quantidade < 1;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;

    onAddItem({
      nome: nome.trim(),
      quantidade,
      unidade,
      categoria: categoriaId,
    });

    // reset bonito
    setNome('');
    setQuantidade(1);
    setUnidade('Un.');
    setCategoriaId('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      // grade com larguras idênticas à página/labels
      className="grid grid-cols-[1fr_160px_300px_44px] items-center gap-4 px-1"
    >
      {/* Item */}
      <ItemForm
        value={nome}
        onChange={setNome as any}
        placeholder=" "
        className="h-11 w-15 border border-violet-400/40 bg-zinc-900/70 px-3 text-base text-zinc-100 outline-none ring-violet-500/40 focus:border-violet-400 focus:ring-2"
      />

      {/* Quantidade */}
      <QuantidadeForm
        quantidade={quantidade}
        setQuantidade={setQuantidade}
        unidade={unidade}
        setUnidade={setUnidade}
        unidadesDisponiveis={['Un.', 'L', 'Kg']}
        className="h-11"
      />

      {/* Categoria */}
      <CategoriasList
        categories={categories}
        selected={categoriaId}
        onSelect={setCategoriaId}
        className="h-11 w-full"
      />

      {/* Botão + */}
      <ButtonAdicionar
        type="submit"
        disable={disabled}
        onClick={() => {}}
        className=" h-11 w-8 justify-self-end"
      />
    </form>
  );
};
