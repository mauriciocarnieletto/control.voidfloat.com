import { config } from './ormconfig';

Object.assign(config, {
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  logging: true,
});

export = config;
