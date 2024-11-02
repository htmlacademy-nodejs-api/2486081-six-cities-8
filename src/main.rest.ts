import 'reflect-metadata';
import { RestApplication, createReasApplicationContainer} from './rest/index.js';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createAuthContainer } from './shared/modules/auth/auth.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createReasApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
