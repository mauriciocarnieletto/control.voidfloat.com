import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { PodCommandsModule } from './pod-commands/pod-commands.module';
import { Pod } from './pod/entities/pod.entity';
import { Client } from './client/entities/client.entity';
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
    DatabaseModule,
    PodModule,
    NetworkModule,
    ServiceModule,
    SetupModule,
    ClientModule,
    AuthModule,
    UsersModule,
    PodCommandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
