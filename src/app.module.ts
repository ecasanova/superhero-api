import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroeModule } from "./superheroe/superheroe.module";
import { ConfigModule } from "@nestjs/config";
import { SuperheroeService } from "./superheroe/superheroe.service";
import * as ormconfig from "./ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...ormconfig,
      keepConnectionAlive: true,
    }),
    SuperheroeModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperheroeService],
})
export class AppModule {}
