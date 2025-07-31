import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Providers } from './application/constants/providers';
import { EnvConfigServiceModule } from './infra/env-config-service/env-config.module';
import { applyGlobalConfigs } from './global-configs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.register({ envModule: EnvConfigServiceModule.forRoot() }),
    new FastifyAdapter(),
  );

  await applyGlobalConfigs(app);

  const envConfigService = app.get(Providers.ENV_CONFIG_SERVICE);

  await app.listen(envConfigService.getPort());
}
bootstrap();
