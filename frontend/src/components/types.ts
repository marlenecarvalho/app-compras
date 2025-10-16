import { LucideIcon } from "lucide-react";

export type Categoria = {
    id: string;
    nome: string;
    emoji: LucideIcon;
    descricao: string;
    cor: string

};
export type Item = {
    id: number;
    nome: string;
    quantidade: number;
    unidade: string;
    categoria: string;
    comprado?: boolean;
    // categoriaId: string 
}