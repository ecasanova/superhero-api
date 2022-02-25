import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMapper } from "./entity/users.mapper";
import { UserEntity } from "./entity/users.entity";
import { UsersRepository } from "./entity/users.repository";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersRepository, UserMapper, UsersService],
  exports: [UsersRepository, UserMapper],
})
export class UsersModule {}
