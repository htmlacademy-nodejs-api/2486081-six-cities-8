import { inject, injectable } from 'inversify';
import { OfferService } from './offer-servise.interface.js';
import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

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

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModul.findById(offerId).exec();
  }
}
