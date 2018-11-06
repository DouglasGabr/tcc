import { ICommand } from '@nestjs/cqrs';
import { InsertVendaDto } from '../../dtos/insert-venda.dto';

export class InsertVendaCommand implements ICommand {
  constructor(
    public readonly insertVendaDto: InsertVendaDto,
  ) { }
}