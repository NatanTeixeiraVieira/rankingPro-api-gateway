import { Module } from '@nestjs/common';
import { EnvConfigServiceModule } from './infra/env-config/env-config.module';
import { AppController } from './infra/controllers/app.controller';

@Module({
  imports: [EnvConfigServiceModule],
  controllers: [AppController],
})
export class AppModule {}
