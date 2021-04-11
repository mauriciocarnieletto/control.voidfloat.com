import { Connection } from 'typeorm';
import { Pod } from './entities/pod.entity';

export const podProviders = [
  {
    provide: 'POD_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Pod),
    inject: ['DATABASE_CONNECTION'],
  },
];
