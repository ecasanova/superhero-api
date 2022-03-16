import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PowerstatsDto } from "../powerstats/powerstats.dto";
import { AppearanceDto } from "../appearance/appearance.dto";
import { BiographyDto } from "../biography/biography.dto";
import { ConnectionsDto } from "../connections/connections.dto";
import { ImageDto } from "../image/image.dto";
import { WorkDto } from "../work/work.dto";

export class SuperheroeDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  powerstats: PowerstatsDto;

  @ApiProperty()
  biography: BiographyDto;

  @ApiProperty()
  appearance: AppearanceDto;

  @ApiProperty()
  work: WorkDto;

  @ApiProperty()
  connections: ConnectionsDto;

  @ApiProperty()
  image: ImageDto;
}
