import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { CreareOfferRequest, CreateOfferDto, DetailedOfferRdo, OfferRdo, OfferService, UpdateOfferDto, } from './index.js';
import { ParamOfferCity, ParamOfferId, RequestQuery } from './types.js';
import { CommentService } from '../comment/comment-servise.interface.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { StatusCodes } from 'http-status-codes';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [ new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:city/offer', method: HttpMethod.Get, handler: this.premium });
    this.addRoute({ path: '/favorite/offers', method: HttpMethod.Get, handler: this.favorite });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.indexComment,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create({ body }: CreareOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findOffers();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(DetailedOfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(DetailedOfferRdo, offer));
  }

  public async premium({ params, query }: Request<ParamOfferCity, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const { city } = params;
    const { limit } = query;
    const offer = await this.offerService.findByPremiumOffers(city, limit);

    if (offer?.length === 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `There is no premium offers for ${city}`,
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async favorite(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findByFavoritesOffers();
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async indexComment({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
