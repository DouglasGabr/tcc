import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { InsertProdutoDto } from './dtos/insert-produto.dto';

@Controller('produtos')
export class ProdutosController {

  constructor(
    private readonly produtosService: ProdutosService,
  ) { }

  @Get()
  async find() {
    return this.produtosService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.produtosService.findById(id);
  }

  @Post()
  async insert(@Body() produtoDto: InsertProdutoDto) {
    return this.produtosService.insert(produtoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() produtoDto: InsertProdutoDto) {
    return this.produtosService.update(id, produtoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.produtosService.delete(id);
  }

}