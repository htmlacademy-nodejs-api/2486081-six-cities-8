import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateOfferDto } from './index.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
export type ParamOfferId = { offerId: string } | ParamsDictionary;
export type ParamOfferCity = { city: string } | ParamsDictionary;
export type RequestQuery = {
  limit?: number;
  status?: number;
}
