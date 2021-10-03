import { MigrationInterface, QueryRunner } from 'typeorm';

export class statusesIntegration1633272948369 implements MigrationInterface {
  name = 'statusesIntegration1633272948369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "abbreviation" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "statuses"`);
  }
}
