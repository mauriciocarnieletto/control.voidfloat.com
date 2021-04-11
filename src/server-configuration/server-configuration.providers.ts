import { Connection } from 'typeorm';
import { ServerConfiguration } from './entities/server-configuration.entity';

export const serverConfigurationProviders = [
  {
    provide: 'SERVER_CONFIGURATION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ServerConfiguration),
    inject: ['DATABASE_CONNECTION'],
  },
];
