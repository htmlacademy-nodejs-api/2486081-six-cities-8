import { Container } from 'inversify';
import { AuthService, DefaultAuthService } from './index.js';
import { Component } from '../../types/index.js';
import { AuthExceptionFilter, ExceptionFilter } from '../../libs/rest/index.js';

export function createAuthContainer() {
  const container = new Container;

  container.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return container;
}
