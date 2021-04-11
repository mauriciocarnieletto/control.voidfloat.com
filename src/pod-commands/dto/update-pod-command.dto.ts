import { PartialType } from '@nestjs/swagger';
import { CreatePodCommandDto } from './create-pod-command.dto';

export class UpdatePodCommandDto extends PartialType(CreatePodCommandDto) {}
