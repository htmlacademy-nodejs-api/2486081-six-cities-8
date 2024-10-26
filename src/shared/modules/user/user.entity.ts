import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TypeUser, User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true})
  public name: string;

  @prop({ unique: true, required: true})
  public email: string;

  @prop({ unique: true, default: 'true'})
  public avatarUser: string;

  @prop({required: true, default: ''})
  public password: string;

  @prop({required: true, type: () => String,
    enum: TypeUser
  })
  public typeUser: TypeUser;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUser = userData.avatarUser;
    this.typeUser = userData.typeUser;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
