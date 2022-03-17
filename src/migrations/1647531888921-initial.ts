import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1647531888921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.cleanData(queryRunner);
    await queryRunner.query(``);
  }

  public async cleanData(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "superheroe_work"`);
    await queryRunner.query(`TRUNCATE TABLE "superheroe_powerstats" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "superheroe_image" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "superheroe_connections" CASCADE`);
    await queryRunner.query(
      `TRUNCATE TABLE "superheroe_biography_aliases" CASCADE`
    );
    await queryRunner.query(`TRUNCATE TABLE "superheroe_biography" CASCADE`);
    await queryRunner.query(
      `TRUNCATE TABLE "superheroe_appearance_weight" CASCADE`
    );
    await queryRunner.query(
      `TRUNCATE TABLE "superheroe_appearance_height" CASCADE`
    );
    await queryRunner.query(`TRUNCATE TABLE "superheroe_appearance" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "superheroe" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.cleanData(queryRunner);
  }
}
