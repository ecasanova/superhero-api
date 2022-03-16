import { Module } from "@nestjs/common";
import { SuperheroeController } from "./superheroe.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroeEntity } from "./entity/superheroe/superheroe.entity";
import { SuperheroeRepository } from "./entity/superheroe.repository";
import { SuperheroeService } from "./superheroe.service";
import { Aliases } from "./entity/aliases/aliases.entity";
import { Appearance } from "./entity/appearance/appearance.entity";
import { Biography } from "./entity/biography/biography.entity";
import { Connections } from "./entity/connections/connections.entity";
import { Height } from "./entity/appearance/height.entity";
import { Weight } from "./entity/appearance/weight.entity";
import { Image } from "./entity/image/image.entity";
import { Powerstats } from "./entity/powerstats/powerstats.entity";
import { Work } from "./entity/work/work.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SuperheroeEntity,
      Aliases,
      Appearance,
      Biography,
      Connections,
      Height,
      Weight,
      Image,
      Powerstats,
      Work,
    ]),
  ],
  controllers: [SuperheroeController],
  providers: [SuperheroeRepository, SuperheroeService],
  exports: [SuperheroeRepository, SuperheroeService],
})
export class SuperheroeModule {}
