import { Injectable } from "@nestjs/common";
import { SuperheroeDTO } from "./superheroe.dto";
import { SuperheroeEntity } from "./superheroe.entity";

@Injectable()
export class SuperheroeMapper {
  dtoToEntity(userDTO: SuperheroeDTO): SuperheroeEntity {
    return new SuperheroeEntity(userDTO.email, userDTO.password);
  }

  entityToDto(userEntity: SuperheroeEntity): SuperheroeDTO {
    let user = userEntity;
    if (user && user.password) delete user.password;
    return user;
  }
}
