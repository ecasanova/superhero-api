import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroeModule } from "./superheroe/superheroe.module";
import { ConfigModule } from "@nestjs/config";
import { SuperheroeService } from "./superheroe/superheroe.service";
import { AuthModule } from "./auth/auth.module";
import * as ormconfig from "./ormconfig";
import { AuthMiddleware } from "./middleware/auth.middleware";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...ormconfig,
      keepConnectionAlive: true,
    }),
    SuperheroeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperheroeService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("");
  }
}
