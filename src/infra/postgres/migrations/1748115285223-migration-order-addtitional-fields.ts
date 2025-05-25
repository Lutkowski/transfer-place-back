import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationUserAdminFields1748115285223
  implements MigrationInterface
{
  name = 'MigrationUserAdminFields1748115285223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "pickupLocation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "dropoffLocation" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "orders" ADD "pickupDate" date`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "pickupTime" TIME`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "phone" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "pickupTime"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "pickupDate"`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "dropoffLocation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "pickupLocation"`,
    );
  }
}
