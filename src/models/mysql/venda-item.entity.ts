import { ProdutoEntity } from './produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VendaEntity } from './venda.entity';

@Entity()
export class VendaItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantidade: number;
  @Column('float')
  valorUnitario: number;
  @ManyToOne(type => ProdutoEntity, produto => produto.vendaItens)
  produto: ProdutoEntity;
  @ManyToOne(type => VendaEntity, venda => venda.itens, {
    onDelete: 'CASCADE',
  })
  venda: VendaEntity;
}