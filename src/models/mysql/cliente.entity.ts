import { ClienteSexo } from 'src/constants/cliente-sexo.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VendaEntity } from './venda.entity';

@Entity()
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  sobrenome: string;
  @Column('varchar')
  sexo: ClienteSexo;
  @Column()
  idade: number;
  @OneToMany(type => VendaEntity, venda => venda.cliente)
  vendas: VendaEntity[];
}