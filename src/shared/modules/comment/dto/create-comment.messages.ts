export const CreateCommentMessage = {
  offerId: {
    invalidId: 'offerId field must be a valid id'
  },
  comment: {
    invalidFormat: 'Comment is required',
    minLength: 'Minimum title length must be 5',
    maxLength: 'Maximum title length must be 1024',
  },
  rating: {
    invalidFormat: 'Rating is required',
    min: 'Minimal rating 1',
    max: 'Maximal rating 5'
  },
  userId: {
    invalidId: 'userId field must be a valid id'
  }
} as const;
