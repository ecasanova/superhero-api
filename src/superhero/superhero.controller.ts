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

  @Get("get/:id")
  async getById(@Param("id") id: string): Promise<any> {
    return await this.superheroService.getById(id);
  }

  @Get("get/:slug")
  async getBySlug(@Param("slug") slug: string): Promise<any> {
    return await this.superheroService.getBySlug(slug);
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
