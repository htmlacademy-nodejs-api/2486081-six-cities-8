import { City } from '../types/index.js';

export enum WeekDay {
  First = 1,
  Last = 7
}

export enum Attributes {
  Min = 1,
  Max = 5
}

export enum Price {
  Min = 560,
  Mix = 3500
}

export enum Retry {
  Count = 5,
  Timeout = 1000
}

export const location: City = {
  Paris: {
    name: 'Paris',
    latitude: 48.85661,
    longitude: 2.351499
  },
  Cologne: {
    name: 'Cologne',
    latitude: 50.938361,
    longitude: 6.959974
  },
  Brussels: {
    name: 'Brussels',
    latitude: 50.846557,
    longitude: 4.351697
  },
  Amsterdam: {
    name: 'Amsterdam',
    latitude: 52.370216,
    longitude: 4.895168
  },
  Hamburg:   {
    name: 'Hamburg',
    latitude: 53.550341,
    longitude: 10.000654
  },
  Dusseldorf:{
    name: 'Dusseldorf',
    latitude: 51.225402,
    longitude: 6.776314
  },
} as const;

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpg';
export const DEFAULT_OFFER_IMAGES = [
  'static-image-1.jpg',
  'static-image-2.jpg',
  'static-image-3.jpg',
  'static-image-4.jpg',
  'static-image-5.jpg',
  'static-image-6.jpg'
];
