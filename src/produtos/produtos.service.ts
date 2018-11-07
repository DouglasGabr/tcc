import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntity } from 'src/models/mysql/produto.entity';
import { InsertProdutoDto } from './dtos/insert-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutoEntity) private readonly produtosRepository: Repository<ProdutoEntity>,
  ) { }

  async insert(produtoDto: InsertProdutoDto) {
    const produtoModel = this.produtosRepository.create(produtoDto);
    return this.produtosRepository.save(produtoModel);
  }

  async find() {
    return this.produtosRepository.find();
  }

  async findById(id: number) {
    const produto = await this.produtosRepository.findOne(id);
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto;
  }

  async delete(id: number) {
    const produto = await this.findById(id);
    return await this.produtosRepository.remove(produto);
  }

  async update(id: number, produtoDto: InsertProdutoDto) {
    const produto = await this.findById(id);
    const updatedProduct = this.produtosRepository.merge(produto, produtoDto);
    return this.produtosRepository.save(updatedProduct);
  }

}