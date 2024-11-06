import { Expose } from 'class-transformer';
import { City } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public location: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public commentCount: number;

}


