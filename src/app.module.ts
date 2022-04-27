import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroModule } from "./superhero/superhero.module";
import { ConfigModule } from "@nestjs/config";
import { SuperheroService } from "./superhero/superhero.service";
import { AuthModule } from "./auth/auth.module";
import * as ormconfig from "./ormconfig";
import { AuthMiddleware } from "./middleware/auth.middleware";
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperheroService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("");
  }
}
