import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreateDestinationPrice1747685446695
  implements MigrationInterface
{
  name = 'MigrationCreateDestinationPrice1747685446695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "car_class_prices" (
                "id" SERIAL NOT NULL, 
                "price" integer NOT NULL, 
                "car_class_id" integer, 
                "destination_id" integer, 
                CONSTRAINT "PK_34b9e3fdf993fd482bf654d60f3" PRIMARY KEY ("id")
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "destinations" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                CONSTRAINT "UQ_b32fdaf5fa464fff063b9c4c4cb" UNIQUE ("name"), 
                CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id")
            );
        `);

    await queryRunner.query(`
            ALTER TABLE "car_class_prices" 
            ADD CONSTRAINT "FK_708d3a5d99c6537c4f3e1c6160c" 
            FOREIGN KEY ("car_class_id") REFERENCES "car_classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

    await queryRunner.query(`
            ALTER TABLE "car_class_prices" 
            ADD CONSTRAINT "FK_1e6285a7ecccd1b38b9b44dabfe" 
            FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

    await queryRunner.query(`
            INSERT INTO "destinations" ("name") VALUES 
            ('AIRPORT'),
            ('RAILWAY_STATION'),
            ('ADDRESS'),
            ('RENT');
        `);

    await queryRunner.query(`
            INSERT INTO "car_class_prices" ("price", "car_class_id", "destination_id") VALUES 
            (1200, 1, 1), (800, 1, 2), (800, 1, 3), (1000, 1, 4),
            (2500, 2, 1), (1500, 2, 2), (1500, 2, 3), (1500, 2, 4),
            (6000, 3, 1), (4000, 3, 2), (4000, 3, 3), (2000, 3, 4),
            (4500, 4, 1), (3000, 4, 2), (3000, 4, 3), (1500, 4, 4);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_class_prices" DROP CONSTRAINT "FK_1e6285a7ecccd1b38b9b44dabfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_class_prices" DROP CONSTRAINT "FK_708d3a5d99c6537c4f3e1c6160c"`,
    );
    await queryRunner.query(`DROP TABLE "car_class_prices"`);
    await queryRunner.query(`DROP TABLE "destinations"`);
  }
}
