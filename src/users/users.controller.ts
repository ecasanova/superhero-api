import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ValidUserIdPipe } from "./../utils/pipes/valid-user-id.pipe";
import { UserDTO } from "./entity/user.dto";
import { UsersService } from "./users.service";
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getUserById(@Param("id") id: string): Promise<UserDTO> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async newUser(@Body() user: UserDTO): Promise<UserDTO> {
    return await this.usersService.newUser(user);
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async updateUser(
    @Param("id", ValidUserIdPipe) id: string,
    @Body() user: UserDTO
  ): Promise<UserDTO> {
    return await this.usersService.updateUser(id, user);
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
