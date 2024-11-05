import { Middleware, HttpMethod } from '../index.js';
import { Request, Response, NextFunction } from 'express';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
