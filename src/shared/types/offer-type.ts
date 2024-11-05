import { User, Location } from './index.js';

export type Images = {
  img: string;
}
export enum Goods {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export enum TypeOffer {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: TypeOffer;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[] | Goods[];
  host: User;
  location: Location
}
