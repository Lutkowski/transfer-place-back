import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreateOrder1747944350924 implements MigrationInterface {
  name = 'MigrationCreateOrder1747944350924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "comment" character varying, "withChild" boolean NOT NULL DEFAULT false, "withSign" boolean NOT NULL DEFAULT false, "hoursQuantity" integer, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'Новая', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "car_class_id" integer NOT NULL, "destination_id" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_2f03b1f4cc33ad971044a856505" FOREIGN KEY ("car_class_id") REFERENCES "car_classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_0488b9a93537f5a2c2c44b0f3a6" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_0488b9a93537f5a2c2c44b0f3a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_2f03b1f4cc33ad971044a856505"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
