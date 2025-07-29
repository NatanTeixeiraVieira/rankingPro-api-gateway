import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EnvConfigService } from 'src/application/env-config-service/env-config.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Topics } from 'src/application/constants/topics';
import { Providers } from 'src/application/constants/providers';

@Controller('category')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private readonly clientProxy: ClientProxy;

  constructor(
    @Inject(Providers.ENV_CONFIG_SERVICE) envConfigService: EnvConfigService,
  ) {
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
