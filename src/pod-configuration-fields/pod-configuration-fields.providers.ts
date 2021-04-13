import { Connection } from 'typeorm';
import { PodConfigurationField } from './entities/pod-configuration-field.entity';

export const podConfigurationFieldsProviders = [
  {
    provide: 'POD_CONFIGURATION_FIELDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PodConfigurationField),
    inject: ['DATABASE_CONNECTION'],
  },
];
