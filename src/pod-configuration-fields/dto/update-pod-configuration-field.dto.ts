import { PartialType } from '@nestjs/swagger';
import { CreatePodConfigurationFieldDto } from './create-pod-configuration-field.dto';

export class UpdatePodConfigurationFieldDto extends PartialType(CreatePodConfigurationFieldDto) {}
