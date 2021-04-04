import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NetworkModule } from './network/network.module';
import { ServiceModule } from './service/service.module';
import { PodModule } from './pod/pod.module';
import { SetupModule } from './setup/setup.module';
import configuration from './config/configuration';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../resources/database/voidserver.db',
      entities: ['dist/**/*.entity{js,ts}'],
      autoLoadEntities: true,
      synchronize: configuration().isDev,
    }),
    PodModule,
    NetworkModule,
    ServiceModule,
    SetupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
