import { ApiProperty } from "@nestjs/swagger";

export class ConnectionsDto {
  @ApiProperty()
  groupAffiliation: string;

  @ApiProperty()
  relatives: string;
}
