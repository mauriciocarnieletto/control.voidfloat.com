import { PartialType } from '@nestjs/swagger';
import { CreatePodConfigurationCommandDto } from './create-pod-configuration-command.dto';

export class UpdatePodConfigurationCommandDto extends PartialType(CreatePodConfigurationCommandDto) {}
