import { IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { UserRdo } from '../../user/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { TypeOffer } from '../../../types/offer-type.js';


export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  public city?: string;

  @IsOptional()
  @MaxLength(256, { message: UpdateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.rating.min })
  @Max(5, { message: UpdateOfferValidationMessage.rating.max })
  public rating?: number;

  @IsOptional()
  @IsEnum(TypeOffer, { message: UpdateOfferValidationMessage.type.invalid})
  public type?: TypeOffer;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.min })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.max })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.adults.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.adults.min })
  @Max(10, { message: UpdateOfferValidationMessage.adults.max })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.min })
  @Max(100000, { message: UpdateOfferValidationMessage.price.max })
  public price?: number;

  @IsOptional()
  public goods?: string[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferValidationMessage.host.invalidId })
  public host?: UserRdo;
}
