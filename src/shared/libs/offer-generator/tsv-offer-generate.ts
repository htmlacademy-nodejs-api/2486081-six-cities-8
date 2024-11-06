import dayjs from 'dayjs';
import { getRandomElement, getRandomItems, getRandomNumber } from '../../helpers/index.js';
import { MockServerData } from '../../types/index.js';
import { OfferGenerator } from './index.js';
import { Attributes, location, Price, WeekDay } from '../../helpers/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomElement<string>(this.mockData.title);
    const description = getRandomElement<string>(this.mockData.description);
    const postDate = dayjs().subtract(getRandomNumber(WeekDay.First, WeekDay.Last), 'day').toISOString();
    const city = getRandomElement<string>(this.mockData.city);
    const previewImage = getRandomElement<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isFavorite = Math.random() < 0.5;
    const isPremium = Math.random() < 0.5;
    const rating = getRandomNumber(Attributes.Min, Attributes.Max);
    const type = getRandomElement<string>(this.mockData.type);
    const bedrooms = getRandomNumber(Attributes.Min, Attributes.Max);
    const maxAdults = getRandomNumber(Attributes.Min, Attributes.Max);
    const price = getRandomNumber(Price.Min, Price.Mix);
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
      typeUser, location
    ].join('\t');
  }
}
