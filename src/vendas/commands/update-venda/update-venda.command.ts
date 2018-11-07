import { ICommand } from '@nestjs/cqrs';
import { UpdateVendaDto } from 'src/vendas/dtos/update-venda.dto';

export class UpdateVendaCommand implements ICommand {
  constructor(
    public readonly updateVendaDto: UpdateVendaDto,
    public readonly id: number,
  ) { }
}