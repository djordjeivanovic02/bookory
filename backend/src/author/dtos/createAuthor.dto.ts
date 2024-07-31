import { CreateUserDto } from "src/user/dtos/createUser.dto";

export class CreateAuthorDto extends CreateUserDto {
  firstName: string;
  lastName: string;
  about?: string;
  picture?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}
