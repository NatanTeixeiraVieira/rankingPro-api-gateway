import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { join } from 'node:path';
import { Providers } from 'src/application/constants/providers';
import { NestjsEnvConfigService } from './env-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
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
})
export class EnvConfigServiceModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    return ConfigModule.forRoot({
      isGlobal: true,
      ...options,
      envFilePath: [join(__dirname, `../../../.env.${process.env.NODE_ENV}`)],
    });
  }
}
