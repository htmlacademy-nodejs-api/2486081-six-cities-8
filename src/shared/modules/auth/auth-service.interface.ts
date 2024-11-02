import { LoginUserDto } from '../user/index.js';
import { UserEntity } from '../user/user.entity.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verity(dto: LoginUserDto): Promise<UserEntity>;
}
