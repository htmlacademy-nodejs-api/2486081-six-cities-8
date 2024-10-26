import { Goods, Images, User } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public previewImage: string;
  public images: Images[];
  public isFavorite: boolean;
  public isPremium: boolean;
  public rating: number;
  public type: string;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: Goods[];
  public host: User;
}
