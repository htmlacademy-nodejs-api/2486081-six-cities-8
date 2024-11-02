export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length is 10',
    maxLength: 'Maximum title length is 100'
  },
  description: {
    minLength: 'Minimum description length is 20',
    maxLength: 'Maximum description length is 1024',
  },
  postDate: {
    invalidFormat: 'PostData must be a valid ISO date',
  },
  // city: string;
  previewImage: {
    invalidFormat: 'Image is required',
    maxLength: 'Too long for field image. Maximum length is 256'
  },
  // public images?: Images[];
  isFavorite: {
    invalidFormat: 'isFavorite must be is false or true'
  },
  isPremium: {
    invalidFormat: 'isPremium must be is false or true'
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
    invalidFormat: 'price must be an integer',
    min: 'Minimum price is 100',
    max: 'Maximum price is 100 000'
  },
  // public goods?: Goods[];
  host:  {
    invalidId: 'Host field must be a valid id',
  },
} as const;
