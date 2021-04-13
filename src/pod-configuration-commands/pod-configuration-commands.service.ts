import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePodConfigurationCommandDto } from './dto/create-pod-configuration-command.dto';
import { UpdatePodConfigurationCommandDto } from './dto/update-pod-configuration-command.dto';
import { PodConfigurationCommand } from './entities/pod-configuration-command.entity';

@Injectable()
export class PodConfigurationCommandsService {
  constructor(
    @Inject('POD_CONFIGURATION_COMMANDS_REPOSITORY')
    private podCommandConfigurationRepository: Repository<PodConfigurationCommand>,
  ) {}
  create(createPodConfigurationCommandDto: CreatePodConfigurationCommandDto) {
    const podConfigurationCommand = new PodConfigurationCommand();
    Object.assign(podConfigurationCommand, {
      ...createPodConfigurationCommandDto,
    });

    return this.podCommandConfigurationRepository.save(podConfigurationCommand);
  }

  findAll() {
    return this.podCommandConfigurationRepository.find();
  }

  findOne(id: number) {
    return this.podCommandConfigurationRepository.findOne(id);
  }

  update(
    id: number,
    updatePodConfigurationCommandDto: UpdatePodConfigurationCommandDto,
  ) {
    return this.podCommandConfigurationRepository.update(
      { id },
      updatePodConfigurationCommandDto,
    );
  }

  async remove(id: number) {
    const configuration = await this.findOne(id);
    return this.podCommandConfigurationRepository.remove(configuration);
  }
}
