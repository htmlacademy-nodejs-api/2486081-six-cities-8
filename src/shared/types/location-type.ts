export type Location = {
  name: string;
  latitude: number;
  longitude: number;
}
export type City = {
  [key: string] : Location
}
