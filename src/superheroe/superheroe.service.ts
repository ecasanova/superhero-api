import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { Aliases } from "./entity/aliases/aliases.entity";
import { Appearance } from "./entity/appearance/appearance.entity";
import { Biography } from "./entity/biography/biography.entity";
import { Connections } from "./entity/connections/connections.entity";
import { Height } from "./entity/appearance/height.entity";
import { Image } from "./entity/image/image.entity";
import { Powerstats } from "./entity/powerstats/powerstats.entity";
import { Weight } from "./entity/appearance/weight.entity";
import { Work } from "./entity/work/work.entity";
import { SuperheroeEntity } from "./entity/superheroe/superheroe.entity";
import { SuperheroeRepository } from "./entity/superheroe.repository";

@Injectable()
export class SuperheroeService {
  constructor(
    private superheroesRepo: SuperheroeRepository,
    private connection: Connection
  ) {}

  async getAll(): Promise<any[]> {
    const superheroes: SuperheroeEntity[] = await this.superheroesRepo.getAll();
    return superheroes;
  }

  async getById(id: string): Promise<any> {
    const superheroe: SuperheroeEntity = await this.superheroesRepo.getById(id);
    return superheroe;
  }

  async getByName(name: string): Promise<SuperheroeEntity> {
    return await this.superheroesRepo.getByName(name);
  }

  async create(): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let newSuperhero = new SuperheroeEntity();
      newSuperhero.name = "Superman";
      let superheroe = await queryRunner.manager.save(newSuperhero);
      console.log(superheroe);

      let aliases = new Aliases();
      await queryRunner.manager.save(aliases);

      let appearance = new Appearance();
      await queryRunner.manager.save(appearance);

      let biography = new Biography();
      biography.superheroe_id = superheroe.id;
      await queryRunner.manager.save(biography);

      let connections = new Connections();
      await queryRunner.manager.save(connections);

      let height = new Height();
      await queryRunner.manager.save(height);

      let weight = new Weight();
      await queryRunner.manager.save(weight);

      let image = new Image();
      await queryRunner.manager.save(image);

      let powerstats = new Powerstats();
      await queryRunner.manager.save(powerstats);

      let work = new Work();
      await queryRunner.manager.save(work);

      await queryRunner.commitTransaction();
    } catch (Exception) {
      console.log(Exception);
      await queryRunner.rollbackTransaction();
    }
  }
}
