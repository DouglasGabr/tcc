import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VENDA_TOKEN } from 'src/constants/tokens';
import { VendaSchema } from 'src/models/mongodb/venda.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { VendasController } from './vendas.controller';
import { VendasService } from './vendas.service';
import { InsertVendaHandler } from './commands/insert-venda/insert-venda.handler';
import { ModuleRef } from '@nestjs/core';
import { CommandBus, EventBus, CQRSModule } from '@nestjs/cqrs';
import { VendaSavedHandler } from './events/venda-saved/venda-saved.handler';
import { ClienteEntity } from 'src/models/mysql/cliente.entity';
import { ProdutoEntity } from 'src/models/mysql/produto.entity';

const CommandHandlers = [InsertVendaHandler];
const EventHandlers = [VendaSavedHandler];

@Module({
  imports: [
    CQRSModule,
    MongooseModule.forFeature([{ name: VENDA_TOKEN, schema: VendaSchema }]),
    TypeOrmModule.forFeature([
      VendaEntity,
      ClienteEntity,
      ProdutoEntity,
    ]),
  ],
  controllers: [
    VendasController,
  ],
  providers: [
    VendasService,
    ...CommandHandlers,
    ...EventHandlers,
    Logger,
  ],
})
export class VendasModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
  ) { }

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.command$.register(CommandHandlers);
    this.event$.register(EventHandlers);
  }

}