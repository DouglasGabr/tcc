import { IEvent } from '@nestjs/cqrs';
import { VendaEntity } from 'src/models/mysql/venda.entity';

export class VendaRemovedEvent implements IEvent {
  constructor(
    public readonly venda: VendaEntity,
  ) { }
}