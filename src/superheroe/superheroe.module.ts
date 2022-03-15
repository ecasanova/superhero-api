import { Module } from "@nestjs/common";
import { SuperheroeController } from "./superheroe.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroeMapper } from "./entity/superheroe.mapper";
import { SuperheroeEntity } from "./entity/superheroe.entity";
import { SuperheroeRepository } from "./entity/superheroe.repository";
import { SuperheroeService } from "./superheroe.service";

@Module({
  imports: [TypeOrmModule.forFeature([SuperheroeEntity])],
  controllers: [SuperheroeController],
  providers: [SuperheroeRepository, SuperheroeMapper, SuperheroeService],
  exports: [SuperheroeRepository, SuperheroeMapper],
})
export class SuperheroeModule {}
