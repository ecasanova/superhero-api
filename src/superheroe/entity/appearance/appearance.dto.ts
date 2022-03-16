import { ApiProperty } from "@nestjs/swagger";
import { Height } from "./height.entity";
import { Weight } from "./weight.entity";

export class AppearanceDto {
  @ApiProperty()
  gender: string;

  @ApiProperty()
  race: string;

  @ApiProperty()
  height?: Height[] | null;

  @ApiProperty()
  weight?: Weight[] | null;

  @ApiProperty()
  eyeColor: string;

  @ApiProperty()
  hairColor: string;
}
