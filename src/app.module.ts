import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NetworkModule } from './network/network.module';
import { ServiceModule } from './service/service.module';
import { SetupModule } from './setup/setup.module';
import { PodModule } from './pod/pod.module';
import { ClientModule } from './client/client.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServerConfigurationModule } from './server-configuration/server-configuration.module';
import { PodConfigurationFieldsModule } from './pod-configuration-fields/pod-configuration-fields.module';
import { PodConfigurationCommandsModule } from './pod-configuration-commands/pod-configuration-commands.module';
import { PodCommunicationModule } from './pod-communication/pod-communication.module';
import { BackgroundServiceModule } from './background-service/background-service.module';
import { PodGateway } from './pod/pod.gateway';
import configuration from './config/configuration';
import { join } from 'path';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    PodModule,
    NetworkModule,
    ServiceModule,
    SetupModule,
    ClientModule,
    AuthModule,
    UsersModule,
    ServerConfigurationModule,
    PodConfigurationFieldsModule,
    PodConfigurationCommandsModule,
    PodCommunicationModule,
    BackgroundServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PodGateway],
})
export class AppModule {}
