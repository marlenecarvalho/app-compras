// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Forms } from '@/components/Forms';
import { ItemsList } from '@/components/ItemsList';
import { categorias } from '@/data/categorias';
import type { Item } from '@/components/types';
import { addItem, deleteItem, fetchItems } from '@/lib/api';

export default function HomePage() {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems().then(setItens).catch(console.error);
  }, []);

  const handleAddItem = async (payload: {
    nome: string; quantidade: number; unidade: string; categoria: string;
  }) => {
    const novo = await addItem(payload);
    setItens((p) => [novo, ...p]);
  };

  const handleRemove = async (id: number) => {
    await deleteItem(id);
    setItens((p) => p.filter((i) => i.id !== id));
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Banner com doodles + overlay de título e labels */}
      <section className="relative z-0 h-24 md:h-32 w-full">
        <Image
          src="/imagem.png"
          alt="Doodles"
          fill
          priority
          className="object-cover h-auto w-full"
        />

        

        {/* overlay ancorado no rodapé do banner */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-5xl md:px-10 pb-2 md:pb-3">
            <h1 className="text-3xl font-bold tracking-tight px-45 mb-2">Lista de Compras</h1>

            {/* labels exatamente sobre a imagem */}
            <div className=" py-2  text-sm text-zinc-300">
              <span className='px-47'>Item</span>
              <span className='px-5'>Quantidade</span>
              <span className='px-24'>Categoria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="relative z-30 mx-auto w-full max-w-2xl px-1  md:px-10">
        {/* Form “encaixado” sob os labels */}
        <section className=" mb-2 mt-4 md:-mt-5 w-17">
          <Forms categories={categorias} onAddItem={handleAddItem} />
        </section>

        {/* Lista */}
        <section className="pt-1 w-17">
          <div className="space-y-1">
            <ItemsList itens={itens} categories={categorias} onRemove={handleRemove} />
          </div>
        </section>
      </div>
    </main>
  );
}
