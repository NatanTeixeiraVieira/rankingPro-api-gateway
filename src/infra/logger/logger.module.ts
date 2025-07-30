import { Providers } from '@/application/constants/providers';
import { Global, Module } from '@nestjs/common';
import { NestjsLoggerService } from './nestjs/nestjs-logger.service';

@Global()
@Module({
  imports: [],
  providers: [
    { provide: Providers.LOGGER_SERVICE, useClass: NestjsLoggerService },
  ],
  exports: [Providers.LOGGER_SERVICE],
})
export class LoggerModule {}
