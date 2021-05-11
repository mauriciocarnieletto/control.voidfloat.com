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

  async findAll() {
    const actions = await import('../../resources/parameters/pod-actions.json');

    return actions;
  }

  async findOne(id: number) {
    const actions = await import('../../resources/parameters/pod-actions.json');
    return actions.filter((ac) => ac.id);
  }

  update(id: number, updatePodActionDto: UpdatePodActionDto) {
    return `This action updates a #${id} podAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} podAction`;
  }
}
