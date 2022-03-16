import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperheroeModule } from "./superheroe/superheroe.module";
import { ConfigModule } from "@nestjs/config";
import { SuperheroeService } from "./superheroe/superheroe.service";
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SuperheroeModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperheroeService],
})
export class AppModule {}
