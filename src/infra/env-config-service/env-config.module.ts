import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { NestjsEnvConfigService } from './nestjs/nestjs-env-config.service';
import { Providers } from '@/application/constants/providers';

@Global()
@Module({})
export class EnvConfigServiceModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return {
      module: EnvConfigServiceModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.development', '.env.production'],
          ...options,
        }),
      ],
      providers: [
        {
          provide: Providers.ENV_CONFIG_SERVICE,
          useFactory: (configService: ConfigService) => {
            return new NestjsEnvConfigService(configService);
          },
          inject: [ConfigService],
        },
      ],
      exports: [Providers.ENV_CONFIG_SERVICE],
    };
  }
}
