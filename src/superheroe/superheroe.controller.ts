import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SuperheroeDTO } from "./entity/superheroe.dto";
import { SuperheroeService } from "./superheroe.service";
@ApiTags("Superheroes")
@Controller("Superheroes")
export class SuperheroeController {
  constructor(private superheroeService: SuperheroeService) {}

  @Get()
  async getAll(): Promise<SuperheroeDTO[]> {
    return await this.superheroeService.getAll();
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getById(@Param("id") id: string): Promise<SuperheroeDTO> {
    return await this.superheroeService.getById(id);
  }
}
