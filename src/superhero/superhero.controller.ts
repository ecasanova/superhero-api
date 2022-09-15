import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { SuperheroDto } from "./entity/superhero/superhero.dto";
import { SuperheroService } from "./superhero.service";
import { SuperheroSearchDto } from "./entity/superhero/search.dto";
@ApiTags("superhero")
@ApiSecurity("apiKey")
@Controller("superhero")
export class SuperheroController {
  constructor(private superheroService: SuperheroService) {}

  @Post("getAll")
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Body() search: SuperheroSearchDto
  ): Promise<any[]> {
    return await this.superheroService.getAll(page, limit, search);
  }

  @Get("getById/:id")
  async getById(@Param("id") id: string): Promise<any> {
    return await this.superheroService.getById(id);
  }

  @Get("getBySlug/:slug")
  async getBySlug(@Param("slug") slug: string): Promise<any> {
    let superhero = await this.superheroService.getBySlug(slug);
    if (superhero.powerstats) delete superhero.powerstats.id;
    if (superhero.images) delete superhero.images.id;
    if (superhero.biography) delete superhero.biography.id;
    if (superhero.appearance) delete superhero.appearance.id;
    if (superhero.work) delete superhero.work.id;
    if (superhero.connections) delete superhero.connections.id;
    if (superhero.biography.aliases)
      superhero.biography.aliases.forEach(function (v) {
        delete v.id;
      });
    if (superhero.appearance.height)
      superhero.appearance.height.forEach(function (v) {
        delete v.id;
      });
    if (superhero.appearance.weight)
      superhero.appearance.weight.forEach(function (v) {
        delete v.id;
      });
    return superhero;
  }

  @Post("create")
  async create(@Body() superhero: SuperheroDto): Promise<any> {
    return await this.superheroService.create(superhero);
  }

  /*
  @Post("create-bulk")
  async createBulk(): Promise<any> {
    return await this.superheroService.createBulk();
  }
  */

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<any> {
    return await this.superheroService.remove(id);
  }
}
