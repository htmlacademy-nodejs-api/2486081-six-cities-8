import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod, PrivateRouteMiddleware, DocumentExistsMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { CreateOfferRequest, CreateOfferDto, DetailedOfferRdo, OfferRdo, OfferService, UpdateOfferDto, ParamOfferCity, ParamOfferId, RequestQuery } from './index.js';
import { CommentRdo, CommentService } from '../comment/index.js';
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
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
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
    this.addRoute({
      path: '/favorite/:offerId/',
      method: HttpMethod.Post,
      handler: this.favoriteStatus,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create({... body, host: tokenPayload.id});
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

  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const { id, email } = tokenPayload;
    const offer = await this.offerService.findById(offerId);
    const userOfferId = offer?.host.id.toString('hex');

    if (! (id === userOfferId)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `The offer ${offer?.id} does not belong to the user ${email}`,
        'OfferController'
      );
    }

    const result = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, result);
  }

  public async update({ body, params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const { id, email } = tokenPayload;
    const offer = await this.offerService.updateById(offerId, body);

    if (! (id === offer?.host.id)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `The offer ${offer?.id} does not belong to the user ${email}`,
        'OfferController'
      );
    }
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

  public async favoriteStatus({ params, query }: Request<ParamOfferId, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    if (Number(query.status) === 0) {
      const offer = await this.offerService.updateById(params.offerId, {isFavorite: false});
      return this.ok(res, fillDTO(DetailedOfferRdo, offer));
    }

    const offer = await this.offerService.updateById(params.offerId, {isFavorite: true});
    this.ok(res, fillDTO(DetailedOfferRdo, offer));
  }
}
