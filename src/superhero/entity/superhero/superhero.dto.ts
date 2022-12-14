import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PowerstatsEntityDto } from "../powerstats/powerstats.dto";
import { AppearanceEntityDto } from "../appearance/appearance.dto";
import { BiographyEntityDto } from "../biography/biography.dto";
import { ConnectionsDto } from "../connections/connections.dto";
import { ImageEntityDto } from "../image/image.dto";
import { WorkEntityDto } from "../work/work.dto";

export class SuperheroDto {
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  powerstats: PowerstatsEntityDto;

  @ApiProperty()
  biography: BiographyEntityDto;

  @ApiProperty()
  appearance: AppearanceEntityDto;

  @ApiProperty()
  work: WorkEntityDto;

  @ApiProperty()
  connections: ConnectionsDto;

  @ApiProperty()
  images: ImageEntityDto;
}
