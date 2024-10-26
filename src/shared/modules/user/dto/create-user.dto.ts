import { TypeUser } from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarUser: string;
  public password: string;
  public typeUser: TypeUser;
}
