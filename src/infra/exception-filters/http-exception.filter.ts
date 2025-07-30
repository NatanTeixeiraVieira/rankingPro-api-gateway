import { Providers } from '@/application/constants/providers';
import { LoggerService } from '@/application/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(Providers.LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    this.logger.setContext(AllExceptionFilter.name);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(`HTTP Exception: ${exception.message}`, exception.stack);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(
      `Http Status: ${status}. Error Message: ${JSON.stringify(message)}`,
    );

    response.status(status).send({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
