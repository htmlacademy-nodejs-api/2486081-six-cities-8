import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, UpdateOfferDto, CreateOfferDto } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  deleteById(offerId: string) : Promise<DocumentType<OfferEntity> | null>;
  findOffers(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByPremiumOffers(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  findByFavoritesOffers(): Promise<DocumentType<OfferEntity>[] | null>;
}
