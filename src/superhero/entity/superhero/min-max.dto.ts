import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class MinMaxDto {
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty()
  min: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty()
  max: number;
}
