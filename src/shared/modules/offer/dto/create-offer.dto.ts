import { MinLength, MaxLength, IsDateString, IsInt, Min, Max, IsEnum, IsBoolean } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { TypeOffer } from '../../../types/index.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  public city: string;

  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.min })
  @Max(5, { message: CreateOfferValidationMessage.rating.max })
  public rating: number;

  @IsEnum(TypeOffer, { message: CreateOfferValidationMessage.type.invalid})
  public type: TypeOffer;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.min })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.max })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.adults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.adults.min })
  @Max(10, { message: CreateOfferValidationMessage.adults.max })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.min })
  @Max(100000, { message: CreateOfferValidationMessage.price.max })
  public price: number;

  public goods: string[];

  public host: string;
}
