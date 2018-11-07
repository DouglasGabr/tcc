import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosService } from './produtos.service';
import { ProdutoEntity } from 'src/models/mysql/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProdutoEntity,
    ]),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {

}