import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AliasesDto {
  @ApiProperty()
  value: string;
}
