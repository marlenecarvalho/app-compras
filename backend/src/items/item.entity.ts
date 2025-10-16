import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

    @Column()
    nome: string;

    @Column()
    quantidade: number; 

    @Column()
    unidade: string;

    @Column()
    categoria: string;


    @CreateDateColumn()
    createdAt: Date;
}