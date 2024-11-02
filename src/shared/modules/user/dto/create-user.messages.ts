export const CreateUserMessage = {
  name: {
    invalidFormat: 'Name is required',
    minLength: 'min length is 1',
    maxLength: 'max is 15'
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
  isPro: {
    invalidFormat: 'isPro must be an false of true'
  }
} as const;
