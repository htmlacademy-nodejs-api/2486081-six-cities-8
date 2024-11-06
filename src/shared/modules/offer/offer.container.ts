import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel, OfferController, DefaultOfferService, OfferService} from './index.js';
import { Controller } from '../../libs/rest/index.js';


export function createOfferContainer() {
  const container = new Container();

  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModul).toConstantValue(OfferModel);
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return container;
}
