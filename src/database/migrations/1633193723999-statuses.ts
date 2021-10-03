import { MigrationInterface, QueryRunner } from 'typeorm';

export class statuses1633193723999 implements MigrationInterface {
  name = 'statuses1633193723999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" SERIAL NOT NULL, "abbreviation" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
