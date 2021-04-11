import { Injectable } from '@nestjs/common';
import { CreatePodCommandDto } from './dto/create-pod-command.dto';
import { UpdatePodCommandDto } from './dto/update-pod-command.dto';

@Injectable()
export class PodCommandsService {
  create(createPodCommandDto: CreatePodCommandDto) {
    return 'This action adds a new podCommand';
  }

  findAll() {
    return `This action returns all podCommands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} podCommand`;
  }

  update(id: number, updatePodCommandDto: UpdatePodCommandDto) {
    return `This action updates a #${id} podCommand`;
  }

  remove(id: number) {
    return `This action removes a #${id} podCommand`;
  }
}
