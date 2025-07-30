import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Providers } from './application/constants/providers';
import momentTimezone from 'moment-timezone';
import { AllExceptionFilter } from './infra/exception-filters/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(app.get(AllExceptionFilter));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe());

  Date.prototype.toJSON = function () {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DDTHH:mm:ss.SSS');
  };

  const envConfigService = app.get(Providers.ENV_CONFIG_SERVICE);

  await app.listen(envConfigService.getPort());
}
bootstrap();
