import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VendaRemovedEvent } from './venda-removed.event';
import { InjectRepository } from '@nestjs/typeorm';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { Repository } from 'typeorm';
import { VendaInterface } from 'src/models/mongodb/venda.interface';
import { Model } from 'mongoose';
import { VENDA_TOKEN } from 'src/constants/tokens';
import { InjectModel } from '@nestjs/mongoose';

@EventsHandler(VendaRemovedEvent)
export class VendaRemovedHandler implements IEventHandler<VendaRemovedEvent> {

  constructor(
    @InjectRepository(VendaEntity) private readonly vendasRepository: Repository<VendaEntity>,
    @InjectModel(VENDA_TOKEN) private readonly vendaMongoModel: Model<VendaInterface>,
  ) { }

  async handle(event: VendaRemovedEvent) {
    const { venda } = event;
    await this.vendaMongoModel.deleteOne({ id: venda.id }).exec();
    await this.vendasRepository.remove(venda);
  }
}