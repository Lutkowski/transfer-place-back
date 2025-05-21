import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreateCarsTable1747583324842
  implements MigrationInterface
{
  name = 'MigrationCreateCarsTable1747583324842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "cars" (
                "id" SERIAL NOT NULL, 
                "title" character varying NOT NULL, 
                "placeNumber" integer NOT NULL DEFAULT '3', 
                "imgSrc" character varying, 
                "imgAlt" character varying, 
                "car_class_id" integer, 
                CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "car_classes" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                CONSTRAINT "UQ_b2862f2ffaf28a1045fa744ea2a" UNIQUE ("name"), 
                CONSTRAINT "PK_fe104ecebd2e9f428922314450d" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            INSERT INTO "car_classes" ("name") VALUES 
            ('Стандарт'), 
            ('Комфорт'), 
            ('Бизнес'), 
            ('Минивэн');
        `);

    await queryRunner.query(`
            ALTER TABLE "cars" 
            ADD CONSTRAINT "FK_e6491f34ca1133596ae595bde7e" 
            FOREIGN KEY ("car_class_id") 
            REFERENCES "car_classes"("id") 
            ON DELETE NO ACTION 
            ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_e6491f34ca1133596ae595bde7e"`,
    );
    await queryRunner.query(`DROP TABLE "car_classes"`);
    await queryRunner.query(`DROP TABLE "cars"`);
  }
}
