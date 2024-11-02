export enum TypeUser {
  Pro = 'Pro',
  Usual = 'Usual'
}

export type User = {
  name: string;
  email: string;
  avatarUser: string;
  password: string;
  isPro: boolean;
}
