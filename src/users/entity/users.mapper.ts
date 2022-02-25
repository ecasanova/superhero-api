import { Injectable } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { UserEntity } from "./users.entity";

@Injectable()
export class UserMapper {
  dtoToEntity(userDTO: UserDTO): UserEntity {
    return new UserEntity(userDTO.email, userDTO.password);
  }

  entityToDto(userEntity: UserEntity): UserDTO {
    let user = userEntity;
    if (user && user.password) delete user.password;
    return user;
  }
}
