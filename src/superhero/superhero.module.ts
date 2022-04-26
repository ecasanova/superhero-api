import { Module } from "@nestjs/common";
import { SuperheroController } from "./superhero.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroEntity } from "./entity/superhero/superhero.entity";
import { SuperheroService } from "./superhero.service";
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
      SuperheroEntity,
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
  controllers: [SuperheroController],
  providers: [SuperheroService],
  exports: [SuperheroService, TypeOrmModule],
})
export class SuperheroModule {}
