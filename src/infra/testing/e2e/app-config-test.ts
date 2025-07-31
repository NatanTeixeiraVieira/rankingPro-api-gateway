import { AppModule } from '@/app.module';
import { Providers } from '@/application/constants/providers';
import { EnvConfigService } from '@/application/env-config-service/env-config.service';
import { applyGlobalConfigs } from '@/global-configs';
import { EnvConfigServiceModule } from '@/infra/env-config-service/env-config.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TestingModule, Test } from '@nestjs/testing';

type AppFastifyConfigTestResponse = {
  fastifyApp: NestFastifyApplication;
  module: TestingModule;
};

type AppFastifyConfigTestOptions = {
  emitMock?: jest.Mock;
};

export async function appFastifyConfigTest(
  options?: AppFastifyConfigTestOptions,
): Promise<AppFastifyConfigTestResponse> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule.register({
        envModule: EnvConfigServiceModule.forRoot({
          envFilePath: ['.env.test'],
        }),
      }),
    ],
  })
    .overrideProvider(Providers.BROKER_SERVICE) // or the token you use for ClientProxy
    .useValue({
      emit: options?.emitMock || jest.fn(),
    })
    .compile();

  const fastifyApp = module.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  await applyGlobalConfigs(fastifyApp);

  await fastifyApp.init();

  await fastifyApp.getHttpAdapter().getInstance().ready();

  return { fastifyApp, module };
}
