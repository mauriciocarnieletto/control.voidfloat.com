import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const clients = await this.clientRepository.find();

    if (clients.length > 0)
      throw new Error('Já existe um cliente configurado para este servidor');

    const client = new Client();
    client.name = createClientDto.name;

    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.clientRepository.findOne(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update({ id }, { ...updateClientDto });
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    return this.clientRepository.remove(client);
  }
}
