import { Controller, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SuperheroeEntity } from "./superheroe/superheroe.entity";

@Injectable()
@Controller("Superheroe")
export class SuperheroeRepository {
  constructor(
    @InjectRepository(SuperheroeEntity)
    private superheroesRepo: Repository<SuperheroeEntity>
  ) {}

  getAll(): Promise<any> {
    return this.superheroesRepo.find({
      relations: [
        "powerstats",
        "biography",
        "appearance",
        "appearance.height",
        "appearance.weight",
        "work",
        "connections",
        "image",
      ],
    });
  }

  getById(id: string): Promise<any> {
    return this.superheroesRepo.findOne(id, {
      relations: [
        "powerstats",
        "biography",
        "appearance",
        "appearance.height",
        "appearance.weight",
        "work",
        "connections",
        "image",
      ],
    });
  }

  getByName(name: string): Promise<any> {
    return this.superheroesRepo.findOne(
      { name },
      {
        relations: [
          "powerstats",
          "biography",
          "appearance",
          "work",
          "connections",
          "image",
        ],
      }
    );
  }
}
