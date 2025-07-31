import { VersioningType, ValidationPipe, HttpStatus } from '@nestjs/common';
import { AllExceptionFilter } from './infra/exception-filters/http-exception.filter';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import momentTimezone from 'moment-timezone';

export async function applyGlobalConfigs(app: NestFastifyApplication) {
  app.useGlobalFilters(app.get(AllExceptionFilter));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  Date.prototype.toJSON = function () {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DDTHH:mm:ss.SSS');
  };
}
