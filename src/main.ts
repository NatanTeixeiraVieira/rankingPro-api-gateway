import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Providers } from './application/constants/providers';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const envConfigService = app.get(Providers.ENV_CONFIG_SERVICE);

  await app.listen(envConfigService.getPort());
}
bootstrap();
