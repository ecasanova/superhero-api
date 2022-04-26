import { ApiProperty } from "@nestjs/swagger";

export class AliasesEntityDto {
  @ApiProperty()
  value: string;
}
