import {
  Body,
  Controller,
  Post,
  Get,
  UnauthorizedException,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserDTO } from "src/users/entity/user.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./entity/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    public usersService: UsersService
  ) {}

  @Post("/login")
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;
    const valid = await this.authService.validateUser(email, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(email);
  }

  @Get("/me")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getUserById(@Request() req: any): Promise<UserDTO> {
    const { id } = req.user;
    let user = await this.usersService.getUserById(id);
    delete user.password;
    return user;
  }
}
