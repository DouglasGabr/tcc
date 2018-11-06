import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { InsertClienteDto } from './dtos/insert-cliente.dto';

@Controller('clientes')
export class ClientesController {

  constructor(
    private readonly clientesService: ClientesService,
  ) { }

  @Get()
  async find() {
    return this.clientesService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.clientesService.findById(id);
  }

  @Post()
  async insert(@Body() clienteDto: InsertClienteDto) {
    return this.clientesService.insertCliente(clienteDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() clienteDto: InsertClienteDto) {
    return this.clientesService.update(id, clienteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.clientesService.delete(id);
  }

}