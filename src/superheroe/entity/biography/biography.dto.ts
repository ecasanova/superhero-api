import { ApiProperty } from "@nestjs/swagger";
import { AliasesDto } from "../aliases/aliases.dto";

export class BiographyDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  alterEgos: string;

  @ApiProperty()
  aliases?: AliasesDto[];

  @ApiProperty()
  placeOffBirth: string;

  @ApiProperty()
  firstAppearance: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  alignment: string;
}
