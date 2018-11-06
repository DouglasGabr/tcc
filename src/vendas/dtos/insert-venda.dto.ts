export interface InsertVendaDto {
  valorTotal: number;
  clienteId: number;
  itens: {
    produtoId: number,
    quantidade: number,
    valorUnitario: number,
  }[];
}