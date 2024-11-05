import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../index.js';
import { Types } from 'mongoose';

import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/http-error.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(
    private param: string,
  ) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const mongoObjectId = params[this.param];

    if(Types.ObjectId.isValid(mongoObjectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${mongoObjectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
