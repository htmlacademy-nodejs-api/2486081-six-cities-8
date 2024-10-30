import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { CreareOfferRequest, DetailedOfferRdo, OfferRdo, OfferService, } from './index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.findListOffers });
    this.addRoute({ path: '/offer', method: HttpMethod.Get, handler: this.findOffer });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.premium });
    this.addRoute({ path: '/favorite', method: HttpMethod.Get, handler: this.favorite });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.createOffer });
    this.addRoute({ path: '/', method: HttpMethod.Delete, handler: this.deleteOffer });
    this.addRoute({ path: '/', method: HttpMethod.Put, handler: this.updateOffer });
  }

  public async findListOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findOffers();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async findOffer(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById('6720b0971e31660a634b0b59');
    this.ok(res, fillDTO(DetailedOfferRdo, offer));
  }

  public async premium(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findByPremiumOffers('Paris');
    this.ok(res, offer);
  }

  public async favorite(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findByFavoritesOffers();
    this.ok(res, offer);
  }

  public async createOffer({ body }: CreareOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create(body);
    this.created(res, offer);
  }

  public async deleteOffer(_req: Request, _res: Response): Promise<void> {
    //
  }

  public async updateOffer(_req: Request, _res: Response): Promise<void> {
    //
  }
}
