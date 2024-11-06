import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod, PrivateRouteMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { UserService, UserRdo, LoginUserRequest, CreateUserRequest, CreateUserDto, LoginUserDto} from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { StatusCodes } from 'http-status-codes';
import { UploadFileMiddleware, ValidateObjectIdMiddleware, ValidateDtoMiddleware } from '../../libs/rest/index.js';
import { RestSchema, Config } from '../../libs/config/index.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from './index.js';


@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Config) protected readonly config: Config<RestSchema>,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.AuthService) private readonly authService: AuthService
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTIRY'), 'avatar')

      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkStatusAuthenticate
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Delete,
      handler: this.logout,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `A user with the email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, 'salt');
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verity(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token
    });
    this.ok(res, fillDTO(LoggedUserRdo,responseData));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, { filepath: req.file?.path });
  }

  public async checkStatusAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const user = await this.userService.findByEmail(email);
    if (! user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }
    this.ok(res, fillDTO(UserRdo, user));
  }

  public logout(_req: Request, res: Response){
    this.noContent(res, {});
  }
}
