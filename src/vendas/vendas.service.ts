import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InsertVendaDto } from './dtos/insert-venda.dto';
import { InsertVendaCommand } from './commands/insert-venda/insert-venda.command';
import { InjectModel } from '@nestjs/mongoose';
import { VENDA_TOKEN } from 'src/constants/tokens';
import { Model } from 'mongoose';
import { VendaInterface } from 'src/models/mongodb/venda.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendasService {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(VENDA_TOKEN) private readonly vendaMongoModel: Model<VendaInterface>,
    @InjectRepository(VendaEntity) private readonly vendasRepository: Repository<VendaEntity>,
  ) { }

  async insertVenda(vendaDto: InsertVendaDto) {
    return await this.commandBus.execute(
      new InsertVendaCommand(vendaDto),
    );
  }

  async find() {
    return this.vendaMongoModel.find();
    // return this.vendasRepository.find({ relations: ['itens', 'itens.produto', 'cliente'] }); // MYSQL Queries
  }

  async findById(id: number) {
    const venda = await this.vendaMongoModel.findOne({ id });
    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada`);
    }
    return venda;
  }

}