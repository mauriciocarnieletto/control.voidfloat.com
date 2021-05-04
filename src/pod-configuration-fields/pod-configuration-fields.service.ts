import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePodConfigurationFieldDto } from './dto/create-pod-configuration-field.dto';
import { UpdatePodConfigurationFieldDto } from './dto/update-pod-configuration-field.dto';
import { PodConfigurationField } from './entities/pod-configuration-field.entity';

@Injectable()
export class PodConfigurationFieldsService {
  constructor(
    @Inject('POD_CONFIGURATION_FIELDS_REPOSITORY')
    private podFieldConfigurationRepository: Repository<PodConfigurationField>,
  ) {}

  create(createPodConfigurationFieldDto: CreatePodConfigurationFieldDto) {
    const podConfigurationField = new PodConfigurationField();
    Object.assign(podConfigurationField, { ...createPodConfigurationFieldDto });

    return this.podFieldConfigurationRepository.save(podConfigurationField);
  }

  findAll() {
    return this.podFieldConfigurationRepository.find();
  }

  findOne(id: number) {
    return this.podFieldConfigurationRepository.findOne(id);
  }

  update(
    id: number,
    updatePodConfigurationFieldDto: UpdatePodConfigurationFieldDto,
  ) {
    return this.podFieldConfigurationRepository.update(
      { id },
      updatePodConfigurationFieldDto,
    );
  }

  async remove(id: number) {
    const configuration = await this.findOne(id);
    return this.podFieldConfigurationRepository.remove(configuration);
  }
}
