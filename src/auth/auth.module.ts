import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
@Module({
  imports: [PassportModule],
  providers: [AuthService],
})
export class AuthModule {}
