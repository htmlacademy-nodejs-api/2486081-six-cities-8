import { inject, injectable } from 'inversify';
import { OfferService, CreateOfferDto, UpdateOfferDto, OfferEntity } from './index.js';
import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/logger.interface.js';


@injectable()
export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModul) private readonly offerModul: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const offer = await this.offerModul.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return offer;
  }

  public async deleteById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    const offer = await this.offerModul.findByIdAndDelete(offerId).exec();
    this.logger.info(`${offerId} suggestion has been deleted.`);

    return offer;
  }

  public async findOffers(count?: number): Promise<types.DocumentType<OfferEntity>[]> {
    const limit = count ?? 60;
    const offer = this.offerModul.find({}, {}, { limit }).exec();

    this.logger.info(`List of offers ${offer}`);

    return offer;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModul
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['host'])
      .exec();
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModul.findById(offerId).populate(['host']).exec();
  }

  public async findByPremiumOffers(city: string, count?: number): Promise<types.DocumentType<OfferEntity>[] | null> {
    const limit = count ?? 3;
    return this.offerModul.find({city: city, isPremium: true}, {}, { limit }).populate(['host']).exec();
  }

  public async findByFavoritesOffers(): Promise<types.DocumentType<OfferEntity>[] | null> {
    return this.offerModul.find({ isFavorite: true}, {}, {}).populate(['host']).exec();
  }
}
