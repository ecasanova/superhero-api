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
import { SuperheroeDto } from "./entity/superheroe/superheroe.dto";
import { SuperheroeService } from "./superheroe.service";
import { SuperheroeSearchDto } from "./entity/superheroe/search.dto";
@ApiTags("superheroes")
@ApiSecurity("apiKey")
@Controller("superheroes")
export class SuperheroeController {
  constructor(private superheroeService: SuperheroeService) {}

  @Post("getAll")
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Body() search: SuperheroeSearchDto
  ): Promise<any[]> {
    return await this.superheroeService.getAll(page, limit, search);
  }

  @Get("get/:id")
  async getById(@Param("id") id: string): Promise<any> {
    return await this.superheroeService.getById(id);
  }

  @Post("create")
  async create(@Body() superheroe: SuperheroeDto): Promise<any> {
    return await this.superheroeService.create(superheroe);
  }

  @Post("create-bulk")
  async createBulk(@Body() superheroes: SuperheroeDto[]): Promise<any> {
    return await this.superheroeService.createBulk(superheroes);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<any> {
    return await this.superheroeService.remove(id);
  }
}
