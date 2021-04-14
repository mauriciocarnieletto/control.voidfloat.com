import { ConnectionOptions, createConnection } from 'typeorm';
import { config } from 'src/ormconfig';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(config as ConnectionOptions),
  },
];
