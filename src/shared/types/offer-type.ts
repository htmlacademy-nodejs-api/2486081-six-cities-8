import { User } from './user-type.js';

export type Images = {
  img: string;
}
export type Goods = {
  good: string;
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  images: Images[];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  host: User;
}
