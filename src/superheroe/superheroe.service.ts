import { Injectable } from "@nestjs/common";
import { SuperheroeDTO } from "./entity/superheroe.dto";
import { SuperheroeEntity } from "./entity/superheroe.entity";
import { SuperheroeMapper } from "./entity/superheroe.mapper";
import { SuperheroeRepository } from "./entity/superheroe.repository";

@Injectable()
export class SuperheroeService {
  constructor(
    private superheroesRepository: SuperheroeRepository,
    private mapper: SuperheroeMapper
  ) {}

  async getAll(): Promise<SuperheroeDTO[]> {
    const superheroes: SuperheroeEntity[] =
      await this.superheroesRepository.getAll();
    return superheroes.map((user) => this.mapper.entityToDto(user));
  }

  async getById(id: string): Promise<SuperheroeDTO> {
    const user: SuperheroeEntity = await this.superheroesRepository.getById(id);
    if (user && user.password) delete user.password;
    return this.mapper.entityToDto(user);
  }

  async getByName(name: string): Promise<SuperheroeEntity> {
    return await this.superheroesRepository.getByName(name);
  }
}
