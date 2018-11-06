import { ClienteInterface } from './cliente.interface';
import { VendaItemInterface } from './venda-item.interface';
import { Document } from 'mongoose';

export interface VendaInterface extends Document {
  mysqlId: number;
  valorTotal: number;
  cliente: ClienteInterface;
  itens: VendaItemInterface[];
}