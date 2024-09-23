import { readFileSync } from 'node:fs';
import { FileReader } from './index.js';
import { Offer, TypeUser } from '../../types/index.js';
export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      date,
      city,
      previewImage,
      images,
      isFavorite,
      isPremium,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      name,
      email,
      avatarUser,
      password,
      typeUser,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(date),
      city,
      previewImage,
      images: this.parseImages(images),
      isFavorite: this.parseBoolean(isFavorite),
      isPremium: this.parseBoolean(isPremium),
      rating: this.parseStringToNumber(rating),
      type,
      bedrooms: this.parseStringToNumber(bedrooms),
      maxAdults: this.parseStringToNumber(maxAdults),
      price: this.parseStringToNumber(price),
      goods: this.parseGoods(goods),
      host: this.parseHost(name, email, avatarUser, password, typeUser)
    };
  }

  private parseBoolean(itemString: string): boolean {
    if (itemString === 'true') {
      return true;
    }
    return false;
  }

  private parseStringToNumber(itemString: string): number {
    return Number.parseInt(itemString, 10);
  }

  private parseGoods(goods: string): {good: string}[] {
    return goods.split(',').map((good) => ({good}));
  }

  private parseImages(images: string): {img: string}[] {
    return images.split(',').map((img) => ({img}));
  }

  private parseHost(name: string, email: string, avatarUser: string, password: string, typeUser: string) {
    return {name, email, avatarUser, password, typeUser:TypeUser[typeUser as 'Pro' | 'Usual']};
  }

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
