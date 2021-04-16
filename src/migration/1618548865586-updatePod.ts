import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePod1618548865586 implements MigrationInterface {
    name = 'updatePod1618548865586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_pod" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "serialNumber" varchar NOT NULL, "ipAddress" varchar NOT NULL, "hostname" varchar NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_pod"("id", "name", "model", "serialNumber", "ipAddress", "hostname", "status") SELECT "id", "name", "model", "serialNumber", "ipAddress", "hostname", "status" FROM "pod"`);
        await queryRunner.query(`DROP TABLE "pod"`);
        await queryRunner.query(`ALTER TABLE "temporary_pod" RENAME TO "pod"`);
        await queryRunner.query(`CREATE TABLE "temporary_pod" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "serialNumber" varchar NOT NULL, "ipAddress" varchar NOT NULL, "hostname" varchar NOT NULL, "status" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_pod"("id", "name", "model", "serialNumber", "ipAddress", "hostname", "status") SELECT "id", "name", "model", "serialNumber", "ipAddress", "hostname", "status" FROM "pod"`);
        await queryRunner.query(`DROP TABLE "pod"`);
        await queryRunner.query(`ALTER TABLE "temporary_pod" RENAME TO "pod"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pod" RENAME TO "temporary_pod"`);
        await queryRunner.query(`CREATE TABLE "pod" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "serialNumber" varchar NOT NULL, "ipAddress" varchar NOT NULL, "hostname" varchar NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "pod"("id", "name", "model", "serialNumber", "ipAddress", "hostname", "status") SELECT "id", "name", "model", "serialNumber", "ipAddress", "hostname", "status" FROM "temporary_pod"`);
        await queryRunner.query(`DROP TABLE "temporary_pod"`);
        await queryRunner.query(`ALTER TABLE "pod" RENAME TO "temporary_pod"`);
        await queryRunner.query(`CREATE TABLE "pod" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "serialNumber" varchar NOT NULL, "ipAddress" varchar NOT NULL, "hostname" varchar NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "pod"("id", "name", "model", "serialNumber", "ipAddress", "hostname", "status") SELECT "id", "name", "model", "serialNumber", "ipAddress", "hostname", "status" FROM "temporary_pod"`);
        await queryRunner.query(`DROP TABLE "temporary_pod"`);
    }

}
