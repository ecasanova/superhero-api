import { ApiProperty } from "@nestjs/swagger";

export class PowerstatsEntityDto {
  @ApiProperty()
  intelligence: number;

  @ApiProperty()
  strength: number;

  @ApiProperty()
  speed: number;

  @ApiProperty()
  durability: number;

  @ApiProperty()
  power: number;

  @ApiProperty()
  combat: number;
}
