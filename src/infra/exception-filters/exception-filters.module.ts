import { Module } from '@nestjs/common';
import { AllExceptionFilter } from './http-exception.filter';

@Module({
  providers: [AllExceptionFilter],
})
export class ExceptionFiltersModule {}
