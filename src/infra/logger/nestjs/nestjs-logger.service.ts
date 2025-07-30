import { LoggerService } from '@/application/logger/logger.service';
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class NestjsLoggerService
  extends ConsoleLogger
  implements LoggerService {}
