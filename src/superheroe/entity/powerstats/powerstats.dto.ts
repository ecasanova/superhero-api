import { ApiProperty } from "@nestjs/swagger";

export class PowerstatsEntityDto {
  @ApiProperty()
  intelligence: string;

  @ApiProperty()
  strength: string;

  @ApiProperty()
  speed: string;

  @ApiProperty()
  durability: string;

  @ApiProperty()
  power: string;

  @ApiProperty()
  combat: string;
}
