import * as Mongoose from 'mongoose';

import { inject, injectable } from 'inversify';
import { DatabaseClient } from './index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { Retry } from '../../helpers/index.js';
import { setTimeout } from 'node:timers/promises';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {

  private isConnected: boolean;
  private mongoose: typeof Mongoose;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {

    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');


    let attempt = 0;
    while (attempt < Retry.Count) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(Retry.Timeout);
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}
