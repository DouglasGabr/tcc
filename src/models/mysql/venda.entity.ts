import { ClienteEntity } from './cliente.entity';
import { VendaItemEntity } from './venda-item.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { VendaSavedEvent } from 'src/vendas/events/venda-saved/venda-saved.event';
import { VendaRemovedEvent } from 'src/vendas/events/venda-removed/venda-removed.event';

@Entity()
export class VendaEntity extends AggregateRoot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  valorTotal: number;

  @ManyToOne(type => ClienteEntity, cliente => cliente.vendas)
  cliente: ClienteEntity;

  @OneToMany(type => VendaItemEntity, vendaItem => vendaItem.venda, {
    cascade: true,
  })
  itens: VendaItemEntity[];

  save() {
    this.apply(new VendaSavedEvent(this));
  }

  remove() {
    this.apply(new VendaRemovedEvent(this));
  }
}