import { IsNumber, IsArray, ArrayNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsNumber()
  @IsOptional()
  produtoId: number;
  @IsOptional()
  @IsNumber()
  quantidade: number;
  @IsNumber()
  @IsOptional()
  valorUnitario: number;
}

export class UpdateVendaDto {
  @IsNumber()
  @IsOptional()
  valorTotal: number;
  @IsNumber()
  @IsOptional()
  clienteId: number;
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ItemDto)
  @IsOptional()
  itens: ItemDto[];
}