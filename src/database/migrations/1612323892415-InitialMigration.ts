import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1612323892415 implements MigrationInterface {
  name = 'InitialMigration1612323892415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "example_deleteme" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "example_deleteme"`,
    );
  }
}
