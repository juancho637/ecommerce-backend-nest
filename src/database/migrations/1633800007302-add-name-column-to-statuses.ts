import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNameColumnToStatuses1633800007302
  implements MigrationInterface
{
  name = 'addNameColumnToStatuses1633800007302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statuses" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "statuses" DROP COLUMN "name"`);
  }
}
