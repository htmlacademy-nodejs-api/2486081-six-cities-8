import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarUser: string;

  @Expose()
  public isPro: boolean;

  @Expose()
  public token: string;
}
