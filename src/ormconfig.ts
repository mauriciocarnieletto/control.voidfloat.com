import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { Client } from 'src/client/entities/client.entity';
import { Pod } from 'src/pod/entities/pod.entity';
import { User } from 'src/users/entities/user.entity';
import { ServerConfiguration } from 'src/server-configuration/entities/server-configuration.entity';
import { PodConfigurationField } from 'src/pod-configuration-fields/entities/pod-configuration-field.entity';
import { PodConfigurationCommand } from 'src/pod-configuration-commands/entities/pod-configuration-command.entity';
import { PodActions } from './pod-actions/entities/pod-action.entity';

export const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'resources/database/voidserver.db',
  entities: [
    Client,
    Pod,
    PodActions,
    User,
    ServerConfiguration,
    PodConfigurationField,
    PodConfigurationCommand,
  ],
  autoLoadEntities: true,
  synchronize: configuration().isDev,
};
