import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestApplicationOptions } from '@nestjs/common';
import { Providers } from './application/constants/providers';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter() as unknown as NestApplicationOptions,
  );

  const envConfigService = app.get(Providers.ENV_CONFIG_SERVICE);

  await app.listen(envConfigService.getPort());
}
bootstrap();
