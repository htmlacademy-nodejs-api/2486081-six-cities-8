import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentService, CreateCommentDto } from './index.js';

@injectable()
export class DefaultCommentService implements CommentService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<types.DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment created');

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count?: number): Promise<types.DocumentType<CommentEntity>[]> {
    const limit = count ?? 50;
    const connects = this.commentModel.find({offerId}, {}, { limit }).populate('userId');
    this.logger.info(`List of comments for offer id:${offerId}`);

    return connects;
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({offerId}).exec();
    this.logger.info('The comment has been deleted');

    return result.deletedCount;
  }

}
