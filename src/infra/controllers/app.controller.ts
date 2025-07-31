import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { LoggerService } from '@/application/logger/logger.service';
import { Providers } from '@/application/constants/providers';
import { Topics } from '@/application/constants/topics';

@Controller('category')
export class AppController {
  constructor(
    @Inject(Providers.LOGGER_SERVICE)
    private readonly logger: LoggerService,
    @Inject(Providers.BROKER_SERVICE) private readonly clientProxy: ClientProxy,
  ) {
    this.logger.setContext(AppController.name);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clientProxy.emit(Topics.CREATE_CATEGORY, createCategoryDto);
  }
}
