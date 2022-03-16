import { Module } from "@nestjs/common";
import { SuperheroeController } from "./superheroe.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroeEntity } from "./entity/superheroe/superheroe.entity";
import { SuperheroeService } from "./superheroe.service";
import { AliasesEntity } from "./entity/aliases/aliases.entity";
import { AppearanceEntity } from "./entity/appearance/appearance.entity";
import { BiographyEntity } from "./entity/biography/biography.entity";
import { ConnectionsEntity } from "./entity/connections/connections.entity";
import { HeightEntity } from "./entity/appearance/height.entity";
import { WeightEntity } from "./entity/appearance/weight.entity";
import { ImageEntity } from "./entity/image/image.entity";
import { PowerstatsEntity } from "./entity/powerstats/powerstats.entity";
import { WorkEntity } from "./entity/work/work.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      SuperheroeEntity,
      AliasesEntity,
      AppearanceEntity,
      BiographyEntity,
      ConnectionsEntity,
      HeightEntity,
      WeightEntity,
      ImageEntity,
      PowerstatsEntity,
      WorkEntity,
    ]),
  ],
  controllers: [SuperheroeController],
  providers: [SuperheroeService],
  exports: [SuperheroeService, TypeOrmModule],
})
export class SuperheroeModule {}
