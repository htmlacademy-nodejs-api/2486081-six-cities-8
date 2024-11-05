import { LoginUserDto, UserEntity } from '../user/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verity(dto: LoginUserDto): Promise<UserEntity>;
}
