import { Mutable } from '@/application/types/utils';
import { CreateCategoryDto } from '@/infra/dtos/create-category.dto';
import { appFastifyConfigTest } from '@/infra/testing/e2e/app-config-test';
import { HttpStatus } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';

describe('AppController createCategory e2e tests', () => {
  let app: NestFastifyApplication;
  let createCategoryDto: Omit<Partial<Mutable<CreateCategoryDto>>, 'events'> & {
    events?: Mutable<Partial<CreateCategoryDto['events'][number]>>[];
  };
  const url = '/api/v1/category';
  const emitMock = jest.fn();

  beforeAll(async () => {
    const { fastifyApp } = await appFastifyConfigTest({ emitMock });
    app = fastifyApp;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    createCategoryDto = {
      category: 'D',
      description: 'Categoria D',
      events: [
        {
          name: 'VICTORY',
          operation: '+',
          value: 20,
        },
        {
          name: 'VICTORY_LEADER',
          operation: '+',
          value: 40,
        },
        {
          name: 'DEFEAT',
          operation: '+',
          value: 0,
        },
      ],
    };
  });

  it('should return 201 for valid DTO', async () => {
    await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(201);
  });

  it('should fail if category is missing', async () => {
    delete createCategoryDto.category;

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto);
    console.log('🚀 ~ res:', res.body);
    // .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(res.body.error).toStrictEqual({
      message: ['category should not be empty', 'category must be a string'],
      error: 'Unprocessable Entity',
      statusCode: 422,
    });
  });

  it('should fail if category is not string', async () => {
    createCategoryDto.category = 123 as any;

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(res.body.error).toStrictEqual({
      message: ['category must be a string'],
      error: 'Unprocessable Entity',
      statusCode: 422,
    });

    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if description is missing', async () => {
    delete createCategoryDto.description;

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(res.body.error.message).toEqual(
      expect.arrayContaining([
        'description should not be empty',
        'description must be a string',
      ]),
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if description is not string', async () => {
    createCategoryDto.description = 123 as any;

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(res.body.error.message).toEqual(
      expect.arrayContaining(['description must be a string']),
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if events is missing', async () => {
    delete createCategoryDto.events;

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(res.body.error.message).toEqual(
      expect.arrayContaining([
        'events must contain at least 1 elements',
        'events must be an array',
      ]),
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if events is empty', async () => {
    createCategoryDto.events = [];

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(res.body.error.message).toEqual(
      expect.arrayContaining(['events must contain at least 1 elements']),
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.name is missing', async () => {
    if (createCategoryDto.events) {
      delete createCategoryDto.events[0].name;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'name should not be empty',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.name is not string', async () => {
    if (createCategoryDto.events) {
      createCategoryDto.events[0].name = 123 as any;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'events.0.name must be a string',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.operation is missing', async () => {
    if (createCategoryDto.events) {
      delete createCategoryDto.events[0].operation;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'events.0.operation must be a string',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.operation is not string', async () => {
    if (createCategoryDto.events) {
      createCategoryDto.events[0].operation = 123 as any;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'events.0.operation must be a string',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.value is missing', async () => {
    if (createCategoryDto.events) {
      delete createCategoryDto.events[0].value;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'value should not be empty',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.value is negative', async () => {
    if (createCategoryDto.events) {
      createCategoryDto.events[0].value = -1;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'value must not be less than 0',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.value is not number', async () => {
    if (createCategoryDto.events) {
      createCategoryDto.events[0].value = 'testText' as any;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'value must not be less than 0',
    );
    expect(res.body.error.statusCode).toBe(422);
  });

  it('should fail if event.value is not int', async () => {
    if (createCategoryDto.events) {
      createCategoryDto.events[0].value = 10.5;
    }

    const res = await request(app.getHttpServer())
      .post(url)
      .send(createCategoryDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(JSON.stringify(res.body.error.message)).toContain(
      'events.0.value must be an integer number',
    );
    expect(res.body.error.statusCode).toBe(422);
  });
});
