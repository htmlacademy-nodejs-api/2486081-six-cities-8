export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),

  UserService: Symbol.for('UserService'),
  UserModul: Symbol.for('UserModul'),
  UserController: Symbol.for('UserController'),

  OfferService: Symbol.for('OfferService'),
  OfferModul: Symbol.for('OfferModul'),
  OfferController: Symbol.for('OfferController'),

  CommentService: Symbol.for('CommentService'),
  CommentModul: Symbol.for('CommentModul'),

  ExceptionFilter: Symbol.for('ExceptionFilter')
} as const;
