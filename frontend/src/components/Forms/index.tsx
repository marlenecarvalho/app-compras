import { useState } from "react";
import { Categoria } from "../types";
import { QuantidadeForm } from "../QuantidadeForm";
import { ButtonAdicionar } from "../ButtonAdicionar";
import { ItemForm } from "../ItemForm";
import { CategoriasList } from "../CategoriasList";

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
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [unidade, setUnidade] = useState<string>("Un.");
  const [categoriaId, setCategoriaId] = useState<string>("");

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
    setNome("");
    setQuantidade(1);
    setUnidade("Un.");
    setCategoriaId("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1 px-1">
      {/* Item */}
      <ItemForm
        value={nome}
        onChange={(v: string) => setNome(v)}
        placeholder=" "
        className="h-11 w-full border border-violet-400/40 bg-zinc-900/70 px-3 text-base text-zinc-100 outline-none ring-violet-500/40 focus:border-violet-400 focus:ring-2"
      />

      {/* Quantidade */}
      <QuantidadeForm
        quantidade={quantidade}
        setQuantidade={setQuantidade}
        unidade={unidade}
        setUnidade={setUnidade}
        unidadesDisponiveis={["Un.", "L", "Kg"]}
        className="h-11"
      />

      {/* Categoria */}
      <CategoriasList
        categories={categories}
        selected={categoriaId}
        onSelect={setCategoriaId}
        className="h-11"
      />

      {/* Botão + */}
      <ButtonAdicionar
        type="submit"
        disable={disabled}
        onClick={() => {}}
        className="ml-auto px-4 py-4 md:px-3 md:py-3"
      />
    </form>
  );
};
