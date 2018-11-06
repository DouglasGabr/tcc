import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/models/mysql/cliente.entity';
import { Repository } from 'typeorm';
import { InsertClienteDto } from './dtos/insert-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(ClienteEntity) private readonly clientesRepository: Repository<ClienteEntity>,
  ) { }

  async insertCliente(clienteDto: InsertClienteDto) {
    const clienteModel = this.clientesRepository.create(clienteDto);
    return this.clientesRepository.save(clienteModel);
  }

  async find() {
    return this.clientesRepository.find();
  }

  async findById(id: number) {
    const cliente = await this.clientesRepository.findOne(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async delete(id: number) {
    const cliente = await this.findById(id);
    return await this.clientesRepository.remove(cliente);
  }

  async update(id: number, clienteDto: InsertClienteDto) {
    const cliente = await this.findById(id);
    const updatedClient = this.clientesRepository.merge(cliente, clienteDto);
    return this.clientesRepository.save(updatedClient);
  }

}