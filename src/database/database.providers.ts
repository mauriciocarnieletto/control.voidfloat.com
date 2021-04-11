import { ConnectionOptions, createConnection } from 'typeorm';
import configuration from 'src/config/configuration';
import { Client } from 'src/client/entities/client.entity';
import { Pod } from 'src/pod/entities/pod.entity';
import { User } from 'src/users/entities/user.entity';
import { ServerConfiguration } from 'src/server-configuration/entities/server-configuration.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'sqlite',
        database: 'resources/database/voidserver.db',
        entities: [Client, Pod, User, ServerConfiguration],
        autoLoadEntities: true,
        synchronize: configuration().isDev,
      } as ConnectionOptions),
  },
];
