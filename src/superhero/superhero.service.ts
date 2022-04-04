import { Injectable, UseInterceptors } from "@nestjs/common";
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
import { SuperheroEntity } from "./entity/superhero/superhero.entity";
import { SuperheroDto } from "./entity/superhero/superhero.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { createWriteStream, writeFileSync, readFileSync, existsSync } from "fs";
const axios = require("axios");
const imageSizes = [
  { name: "xs", width: 120, heigth: 160 },
  { name: "sm", width: 240, heigth: 320 },
  { name: "md", width: 480, heigth: 640 },
  { name: "lg", width: 680, heigth: 840 },
];
const resizeImg = require("resize-image-buffer");
import * as MOCKED_RESPONSE from "./data.json";
const { PassThrough } = require("stream");
@Injectable()
export class SuperheroService {
  constructor(
    private connection: Connection,

    @InjectRepository(SuperheroEntity)
    private readonly superheroRepo: Repository<SuperheroEntity>,

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

  slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  async download(dest, size, superhero): Promise<any> {
    /* var filename = dest.substring(dest.lastIndexOf("/") + 1); */
    let slug = this.slugify(superhero.name);
    let filename = superhero.id + "-" + slug + ".jpg";
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(dest, { responseType: "stream" })
          .then(async (response) => {
            const chunks = response.data.pipe(
              new PassThrough({ encoding: "base64" })
            );
            let str = "";
            for await (let chunk of chunks) {
              str += chunk;
            }
            let resize = __dirname + "/uploads/" + size.name + "/" + filename;

            let image = await resizeImg(str, {
              width: size.width,
              heigth: size.heigth,
            });
            writeFileSync(resize, image);
            resolve(true);
          })
          .catch((error) => {
            console.log("Error cargando fotos de ", superhero.name);
            reject();
          });
      } catch (error) {
        console.log("Error cargando fotos de ", superhero.name);
        reject();
      }
    });
  }

  async getAll(page, limit, search): Promise<any> {
    const queryBuilder = await this.superheroRepo
      .createQueryBuilder("superhero")
      .leftJoinAndSelect("superhero.powerstats", "powerstats")
      .leftJoinAndSelect("superhero.biography", "biography")
      .leftJoinAndSelect("superhero.images", "images")
      .leftJoinAndSelect("superhero.work", "work")
      .orderBy("superhero.name", "ASC");

    if (search.keyword) {
      queryBuilder.where("superhero.name like :name", {
        name: `%${search.keyword}%`,
      });
      queryBuilder.orWhere("biography.fullName like :name", {
        name: `%${search.keyword}%`,
      });
      queryBuilder.orWhere("work.occupation like :name", {
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

  async cleanData(superheroList: any[]) {
    superheroList.forEach((superhero) => {
      if (superhero.powerstats) delete superhero.powerstats.id;
      if (superhero.images) delete superhero.images.id;
      if (superhero.biography) delete superhero.biography.id;
      if (superhero.appearance) delete superhero.appearance.id;
      if (superhero.work) delete superhero.work.id;
      if (superhero.connections) delete superhero.connections.id;
    });
    return superheroList;
  }

  async getById(id: string): Promise<any> {
    let superhero = this.superheroRepo.findOne(id, {
      relations: [
        "powerstats",
        "biography",
        "biography.aliases",
        "appearance",
        "appearance.height",
        "appearance.weight",
        "work",
        "connections",
        "images",
      ],
    });
    return superhero;
  }

  async getByName(name: string): Promise<any> {
    return await this.getSuperHero({ name: name });
  }

  async getSuperHero(params: any) {
    const queryBuilder = await this.superheroRepo
      .createQueryBuilder("superhero")
      .leftJoinAndSelect("superhero.powerstats", "powerstats")
      .leftJoinAndSelect("superhero.biography", "biography")
      .leftJoinAndSelect("superhero.appearance", "appearance")
      .leftJoinAndSelect("superhero.work", "work")
      .leftJoinAndSelect("superhero.connections", "connections")
      .leftJoinAndSelect("superhero.images", "images")
      .orderBy("superhero.name", "ASC");

    if (params.id) {
      queryBuilder.where("superhero.id = :id", { id: params.id }).getOne();
    }

    if (params.name) {
      queryBuilder.where("superhero.name = :name", { name: params.name });
    }
    const { entities } = await queryBuilder.getRawAndEntities();
    return await this.cleanData(entities);
  }

  async createBulk(): Promise<any> {
    let list: SuperheroDto[] = MOCKED_RESPONSE;
    list.forEach((superhero) => {
      this.createSuperhero(superhero);
    });
  }

  async create(superhero: SuperheroDto): Promise<any> {
    this.createSuperhero(superhero);
  }

  async createSuperhero(superhero: SuperheroDto): Promise<any> {
    try {
      let { appearance, biography, connections, images, powerstats, work } =
        superhero;

      //CREATE SUPERHEROE
      const superheroEntity = new SuperheroEntity();
      superheroEntity.name = superhero.name;
      await this.superheroRepo.insert(superheroEntity);

      //CREATE BIOGRAPHY
      if (biography) {
        let newBiographyEntity = new BiographyEntity();
        newBiographyEntity.fullName = biography.fullName;
        newBiographyEntity.alterEgos = biography.alterEgos;
        newBiographyEntity.placeOfBirth = biography.placeOfBirth;
        newBiographyEntity.publisher = biography.publisher;
        newBiographyEntity.alignment = biography.alignment;
        newBiographyEntity.alterEgos = biography.alterEgos;
        newBiographyEntity.firstAppearance = biography.firstAppearance;
        newBiographyEntity.superhero = superheroEntity;
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
        newAppearanceEntity.superhero = superheroEntity;
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
        newPowerstatsEntity.superhero = superheroEntity;
        await this.powerstatsRepo.insert(newPowerstatsEntity);
      }

      //CREATE CONNECTIONS
      if (connections) {
        let newConnectionsEntity = new ConnectionsEntity();
        newConnectionsEntity.groupaffiliation = connections.groupAffiliation;
        newConnectionsEntity.relatives = connections.relatives;
        newConnectionsEntity.superhero = superheroEntity;
        await this.connectionsRepo.insert(newConnectionsEntity);
      }

      //CREATE IMAGE
      if (images) {
        let newImageEntity = new ImageEntity();
        newImageEntity.xs = images.lg;
        newImageEntity.sm = images.lg;
        newImageEntity.md = images.lg;
        newImageEntity.lg = images.lg;
        newImageEntity.superhero = superheroEntity;
        await this.imageRepo.insert(newImageEntity);
      }

      //CREATE WORK
      if (work) {
        let newWorkEntity = new WorkEntity();
        newWorkEntity.occupation = work.occupation;
        newWorkEntity.base = work.base;
        newWorkEntity.superhero = superheroEntity;
        await this.workRepo.insert(newWorkEntity);
      }

      console.log("Saving: ", superhero.name);
      return { superhero };
    } catch (err) {
      return { err };
    }
  }

  async remove(id: string): Promise<any> {
    console.log("Removing: ", id);
    let response = await this.superheroRepo.delete({ id: id });
    return response;
  }
}
