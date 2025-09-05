import { LucideIcon } from "lucide-react";

type Categoria = {
    id: number;
    nome: string;
    emoji: LucideIcon;
    descricao: string;
    cor: string

}

type Item = {
    id: number;
    nome: string;
    quantidade: number;
    unidade: string
    categoriaId: string 
}