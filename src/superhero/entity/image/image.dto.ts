import { ApiProperty } from "@nestjs/swagger";

export class ImageEntityDto {
  @ApiProperty()
  xs: string;

  @ApiProperty()
  sm: string;

  @ApiProperty()
  md: string;

  @ApiProperty()
  lg: string;
}
