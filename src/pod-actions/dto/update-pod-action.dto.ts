import { PartialType } from '@nestjs/swagger';
import { CreatePodActionDto } from './create-pod-action.dto';

export class UpdatePodActionDto extends PartialType(CreatePodActionDto) {}
