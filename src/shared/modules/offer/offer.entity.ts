import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { TypeOffer } from '../../types/offer-type.js';
import { UserEntity } from '../user/index.js';
import { Severity } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Offer',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({required: true})
  public postDate: Date;

  @prop({required: true})
  public city: string;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public images: string[];

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public rating: number;

  @prop({
    //required: true,
    type: () => String,
    enum: TypeOffer
  })
  public type: TypeOffer;

  @prop({required: true})
  public bedrooms: number;

  @prop({required: true})
  public maxAdults: number;

  @prop({required: true})
  public price: number;

  @prop({required: true})
  public goods: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public host: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount: number;

}

export const OfferModel = getModelForClass(OfferEntity);
