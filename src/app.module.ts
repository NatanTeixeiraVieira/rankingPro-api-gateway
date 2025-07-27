import { Module } from '@nestjs/common';
import { EnvConfigServiceModule } from './infra/env-config/env-config.module';

@Module({
  imports: [EnvConfigServiceModule],
})
export class AppModule {}
