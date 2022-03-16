import { ApiProperty } from "@nestjs/swagger";

export class WorkEntityDto {
  @ApiProperty()
  occupation: string;

  @ApiProperty()
  base: string;
}
