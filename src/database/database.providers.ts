import { ConnectionOptions, createConnection } from 'typeorm';
import configuration from 'src/config/configuration';
import { Client } from 'src/client/entities/client.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'sqlite',
        database: 'resources/database/voidserver.db',
        entities: [Client],
        autoLoadEntities: true,
        synchronize: configuration().isDev,
      } as ConnectionOptions),
  },
];
