import { IsBoolean, IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CreateUserMessage } from './create-user.messages.js';

export class CreateUserDto {
  @IsString({ message : CreateUserMessage.name.invalidFormat })
  @MinLength(1, { message: CreateUserMessage.name.minLength })
  @MaxLength(15, { message: CreateUserMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: CreateUserMessage.email.invalidFormat })
  public email: string;

  public avatarUser: string;

  @IsString({ message: CreateUserMessage.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessage.password.lengthField })
  public password: string;

  @IsBoolean({ message: CreateUserMessage.isPro.invalidFormat })
  public isPro: boolean;
}
