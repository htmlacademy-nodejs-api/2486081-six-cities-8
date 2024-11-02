import { IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateCommentMessage } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsMongoId({ message: CreateCommentMessage.offerId.invalidId })
  public offerId: string;

  @IsString({ message : CreateCommentMessage.comment.invalidFormat })
  @MinLength(5, { message: CreateCommentMessage.comment.minLength })
  @MaxLength(1024, { message: CreateCommentMessage.comment.maxLength })
  public comment: string;

  @IsInt({ message: CreateCommentMessage.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessage.rating.min })
  @Max(5, { message: CreateCommentMessage.rating.max })
  public rating: number;

  public userId: string;
}
