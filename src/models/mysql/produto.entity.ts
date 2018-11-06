import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VendaItemEntity } from './venda-item.entity';

@Entity()
export class ProdutoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  preco: number;
  @OneToMany(type => VendaItemEntity, item => item.produto)
  vendaItens: VendaItemEntity[];
}