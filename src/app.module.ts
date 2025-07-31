import { ExceptionFiltersModule } from './infra/exception-filters/exception-filters.module';
import { LoggerModule } from './infra/logger/logger.module';
import { DynamicModule } from '@nestjs/common';
import { AppController } from './infra/controllers/app.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Providers } from './application/constants/providers';
import { EnvConfigService } from './application/env-config-service/env-config.service';

export class AppModule {
  static register(options: { envModule: DynamicModule }): DynamicModule {
    return {
      module: AppModule,
      imports: [ExceptionFiltersModule, LoggerModule, options.envModule],
      controllers: [AppController],
      providers: [
        {
          provide: Providers.BROKER_SERVICE,
          useFactory: (envConfigService: EnvConfigService) => {
            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [
                  `amqp://${envConfigService.getBrokerUser()}:${envConfigService.getBrokerPassword()}@${envConfigService.getBrokerHost()}/rankingPro`,
                ],
                queue: 'admin',
              },
            });
          },
          inject: [Providers.ENV_CONFIG_SERVICE],
        },
      ],
    };
  }
}
