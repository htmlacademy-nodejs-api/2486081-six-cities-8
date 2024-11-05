import { Component } from '../../types/index.js';
import { CommentEntity, CommentModel, CommentController, CommentService, DefaultCommentService} from './index.js';
import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Controller } from '../../libs/rest/index.js';

export function createCommentContainer() {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModul).toConstantValue(CommentModel);
  container.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return container;
}
