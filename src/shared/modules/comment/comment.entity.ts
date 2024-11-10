import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'Comments',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({required: true, ref: OfferEntity})
  public offerId: Ref<OfferEntity>;

  @prop({required: true, minLength: 5, maxLength: 1024 })
  public comment: string;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({required: true, ref: UserEntity})
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
