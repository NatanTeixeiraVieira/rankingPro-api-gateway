import { Module } from '@nestjs/common';
import { EnvConfigServiceModule } from './infra/env-config-service/env-config.module';
import { AppController } from './infra/controllers/app.controller';

@Module({
  imports: [EnvConfigServiceModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
