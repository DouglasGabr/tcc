import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/models/mysql/cliente.entity';
import { ClientesService } from './clientes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClienteEntity,
    ]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {

}