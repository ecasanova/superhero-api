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
import { SuperheroeDto } from "./entity/superheroe/superheroe.dto";

@Injectable()
export class SuperheroeService {
  constructor(
    private superheroesRepo: SuperheroeRepository,
    private connection: Connection
  ) {}

  async getAll(): Promise<any[]> {
    const superheroes: SuperheroeEntity[] = await this.superheroesRepo.getAll();
    superheroes.forEach((superheroe) => {
      if (superheroe.biography) delete superheroe.biography.id;
      if (superheroe.appearance) delete superheroe.appearance.id;
      if (superheroe.connections) delete superheroe.connections.id;
      if (superheroe.image) delete superheroe.image.id;
      if (superheroe.powerstats) delete superheroe.powerstats.id;
      if (superheroe.work) delete superheroe.work.id;
    });
    return superheroes;
  }

  async getById(id: string): Promise<any> {
    const superheroe: SuperheroeEntity = await this.superheroesRepo.getById(id);
    return superheroe;
  }

  async getByName(name: string): Promise<SuperheroeEntity> {
    return await this.superheroesRepo.getByName(name);
  }

  async create(superheroes: SuperheroeDto[]): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    superheroes.forEach(async (superheroe) => {
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let { appearance, biography, connections, image, powerstats, work } =
          superheroe;

        //CREATE SUPERHEROE
        const superheroeEntity = new SuperheroeEntity();
        superheroeEntity.name = superheroe.name;
        await queryRunner.manager.save(superheroeEntity);

        //CREATE BIOGRAPHY
        let newBiography = new Biography();
        newBiography.fullName = biography.fullName;
        newBiography.alterEgos = biography.alterEgos;
        newBiography.placeOffBirth = biography.placeOffBirth;
        newBiography.publisher = biography.publisher;
        newBiography.alignment = biography.alignment;
        newBiography.alterEgos = biography.alterEgos;
        newBiography.firstAppearance = biography.firstAppearance;
        newBiography.superheroe = superheroeEntity;
        await queryRunner.manager.save(newBiography);

        //CREATE ALLIASES
        let aliases = biography.aliases;
        aliases.forEach(async (alias) => {
          let newAliases = new Aliases();
          newAliases.value = alias.value;
          newAliases.biography = newBiography;
          await queryRunner.manager.save(newAliases);
        });

        //CREATE APPEARANCE
        let newAppearance = new Appearance();
        newAppearance.gender = appearance.gender;
        newAppearance.race = appearance.race;
        newAppearance.eyeColor = appearance.eyeColor;
        newAppearance.hairColor = appearance.hairColor;
        await queryRunner.manager.save(newAppearance);

        let heights = appearance.height;
        heights.forEach(async (height) => {
          let newHeight = new Height();
          newHeight.value = height.value;
          newHeight.appearance = newAppearance;
          await queryRunner.manager.save(newHeight);
        });

        //CREATE WEIGHT
        let weights = appearance.weight;
        weights.forEach(async (weight) => {
          let newWeight = new Weight();
          newWeight.value = weight.value;
          newWeight.appearance = newAppearance;
          await queryRunner.manager.save(newWeight);
        });

        //CREATE POWERSTATS
        let newPowerstats = new Powerstats();
        newPowerstats.intelligence = powerstats.intelligence;
        newPowerstats.strength = powerstats.strength;
        newPowerstats.combat = powerstats.combat;
        newPowerstats.durability = powerstats.durability;
        newPowerstats.speed = powerstats.speed;
        newPowerstats.power = powerstats.power;
        newPowerstats.strength = powerstats.strength;
        newPowerstats.superheroe = superheroeEntity;
        await queryRunner.manager.save(newPowerstats);

        //CREATE CONNECTIONS
        let newConnections = new Connections();
        newConnections.groupaffiliation = connections.groupAffiliation;
        newConnections.relatives = connections.relatives;
        newConnections.superheroe = superheroeEntity;
        await queryRunner.manager.save(newConnections);

        //CREATE IMAGE
        let newImage = new Image();
        newImage.url = image.url;
        newImage.superheroe = superheroeEntity;
        await queryRunner.manager.save(newImage);

        //CREATE WORK
        let newWork = new Work();
        newWork.occupation = work.occupation;
        newWork.base = work.base;
        newWork.superheroe = superheroeEntity;
        await queryRunner.manager.save(newWork);

        await queryRunner.commitTransaction();
      } catch (e) {
        console.log(e);
        await queryRunner.rollbackTransaction();
      }
    });
  }
}
