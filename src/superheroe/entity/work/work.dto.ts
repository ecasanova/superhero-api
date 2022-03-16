import { ApiProperty } from "@nestjs/swagger";

export class WorkDto {
  @ApiProperty()
  occupation: string;

  @ApiProperty()
  base: string;
}
