import { Connection } from 'typeorm';
import { PodActions } from './entities/pod-action.entity';

export const podActionsFieldsProviders = [
  {
    provide: 'POD_ACTIONS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PodActions),
    inject: ['DATABASE_CONNECTION'],
  },
];
