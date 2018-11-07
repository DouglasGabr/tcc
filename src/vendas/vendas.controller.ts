import { Controller, Get, Post, HttpCode, Body, Param } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { InsertVendaDto } from './dtos/insert-venda.dto';

@Controller('vendas')
export class VendasController {

  constructor(
    private readonly vendasService: VendasService,
  ) { }

  @Get()
  async find() {
    return await this.vendasService.find();
  }

  @Post()
  async insert(@Body() insertVendaDto: InsertVendaDto) {
    const result = await this.vendasService.insertVenda(insertVendaDto);
    if (result !== true) {
      throw result;
    } else {
      return 'Inserção sendo processada com sucesso!';
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.vendasService.findById(id);
  }
}