import { TokenPayload } from './src/shared/modules/auth/helpers/types.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
