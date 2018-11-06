import { ProdutoInterface } from './produto.interface';

export class VendaItemInterface {
  quantidade: number;
  valorUnitario: number;
  produto: ProdutoInterface;
}