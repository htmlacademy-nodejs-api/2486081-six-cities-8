import { Request, Response, NextFunction } from 'express';
import { Middleware, HttpError} from '../index.js';
import { StatusCodes } from 'http-status-codes';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (! tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
