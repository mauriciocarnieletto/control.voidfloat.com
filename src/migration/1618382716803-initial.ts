import { MigrationInterface, QueryRunner } from 'typeorm';
import { PodConfigurationCommand } from 'src/pod-configuration-commands/entities/pod-configuration-command.entity';
import podConfigurationCommands from 'resources/parameters/pod-configuration-commands.json';

export class initial1618382716803 implements MigrationInterface {
  name = 'initial1618382716803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "client" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "logo" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "pod" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "serialNumber" varchar NOT NULL, "localIP" varchar NOT NULL, "isActive" boolean NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "clientId" integer NOT NULL, "name" varchar(500) NOT NULL, "email" varchar(500) NOT NULL, "password" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "server_configuration" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "clientId" integer NOT NULL, "name" varchar, "sshPort" varchar, "hostname" varchar, "gatewayIp" varchar, "localIp" varchar(500), "publicIp" varchar(500), "subnet" varchar(500), "podPingEndpoint" varchar(500) DEFAULT ('/initialscreen'), "podPort" integer DEFAULT ('9000'))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pod_configuration_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "configurationType" varchar NOT NULL, "key" varchar(100) NOT NULL, "defaultValue" varchar(100), "name" varchar(100) NOT NULL, "description" varchar(500) NOT NULL, "type" varchar NOT NULL, "listOptions" varchar, "functionName" varchar, "numberMin" integer, "numberMax" integer, "isAdvanced" boolean NOT NULL DEFAULT (0), "isShownOnCard" boolean NOT NULL DEFAULT (0), "isShownOnSessionScreen" boolean NOT NULL DEFAULT (0), "order" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "pod_configuration_command" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "description" varchar(500) NOT NULL, "isTimeRequired" boolean NOT NULL, "command" integer NOT NULL)`,
    );

    const commandRepo = await queryRunner.manager.getRepository(
      PodConfigurationCommand,
    );

    for (const podConfigurationCommand in podConfigurationCommands) {
      console.log(podConfigurationCommand);
      await commandRepo.insert(
        (podConfigurationCommand as unknown) as PodConfigurationCommand,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pod_configuration_command"`);
    await queryRunner.query(`DROP TABLE "pod_configuration_field"`);
    await queryRunner.query(`DROP TABLE "server_configuration"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "pod"`);
    await queryRunner.query(`DROP TABLE "client"`);
  }
}
