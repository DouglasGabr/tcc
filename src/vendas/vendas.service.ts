import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InsertVendaDto } from './dtos/insert-venda.dto';
import { InsertVendaCommand } from './commands/insert-venda/insert-venda.command';
import { InjectModel } from '@nestjs/mongoose';
import { VENDA_TOKEN } from 'src/constants/tokens';
import { Model } from 'mongoose';
import { VendaInterface } from 'src/models/mongodb/venda.interface';

@Injectable()
export class VendasService {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(VENDA_TOKEN) private readonly vendaMongoModel: Model<VendaInterface>,
  ) { }

  async insertVenda(vendaDto: InsertVendaDto) {
    return await this.commandBus.execute(
      new InsertVendaCommand(vendaDto),
    );
  }

  async find() {
    return this.vendaMongoModel.find();
  }

}