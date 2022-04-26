import { ApiProperty } from "@nestjs/swagger";
import { MinMaxDto } from "./min-max.dto";

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}
export class SuperheroSearchDto {
  @ApiProperty()
  keyword: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  alignment: string;

  @ApiProperty()
  intelligence: MinMaxDto;

  @ApiProperty()
  strength: MinMaxDto;

  @ApiProperty()
  speed: MinMaxDto;

  @ApiProperty()
  durability: MinMaxDto;

  @ApiProperty()
  power: MinMaxDto;

  @ApiProperty()
  combat: MinMaxDto;
}
