import { inject, injectable } from 'inversify';
import { OfferService, CreateOfferDto, UpdateOfferDto, OfferEntity } from './index.js';
import { Component } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';
import { location } from '../../helpers/index.js';
import { DEFAULT_OFFER_IMAGES } from '../../helpers/const.js';


@injectable()
export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create({...dto, location: location[dto.city], images: DEFAULT_OFFER_IMAGES});
    this.logger.info(`New offer created: ${dto.title}`);

    return offer;
  }

  public async deleteById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findByIdAndDelete(offerId).exec();
    this.logger.info(`${offerId} suggestion has been deleted.`);

    return offer;
  }

  public async findOffers(count?: number): Promise<types.DocumentType<OfferEntity>[]> {
    const limit = count ?? 60;
    const offer = this.offerModel.find({}, {}, { limit }).exec();

    this.logger.info(`List of offers ${offer}`);

    return offer;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['host'])
      .exec();
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['host']).exec();
  }

  public async findByPremiumOffers(city: string, count?: number): Promise<types.DocumentType<OfferEntity>[] | null> {
    const limit = count ?? 3;
    return this.offerModel.find({city: city, isPremium: true}, {}, { limit }).populate(['host']).exec();
  }

  public async findByFavoritesOffers(): Promise<types.DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ isFavorite: true}, {}, {}).populate(['host']).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
