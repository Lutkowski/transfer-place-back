import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreataUser1747851458305 implements MigrationInterface {
  name = 'MigrationCreataUser1747851458305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sms_codes" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c00b68561d1f383939febd8648" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sms_codes"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
