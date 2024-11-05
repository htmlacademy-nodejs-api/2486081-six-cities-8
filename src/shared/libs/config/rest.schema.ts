import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number,
  SALT: string,
  DB_HOST: string,
  DB_NAME: string,
  DB_USERNAME: string,
  DB_PASSWORD: string,
  DB_PORT: string,
  UPLOAD_DIRECTIRY: string,
  JWT_SECRET: string,
  HOST: string
  STATIC_DIRECTORY_PATH:string
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'HOST_DB',
    default: '127.0.0.1'
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  DB_USERNAME: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'DB_USERNAME',
    default: null
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017'
  },
  UPLOAD_DIRECTIRY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTIRY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for sign JSON Web Token',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  HOST: {
    doc: 'Host where started service',
    format: String,
    env: 'HOST',
    default: 'localhost'
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory with static resources',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: 'static'
  },
});
