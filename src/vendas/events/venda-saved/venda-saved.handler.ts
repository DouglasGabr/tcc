import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { VendaSavedEvent } from './venda-saved.event';
import { Repository } from 'typeorm';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { VENDA_TOKEN } from 'src/constants/tokens';
import { Model } from 'mongoose';
import { VendaInterface } from 'src/models/mongodb/venda.interface';

@EventsHandler()
export class VendaSavedHandler implements IEventHandler<VendaSavedEvent> {

  constructor(
    @InjectRepository(VendaEntity) private readonly vendasRepository: Repository<VendaEntity>,
    @InjectModel(VENDA_TOKEN) private readonly vendaMongoModel: Model<VendaInterface>,
  ) { }

  async handle(event: VendaSavedEvent) {
    const { venda } = event;
    const savedVenda = await this.vendasRepository.save(venda);
    let mongoVenda = await this.vendaMongoModel.findOne({ mysqlId: savedVenda.id });
    if (!mongoVenda) {
      mongoVenda = new this.vendaMongoModel();
    }
    mongoVenda.set({ ...savedVenda, mysqlId: savedVenda.id });
    await mongoVenda.save();
  }

}