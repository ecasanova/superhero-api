import { Controller, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SuperheroeEntity } from "./superheroe.entity";
import { SuperheroeMapper } from "./superheroe.mapper";

@Injectable()
@Controller("Superheroe")
export class SuperheroeRepository {
  constructor(
    @InjectRepository(SuperheroeEntity)
    private superheroeRepository: Repository<SuperheroeEntity>,
    private mapper: SuperheroeMapper
  ) {}

  getAll(): Promise<SuperheroeEntity[]> {
    return this.superheroeRepository.find();
  }

  getById(id: string): Promise<SuperheroeEntity> {
    return this.superheroeRepository.findOne(id);
  }

  getByName(email: string): Promise<SuperheroeEntity> {
    return this.superheroeRepository.findOne({ email });
  }
}
