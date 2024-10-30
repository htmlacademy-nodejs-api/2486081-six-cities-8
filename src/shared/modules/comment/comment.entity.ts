import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

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

  @prop({required: true, minlength: 5, maxlength: 1024 })
  public comment: string;

  @prop({required: true})
  public date: Date;

  @prop({required: true, min: 5, max: 10})
  public rating: number;

  @prop({ref: UserEntity, required: true})
  public user: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
