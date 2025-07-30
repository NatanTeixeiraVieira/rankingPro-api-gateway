import { ExceptionFiltersModule } from './infra/exception-filters/exception-filters.module';
import { LoggerModule } from './infra/logger/logger.module';
import { Module } from '@nestjs/common';
import { EnvConfigServiceModule } from './infra/env-config-service/env-config.module';
import { AppController } from './infra/controllers/app.controller';

@Module({
  imports: [
    ExceptionFiltersModule,
    LoggerModule,
    EnvConfigServiceModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
