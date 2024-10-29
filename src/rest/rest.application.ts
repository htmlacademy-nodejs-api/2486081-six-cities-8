import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/datadase.js';
import express, { Express } from 'express';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) {
    this.server = express();
  }

  private async initDb() {

    const mongoUri = getMongoURI(
      this.config.get('DB_USERNAME'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initiazation');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('init database completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
