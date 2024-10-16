import dayjs from 'dayjs';
import { getRandomElement, getRandomItems, getRandomNumber } from '../../helpers/index.js';
import { MockServerData } from '../../types/index.js';
import { OfferGenerator } from './index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MINIMUM_RATING = 1;
const MAXIMUM_RATING = 5;

const MAX_BEDROOMS = 5;
const MIN_BEDROOM = 1;

const MIN_ADULT = 1;
const MAX_ADULTS = 5;

const MIN_PRICE = 560;
const MAX_PRICE = 3500;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomElement<string>(this.mockData.title);
    const description = getRandomElement<string>(this.mockData.description);
    const postDate = dayjs().subtract(getRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomElement<string>(this.mockData.city);
    const previewImage = getRandomElement<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isFavorite = Math.random() < 0.5;
    const isPremium = Math.random() < 0.5;
    const rating = getRandomNumber(MINIMUM_RATING, MAXIMUM_RATING);
    const type = getRandomElement<string>(this.mockData.type);
    const bedrooms = getRandomNumber(MIN_BEDROOM, MAX_BEDROOMS);
    const maxAdults = getRandomNumber(MIN_ADULT, MAX_ADULTS);
    const price = getRandomNumber(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const name = getRandomElement<string>(this.mockData.name);
    const email = getRandomElement<string>(this.mockData.email);
    const avatarUser = getRandomElement<string>(this.mockData.avatarUser);
    const password = getRandomElement<string>(this.mockData.password);
    const typeUser = getRandomElement<string>(this.mockData.typeUser);

    return [
      title, description, postDate,
      city, previewImage, images,
      isFavorite, isPremium, rating,
      type, bedrooms, maxAdults,
      price, goods, name,
      email, avatarUser, password,
      typeUser
    ].join('\t');
  }
}
