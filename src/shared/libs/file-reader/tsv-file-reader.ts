import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './index.js';
import { Offer, TypeUser } from '../../types/index.js';
export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosititon = -1;
    let importedRowCouint = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while((nextLinePosititon = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosititon + 1);
        remainingData = remainingData.slice(++nextLinePosititon);
        importedRowCouint++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCouint);
  }
}

