import { ApiProperty } from "@nestjs/swagger";

export class AppearanceEntityDto {
  @ApiProperty()
  gender: string;

  @ApiProperty()
  race: string;

  @ApiProperty()
  height: string[] | null;

  @ApiProperty()
  weight: string[] | null;

  @ApiProperty()
  eyeColor: string;

  @ApiProperty()
  hairColor: string;
}
