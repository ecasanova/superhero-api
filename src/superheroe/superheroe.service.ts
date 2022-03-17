import { Injectable } from "@nestjs/common";
import { Connection, DeleteResult, Repository } from "typeorm";
import { AliasesEntity } from "./entity/aliases/aliases.entity";
import { AppearanceEntity } from "./entity/appearance/appearance.entity";
import { BiographyEntity } from "./entity/biography/biography.entity";
import { ConnectionsEntity } from "./entity/connections/connections.entity";
import { HeightEntity } from "./entity/appearance/height.entity";
import { ImageEntity } from "./entity/image/image.entity";
import { PowerstatsEntity } from "./entity/powerstats/powerstats.entity";
import { WeightEntity } from "./entity/appearance/weight.entity";
import { WorkEntity } from "./entity/work/work.entity";
import { SuperheroeEntity } from "./entity/superheroe/superheroe.entity";
import { SuperheroeDto } from "./entity/superheroe/superheroe.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SuperheroeService {
  constructor(
    private connection: Connection,

    @InjectRepository(SuperheroeEntity)
    private readonly superheroesRepo: Repository<SuperheroeEntity>,

    @InjectRepository(BiographyEntity)
    private readonly biographyRepo: Repository<BiographyEntity>,

    @InjectRepository(AppearanceEntity)
    private readonly appearanceRepo: Repository<AppearanceEntity>,

    @InjectRepository(ConnectionsEntity)
    private readonly connectionsRepo: Repository<ConnectionsEntity>,

    @InjectRepository(HeightEntity)
    private readonly heightRepo: Repository<HeightEntity>,

    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,

    @InjectRepository(PowerstatsEntity)
    private readonly powerstatsRepo: Repository<PowerstatsEntity>,

    @InjectRepository(WeightEntity)
    private readonly weightRepo: Repository<WeightEntity>,

    @InjectRepository(WorkEntity)
    private readonly workRepo: Repository<WorkEntity>,

    @InjectRepository(AliasesEntity)
    private readonly AliasesEntityRepo: Repository<AliasesEntity>
  ) {}

  async getAll(page, limit, search): Promise<any> {
    const queryBuilder = await this.superheroesRepo
      .createQueryBuilder("superheroe")
      .leftJoinAndSelect("superheroe.powerstats", "powerstats")
      .leftJoinAndSelect("superheroe.biography", "biography")
      .leftJoinAndSelect("superheroe.images", "images")
      .orderBy("superheroe.name", "ASC");

    if (search.keyword) {
      queryBuilder.where("superheroe.name like :name", {
        name: `%${search.keyword}%`,
      });
    }

    if (search.intelligence) {
      queryBuilder.andWhere("powerstats.intelligence >= :intelligence", {
        intelligence: `${search.intelligence.min}`,
      });
      queryBuilder.andWhere("powerstats.intelligence <= :intelligence", {
        intelligence: `${search.intelligence.max}`,
      });
    }
    if (search.strength) {
      queryBuilder.andWhere("powerstats.strength >= :strength", {
        strength: `${search.strength.min}`,
      });
      queryBuilder.andWhere("powerstats.strength <= :strength", {
        strength: `${search.strength.max}`,
      });
    }
    if (search.speed) {
      queryBuilder.andWhere("powerstats.speed >= :speed", {
        speed: `${search.speed.min}`,
      });
      queryBuilder.andWhere("powerstats.speed <= :speed", {
        speed: `${search.speed.max}`,
      });
    }
    if (search.durability) {
      queryBuilder.andWhere("powerstats.durability >= :durability", {
        durability: `${search.durability.min}`,
      });
      queryBuilder.andWhere("powerstats.durability <= :durability", {
        durability: `${search.durability.max}`,
      });
    }
    if (search.power) {
      queryBuilder.andWhere("powerstats.power >= :power", {
        power: `${search.power.min}`,
      });
      queryBuilder.andWhere("powerstats.power <= :power", {
        power: `${search.power.max}`,
      });
    }
    if (search.combat) {
      queryBuilder.andWhere("powerstats.combat >= :combat", {
        combat: `${search.combat.min}`,
      });
      queryBuilder.andWhere("powerstats.combat <= :combat", {
        combat: `${search.combat.max}`,
      });
    }

    if (search.gender) {
      queryBuilder.where("appearance.gender = :gender", {
        gender: `${search.gender}`,
      });
    }
    if (search.alignment) {
      queryBuilder.where("biography.alignment = :alignment", {
        alignment: `${search.alignment}`,
      });
    }

    queryBuilder.skip(page).take(limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return {
      data: await this.cleanData(entities),
      totalItems: itemCount,
      currentPage: page,
      totalPages: Math.ceil(itemCount / limit),
    };
  }

  async cleanData(superheroes: any[]) {
    superheroes.forEach((superheroe) => {
      if (superheroe.powerstats) delete superheroe.powerstats.id;
      if (superheroe.images) delete superheroe.images.id;
      if (superheroe.biography) delete superheroe.biography.id;
      if (superheroe.appearance) delete superheroe.appearance.id;
      if (superheroe.work) delete superheroe.work.id;
      if (superheroe.connections) delete superheroe.connections.id;
    });
    return superheroes;
  }

  async getById(id: string): Promise<any> {
    return await this.getSuperHero({ id: id });
  }

  async getByName(name: string): Promise<any> {
    return await this.getSuperHero({ name: name });
  }

  async getSuperHero(params: any) {
    const queryBuilder = await this.superheroesRepo
      .createQueryBuilder("superheroe")
      .leftJoinAndSelect("superheroe.powerstats", "powerstats")
      .leftJoinAndSelect("superheroe.biography", "biography")
      .leftJoinAndSelect("superheroe.appearance", "appearance")
      .leftJoinAndSelect("superheroe.work", "work")
      .leftJoinAndSelect("superheroe.connections", "connections")
      .leftJoinAndSelect("superheroe.images", "images")
      .orderBy("superheroe.name", "ASC");

    if (params.id) {
      queryBuilder.where("superheroe.id = :id", { id: params.id }).getOne();
    }

    if (params.name) {
      queryBuilder.where("superheroe.name = :name", { name: params.name });
    }
    const { entities } = await queryBuilder.getRawAndEntities();
    return await this.cleanData(entities);
  }

  async createBulk(superheroes: SuperheroeDto[]): Promise<any> {
    superheroes.forEach((superheroe) => {
      this.createSuperhero(superheroe);
    });
  }

  async create(superheroe: SuperheroeDto): Promise<any> {
    this.createSuperhero(superheroe);
  }

  async createSuperhero(superheroe: SuperheroeDto): Promise<any> {
    try {
      let { appearance, biography, connections, images, powerstats, work } =
        superheroe;

      //CREATE SUPERHEROE
      const superheroeEntity = new SuperheroeEntity();
      superheroeEntity.name = superheroe.name;
      await this.superheroesRepo.insert(superheroeEntity);

      //CREATE BIOGRAPHY
      if (biography) {
        let newBiographyEntity = new BiographyEntity();
        newBiographyEntity.fullName = biography.fullName;
        newBiographyEntity.alterEgos = biography.alterEgos;
        newBiographyEntity.placeOfBirth = biography.placeOfBirth;
        newBiographyEntity.publisher = biography.publisher;
        newBiographyEntity.alignment = biography.alignment;
        newBiographyEntity.alterEgos = biography.alterEgos;
        newBiographyEntity.firstAppearanceEntity =
          biography.firstAppearanceEntity;
        newBiographyEntity.superheroe = superheroeEntity;
        await this.biographyRepo.insert(newBiographyEntity);

        //CREATE ALLIASES
        let aliases = biography.aliases;
        aliases?.forEach(async (alias) => {
          let newAliasesEntity = new AliasesEntity();
          newAliasesEntity.value = alias;
          newAliasesEntity.biography = newBiographyEntity;
          await this.AliasesEntityRepo.insert(newAliasesEntity);
        });
      }

      if (appearance) {
        //CREATE APPEARANCE
        let newAppearanceEntity = new AppearanceEntity();
        newAppearanceEntity.gender = appearance.gender;
        newAppearanceEntity.race = appearance.race;
        newAppearanceEntity.eyeColor = appearance.eyeColor;
        newAppearanceEntity.hairColor = appearance.hairColor;
        newAppearanceEntity.superheroe = superheroeEntity;
        await this.appearanceRepo.insert(newAppearanceEntity);

        //CREATE HEIGHT
        let heights = appearance.height;
        heights.forEach(async (height) => {
          let newHeightEntity = new HeightEntity();
          newHeightEntity.value = height;
          newHeightEntity.appearance = newAppearanceEntity;
          await this.heightRepo.insert(newHeightEntity);
        });

        //CREATE WEIGHT
        let weights = appearance.weight;
        weights.forEach(async (weight) => {
          let newWeightEntity = new WeightEntity();
          newWeightEntity.value = weight;
          newWeightEntity.appearance = newAppearanceEntity;
          await this.weightRepo.insert(newWeightEntity);
        });
      }

      if (powerstats) {
        //CREATE POWERSTATS
        let newPowerstatsEntity = new PowerstatsEntity();
        newPowerstatsEntity.intelligence = powerstats.intelligence;
        newPowerstatsEntity.strength = powerstats.strength;
        newPowerstatsEntity.combat = powerstats.combat;
        newPowerstatsEntity.durability = powerstats.durability;
        newPowerstatsEntity.speed = powerstats.speed;
        newPowerstatsEntity.power = powerstats.power;
        newPowerstatsEntity.strength = powerstats.strength;
        newPowerstatsEntity.superheroe = superheroeEntity;
        await this.powerstatsRepo.insert(newPowerstatsEntity);
      }

      //CREATE CONNECTIONS
      if (connections) {
        let newConnectionsEntity = new ConnectionsEntity();
        newConnectionsEntity.groupaffiliation = connections.groupAffiliation;
        newConnectionsEntity.relatives = connections.relatives;
        newConnectionsEntity.superheroe = superheroeEntity;
        await this.connectionsRepo.insert(newConnectionsEntity);
      }

      //CREATE IMAGE
      if (images) {
        let newImageEntity = new ImageEntity();
        newImageEntity.xs = images.xs;
        newImageEntity.sm = images.sm;
        newImageEntity.md = images.md;
        newImageEntity.lg = images.lg;
        newImageEntity.superheroe = superheroeEntity;
        await this.imageRepo.insert(newImageEntity);
      }

      //CREATE WORK
      if (work) {
        let newWorkEntity = new WorkEntity();
        newWorkEntity.occupation = work.occupation;
        newWorkEntity.base = work.base;
        newWorkEntity.superheroe = superheroeEntity;
        await this.workRepo.insert(newWorkEntity);
      }

      console.log("Saving: ", superheroe.name);
      return { superheroe };
    } catch (err) {
      return { err };
    }
  }

  async remove(id: string): Promise<any> {
    console.log("Removing: ", id);
    let response = await this.superheroesRepo.delete({ id: id });
    return response;
  }
}
