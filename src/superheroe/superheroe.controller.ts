import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SuperheroeDto } from "./entity/superheroe/superheroe.dto";
import { SuperheroeService } from "./superheroe.service";
@ApiTags("superheroes")
@Controller("superheroes")
export class SuperheroeController {
  constructor(private superheroeService: SuperheroeService) {}

  @Get("getAll")
  async getAll(): Promise<any[]> {
    return await this.superheroeService.getAll();
  }

  @Get("getById")
  async getById(@Param("id") id: string): Promise<any> {
    return await this.superheroeService.getById(id);
  }

  @Post("create")
  async create(@Body() superheroe: SuperheroeDto): Promise<any> {
    return await this.superheroeService.create(superheroe);
  }

  @Post("createBulk")
  async createBulk(@Body() superheroes: SuperheroeDto[]): Promise<any> {
    return await this.superheroeService.createBulk(superheroes);
  }
}
