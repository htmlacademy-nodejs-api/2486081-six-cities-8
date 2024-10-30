import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateUserDto, LoginUserDto} from './index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
