import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePodActionDto } from './dto/create-pod-action.dto';
import { UpdatePodActionDto } from './dto/update-pod-action.dto';
import { PodActions } from './entities/pod-action.entity';

@Injectable()
export class PodActionsService {
  constructor(
    @Inject('POD_ACTIONS_REPOSITORY')
    private podActionsRepository: Repository<PodActions>,
  ) {}

  create(createPodActionDto: CreatePodActionDto) {
    return 'This action adds a new podAction';
  }

  findAll() {
    return `This action returns all podActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} podAction`;
  }

  update(id: number, updatePodActionDto: UpdatePodActionDto) {
    return `This action updates a #${id} podAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} podAction`;
  }
}
