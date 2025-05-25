import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationUserAdminFields1748118152181
  implements MigrationInterface
{
  name = 'MigrationUserAdminFields1748118152181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" ADD "price" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
  }
}
