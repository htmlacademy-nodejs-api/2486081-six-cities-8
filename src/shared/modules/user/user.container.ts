import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DefaultUserService, UserController, UserEntity, UserModel, UserService } from './index.js';
import { types } from '@typegoose/typegoose';
import { Controller } from '../../libs/rest/index.js';

export function createUserContainer() {
  const container = new Container();

  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModul).toConstantValue(UserModel);
  container.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return container;
}
