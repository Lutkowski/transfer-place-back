import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class MigrationUserAdminFields1748086550195
  implements MigrationInterface
{
  name = 'MigrationUserAdminFields1748086550195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying`,
    );

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await queryRunner.query(`
          INSERT INTO "users" ("phone", "email", "password", "isAdmin")
          VALUES ('+79807447708', 'toshic10000@yandex.ru', '${hashedPassword}', true)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }
}
