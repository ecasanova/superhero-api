import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroModule } from "./superhero/superhero.module";
import { ConfigModule } from "@nestjs/config";
import { SuperheroService } from "./superhero/superhero.service";
import * as ormconfig from "./ormconfig";
import { HealthCheckModule } from "nest-healthcheck";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...ormconfig,
      keepConnectionAlive: true,
    }),
    HealthCheckModule.register("TEST SERVICE"),
    SuperheroModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperheroService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
