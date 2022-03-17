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
import { ApiTags } from "@nestjs/swagger";
import { SuperheroeDto } from "./entity/superheroe/superheroe.dto";
import { SuperheroeService } from "./superheroe.service";
import { SuperheroeEntity } from "./entity/superheroe/superheroe.entity";
@ApiTags("superheroes")
@Controller("superheroes")
export class SuperheroeController {
  constructor(private superheroeService: SuperheroeService) {}

  @Get("getAll")
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<any[]> {
    return await this.superheroeService.getAll(page, limit);
  }

  @Get("get/:id")
  async getById(@Param("id") id: string): Promise<any> {
    return await this.superheroeService.getById(id);
  }

  @Post("create")
  async create(@Body() superheroe: SuperheroeDto): Promise<any> {
    return await this.superheroeService.create(superheroe);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<any> {
    return await this.superheroeService.remove(id);
  }
}
