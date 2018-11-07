import { IsNumber, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsNumber()
  produtoId: number;
  @IsNumber()
  quantidade: number;
  @IsNumber()
  valorUnitario: number;
}

export class InsertVendaDto {
  @IsNumber()
  valorTotal: number;
  @IsNumber()
  clienteId: number;
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ItemDto)
  itens: ItemDto[];
}