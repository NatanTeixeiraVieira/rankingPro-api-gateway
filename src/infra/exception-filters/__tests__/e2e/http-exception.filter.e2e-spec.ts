import {
  Controller,
  Get,
  INestApplication,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AllExceptionFilter } from '../../http-exception.filter';
import request from 'supertest';
import { ExceptionFiltersModule } from '../../exception-filters.module';
import { LoggerModule } from '@/infra/logger/logger.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

@Controller('stub')
class StubController {
  @Get('generic')
  generic() {
    throw new Error('Some error occurred');
  }

  @Get('http')
  http() {
    throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN);
  }
}

describe('AllExceptionFilter e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExceptionFiltersModule, LoggerModule],
      controllers: [StubController],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalFilters(app.get(AllExceptionFilter));
    await app.listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should catch a generic error and return 500', async () => {
    const res = await request(app.getHttpServer())
      .get('/stub/generic')
      .expect(500);

    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('path', '/stub/generic');
    expect(res.body.error).toBeInstanceOf(Object);
  });

  it('should catch an HttpException and return its status and message', async () => {
    const res = await request(app.getHttpServer())
      .get('/stub/http')
      .expect(403);
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('path', '/stub/http');
    expect(res.body.error).toBe('Forbidden!');
  });
});
