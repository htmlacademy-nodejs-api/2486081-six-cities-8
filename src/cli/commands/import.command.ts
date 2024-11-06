import { getMongoURI } from '../../shared/helpers/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Logger, ConsoleLogger} from '../../shared/libs/logger/index.js';
import { OfferModel, OfferService, DefaultOfferService } from '../../shared/modules/offer/index.js';
import { UserModel, UserService, DefaultUserService} from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { Command, DefaultData } from './../index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.host,
      password: DefaultData.UserPassword
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      isPremium: offer.isPremium,
      rating: offer.rating,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      price:offer.price,
      goods: offer.goods,
      host: user.id
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string,host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DefaultData.PortDB, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.once('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
