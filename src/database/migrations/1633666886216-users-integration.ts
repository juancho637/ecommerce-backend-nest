import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersIntegration1633666886216 implements MigrationInterface {
  name = 'usersIntegration1633666886216';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_users" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_6516a2e208664a508f5e2f7f284" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe845889e03e87003e6d9a06ca" ON "roles_users" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de502d3ca59c0bfd32fa882939" ON "roles_users" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_9d295cb2f8df33c080e23acfb8f" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_users" ADD CONSTRAINT "FK_fe845889e03e87003e6d9a06caa" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_users" ADD CONSTRAINT "FK_de502d3ca59c0bfd32fa8829393" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_users" DROP CONSTRAINT "FK_de502d3ca59c0bfd32fa8829393"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_users" DROP CONSTRAINT "FK_fe845889e03e87003e6d9a06caa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_9d295cb2f8df33c080e23acfb8f"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_de502d3ca59c0bfd32fa882939"`);
    await queryRunner.query(`DROP INDEX "IDX_fe845889e03e87003e6d9a06ca"`);
    await queryRunner.query(`DROP TABLE "roles_users"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
