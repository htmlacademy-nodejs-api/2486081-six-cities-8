import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

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

  /*@Expose()
   public comments: number;*/
}


