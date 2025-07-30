import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EnvConfigService } from 'src/application/env-config-service/env-config.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Topics } from 'src/application/constants/topics';
import { Providers } from 'src/application/constants/providers';
import { LoggerService } from '@/application/logger/logger.service';

@Controller('category')
export class AppController {
  private readonly clientProxy: ClientProxy;

  constructor(
    @Inject(Providers.ENV_CONFIG_SERVICE) envConfigService: EnvConfigService,
    @Inject(Providers.LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AppController.name);
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${envConfigService.getBrokerUser()}:${envConfigService.getBrokerPassword()}@${envConfigService.getBrokerHost()}/rankingPro`,
        ],
        queue: 'admin',
      },
    });
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clientProxy.emit(Topics.CREATE_CATEGORY, createCategoryDto);
  }
}
