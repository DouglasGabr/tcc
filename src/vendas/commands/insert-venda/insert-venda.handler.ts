import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InsertVendaCommand } from './insert-venda.command';
import { Repository } from 'typeorm';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/models/mysql/cliente.entity';
import { BadRequestException } from '@nestjs/common';
import { ProdutoEntity } from 'src/models/mysql/produto.entity';
import { InsertVendaDto } from 'src/vendas/dtos/insert-venda.dto';
import { VendaItemEntity } from 'src/models/mysql/venda-item.entity';

@CommandHandler(InsertVendaCommand)
export class InsertVendaHandler implements ICommandHandler<InsertVendaCommand> {

  constructor(
    @InjectRepository(VendaEntity) private readonly vendasRepository: Repository<VendaEntity>,
    @InjectRepository(ClienteEntity) private readonly clientesRepository: Repository<ClienteEntity>,
    @InjectRepository(ProdutoEntity) private readonly produtosRepository: Repository<ProdutoEntity>,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: InsertVendaCommand, resolve: (value?: any) => void) {
    try {
      const { insertVendaDto } = command;

      const { cliente, produtosById } = await this.validate(insertVendaDto);

      const itens = insertVendaDto.itens.map(item => {
        const itemModel = new VendaItemEntity();
        itemModel.produto = produtosById[item.produtoId];
        itemModel.valorUnitario = item.valorUnitario;
        itemModel.quantidade = item.quantidade;
        return itemModel;
      });

      const VendaModel = this.publisher.mergeClassContext(VendaEntity);

      const venda = new VendaModel();
      venda.cliente = cliente;
      venda.itens = itens;
      venda.valorTotal = insertVendaDto.valorTotal;

      const vendaModel = this.publisher.mergeObjectContext(
        this.vendasRepository.create({
          valorTotal: insertVendaDto.valorTotal,
          cliente,
          itens,
        }),
      );
      vendaModel.save();
      vendaModel.commit();
    } catch (error) {
      resolve(error);
    } finally {
      resolve(true);
    }
  }

  async validate(vendaDto: InsertVendaDto) {
    const cliente = await this.clientesRepository.findOne(vendaDto.clienteId);
    if (!cliente) {
      throw new BadRequestException('ID do cliente inválido!');
    }
    vendaDto.itens.forEach((item, idx, arr) => {
      if (arr.findIndex(i => i.produtoId === item.produtoId) !== idx) {
        throw new BadRequestException('Mais de um item com mesmo produtoId');
      }
    });
    const produtos = await this.produtosRepository.findByIds(vendaDto.itens.map(item => item.produtoId));

    if (produtos.length !== vendaDto.itens.length) {
      throw new BadRequestException('Todos os itens devem possuir produtoId de produtos que existam!');
    }

    const produtosById = produtos.reduce((obj, cur) => ({ ...obj, [cur.id]: cur }), {});
    return { cliente, produtosById };
  }
}