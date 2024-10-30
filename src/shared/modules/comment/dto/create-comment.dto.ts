import { User } from '../../../types/user-type.js';

export class CreateCommentDto {
  offerId: string;
  comment: string;
  date: Date;
  rating: number;
  user: User;
}
