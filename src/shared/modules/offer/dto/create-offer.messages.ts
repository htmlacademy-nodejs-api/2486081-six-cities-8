export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'PostDate must be a valid ISO date',
  },
  //city: {},
  previewImage:{
    maxLength: 'Too short for field «previewImage»',
  },
  // images:
  isFavorite: {
    invalidFormat: 'isFavorite must be an false of true'
  },
  isPremium: {
    invalidFormat: 'isPremium must be an false of true'
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    min: 'Minimal rating 1',
    max: 'Maximal rating 5'
  },
  type: {
    invalid: 'Type of offers must be apartment, house, room, hotel'
  },
  bedrooms: {
    invalidFormat: 'Bedrooms must be an integer',
    min: 'Minimal quantity bedroom is 1',
    max: 'Maximal quantity bedrooms is 8'
  },
  adults: {
    invalidFormat: 'Adults must be an integer',
    min: 'Minimal quantity adult is 1',
    max: 'Maximal quantity adults is 10'
  },
  price: {
    invalidFormat: 'Price must be an integer',
    min: 'Minimum price is 100',
    max: 'Maximum price is 100 000'
  },
  //goods:
  host:  {
    invalidId: 'Host field must be a valid id',
  },
} as const;


