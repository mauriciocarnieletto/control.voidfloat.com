import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreatePodDto } from './dto/create-pod.dto';
import { UpdatePodDto } from './dto/update-pod.dto';
import { Pod } from './entities/pod.entity';

@Injectable()
export class PodService {
  constructor(
    @Inject('POD_REPOSITORY')
    private podRepository: Repository<Pod>,
    private configService: ConfigService,
  ) {}

  create(createPodDto: CreatePodDto) {
    const pod = new Pod();
    Object.assign(pod, { ...createPodDto });
    return this.podRepository.save(pod);
  }

  findAll() {
    return this.podRepository.find();
  }

  findOne(id: number) {
    return this.podRepository.findOne({ id });
  }

  update(id: number, updatePodDto: UpdatePodDto) {
    return this.podRepository.update({ id }, { ...updatePodDto });
  }

  async remove(id: number) {
    const pod = await this.findOne(id);
    return this.podRepository.delete(pod);
  }
}
