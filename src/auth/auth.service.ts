import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { JWTPayload } from "./jwt.payload";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.getUserByName(email);
    return await user.validatePassword(password);
  }

  async generateAccessToken(name: string) {
    const user = await this.usersService.getUserByName(name);
    const payload: JWTPayload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
