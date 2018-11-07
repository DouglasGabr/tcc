import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RemoveVendaCommand } from './remove-venda.command';
import { InjectRepository } from '@nestjs/typeorm';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(RemoveVendaCommand)
export class RemoveVendaHandler implements ICommandHandler<RemoveVendaCommand> {

  constructor(
    @InjectRepository(VendaEntity) private readonly vendasRepository: Repository<VendaEntity>,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: RemoveVendaCommand, resolve: (value?: any) => void) {
    try {
      const { id } = command;
      const vendaToDelete = await this.vendasRepository.findOne(id);
      if (!vendaToDelete) {
        throw new BadRequestException(`Nenhuma venda com ID ${id} foi encontrada`);
      }
      const venda = this.publisher.mergeObjectContext(vendaToDelete);
      venda.remove();
      venda.commit();
    } catch (error) {
      resolve(error);
    } finally {
      resolve(true);
    }
  }
}