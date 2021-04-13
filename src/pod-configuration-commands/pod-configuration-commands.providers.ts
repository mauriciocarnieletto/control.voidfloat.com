import { Connection } from 'typeorm';
import { PodConfigurationCommand } from './entities/pod-configuration-command.entity';

export const podConfigurationCommandsProviders = [
  {
    provide: 'POD_CONFIGURATION_COMMANDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PodConfigurationCommand),
    inject: ['DATABASE_CONNECTION'],
  },
];
