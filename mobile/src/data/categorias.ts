import type { Category } from '../types';
import { Apple, Carrot, Beef, Sandwich, Milk } from 'lucide-react-native';




export const categorias: Category[] = [
  { id: 'fruta',   nome: 'Fruta',   cor: '#E07B67', Icon: Apple },
  { id: 'legume',  nome: 'Legume',  cor: '#8CAD51', Icon: Carrot },
  { id: 'carne',   nome: 'Carne',   cor: '#DB5BBF', Icon: Beef },
  { id: 'padaria', nome: 'Padaria', cor: '#BB9F3A', Icon: Sandwich },
  { id: 'bebida',  nome: 'Bebida',  cor: '#7B94CB', Icon: Milk },
];