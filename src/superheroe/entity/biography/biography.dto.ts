import { ApiProperty } from "@nestjs/swagger";
import { AliasesEntityDto } from "../aliases/aliases.dto";

export class BiographyEntityDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  alterEgos: string;

  @ApiProperty()
  aliases: any;

  @ApiProperty()
  placeOfBirth: string;

  @ApiProperty()
  firstAppearanceEntity: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  alignment: string;
}
