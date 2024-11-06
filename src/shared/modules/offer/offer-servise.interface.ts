import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, UpdateOfferDto, CreateOfferDto } from './index.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  deleteById(offerId: string) : Promise<DocumentType<OfferEntity> | null>;
  findOffers(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByPremiumOffers(city: string, count?: number): Promise<DocumentType<OfferEntity>[] | null>;
  findByFavoritesOffers(count?: number): Promise<DocumentType<OfferEntity>[] | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
}
