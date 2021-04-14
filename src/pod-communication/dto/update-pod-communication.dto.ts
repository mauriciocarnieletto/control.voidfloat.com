import { PartialType } from '@nestjs/swagger';
import { CreatePodCommunicationDto } from './create-pod-communication.dto';

export class UpdatePodCommunicationDto extends PartialType(CreatePodCommunicationDto) {}
