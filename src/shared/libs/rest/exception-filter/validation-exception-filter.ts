import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './../index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { ValidationError, ApplicationError } from './../index.js';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../helpers/index.js';


@injectable()
export class ValodationExceptionFilter implements ExceptionFilter {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValodationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValodationException]: ${error.message}`, error);

    error.details?.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] - ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
