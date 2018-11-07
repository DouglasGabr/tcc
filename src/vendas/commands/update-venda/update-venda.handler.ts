import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { UpdateVendaCommand } from './update-venda.command';
import { UpdateVendaDto } from 'src/vendas/dtos/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/models/mysql/cliente.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { ProdutoEntity } from 'src/models/mysql/produto.entity';
import { VendaEntity } from 'src/models/mysql/venda.entity';
import { VendaItemEntity } from 'src/models/mysql/venda-item.entity';

@CommandHandler(UpdateVendaCommand)
export class UpdateVendaHandler implements ICommandHandler<UpdateVendaCommand> {

  constructor(
    @InjectRepository(ClienteEntity) private readonly clientesRepository: Repository<ClienteEntity>,
    @InjectRepository(ProdutoEntity) private readonly produtosRepository: Repository<ProdutoEntity>,
    @InjectRepository(VendaEntity) private readonly vendasRepository: Repository<VendaEntity>,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: UpdateVendaCommand, resolve: (value?: any) => void) {
    try {
      const { updateVendaDto, id } = command;
      const { cliente, produtosById, vendaToUpdate } = await this.validate(updateVendaDto, id);

      const venda = this.publisher.mergeObjectContext(vendaToUpdate);

      if (updateVendaDto.valorTotal) {
        venda.valorTotal = updateVendaDto.valorTotal;
      }

      if (updateVendaDto.itens) {
        venda.itens = updateVendaDto.itens.map(item => {
          const itemModel = new VendaItemEntity();
          itemModel.produto = produtosById[item.produtoId];
          itemModel.valorUnitario = item.valorUnitario;
          itemModel.quantidade = item.quantidade;
          return itemModel;
        });
      }

      if (cliente) {
        vendaToUpdate.cliente = cliente;
      }

      venda.save();
      venda.commit();
    } catch (error) {
      resolve(error);
    } finally {
      resolve(true);
    }
  }

  async validate(vendaDto: UpdateVendaDto, id: number) {
    const vendaToUpdate = await this.vendasRepository.findOne(id);
    if (!vendaToUpdate) {
      throw new BadRequestException('ID da venda inválido!');
    }
    let cliente;
    if (vendaDto.clienteId) {
      cliente = await this.clientesRepository.findOne(vendaDto.clienteId);
      if (!cliente) {
        throw new BadRequestException('ID do cliente inválido!');
      }
    }
    let produtos = [];
    if (vendaDto.itens) {
      vendaDto.itens.forEach((item, idx, arr) => {
        if (arr.findIndex(i => i.produtoId === item.produtoId) !== idx) {
          throw new BadRequestException('Mais de um item com mesmo produtoId');
        }
      });
      produtos = await this.produtosRepository.findByIds(vendaDto.itens.map(item => item.produtoId));
      if (produtos.length !== vendaDto.itens.length) {
        throw new BadRequestException('Todos os itens devem possuir produtoId de produtos que existam!');
      }
    }

    const produtosById = produtos.reduce((obj, cur) => ({ ...obj, [cur.id]: cur }), {});
    return { cliente, produtosById, vendaToUpdate };
  }
}