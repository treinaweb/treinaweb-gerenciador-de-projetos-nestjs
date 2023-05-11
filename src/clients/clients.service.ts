import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private repository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const { nome, endereco, observacao } = createClientDto;
    const client = this.repository.create({ nome, endereco, observacao });
    return await this.repository.save(client);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const { nome, endereco, observacao } = updateClientDto;
    const client = this.repository.create({ nome, endereco, observacao });
    return await this.repository.update(id, client);
  }

  async remove(id: number) {
    return await this.repository.delete({ id: id });
  }
}
