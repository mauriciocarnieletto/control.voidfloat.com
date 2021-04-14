/* eslint-disable @typescript-eslint/no-empty-function */
import { PodConfigurationCommand } from 'src/pod-configuration-commands/entities/pod-configuration-command.entity';
import * as commands from 'resources/parameters/pod-configuration-commands.json';
import * as fields from 'resources/parameters/pod-configuration-fields.json';

import { MigrationInterface, QueryRunner } from 'typeorm';
import { PodConfigurationField } from 'src/pod-configuration-fields/entities/pod-configuration-field.entity';

export class inserts1618382730505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const commandRepo = await queryRunner.connection.getRepository(
      PodConfigurationCommand,
    );

    const fieldsdRepo = await queryRunner.connection.getRepository(
      PodConfigurationField,
    );

    for (const props of commands as PodConfigurationCommand[]) {
      const podConfigurationCommand = new PodConfigurationCommand();
      Object.assign(podConfigurationCommand, { ...props });
      await commandRepo.save(podConfigurationCommand);
    }

    for (const props of (fields as unknown) as PodConfigurationField[]) {
      const podConfigurationCommand = new PodConfigurationField();
      Object.assign(podConfigurationCommand, { ...props });
      await fieldsdRepo.save(podConfigurationCommand);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
