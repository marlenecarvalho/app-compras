import { Apple, Carrot, Beef, Sandwich, Milk } from "lucide-react";
import type { Categoria } from "@/components/types";

export const categorias: Categoria[] = [
  { id: "fruta",   nome: "Fruta",  emoji: Apple,    descricao: "Fruta",   cor: "bg-[#E07B67]" },
  { id: "legume",  nome: "Legume", emoji: Carrot,   descricao: "Legume",  cor: "bg-[#8CAD51]" },
  { id: "carne",   nome: "Carne",  emoji: Beef,     descricao: "Carne",   cor: "bg-[#DB5BBF]" },
  { id: "padaria", nome: "Padaria",emoji: Sandwich, descricao: "Padaria", cor: "bg-[#BB9F3A]" },
  { id: "bebida",  nome: "Bebida", emoji: Milk,     descricao: "Bebida",  cor: "bg-[#7B94CB]" },
];