import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type CreareOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
export type ParamOfferId = { offerId: string } | ParamsDictionary;
export type ParamOfferCity = { city: string } | ParamsDictionary;
export type RequestQuery = {
  limit?: number;
}
