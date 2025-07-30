import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from 'src/application/env-config-service/env-config.service';
import { EnvConfigServiceModule } from '../../../env-config.module';
import { Test, TestingModule } from '@nestjs/testing';
import { NestjsEnvConfigService } from '../../nestjs-env-config.service';
import { Providers } from '@/application/constants/providers';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigServiceModule.forRoot({ envFilePath: ['.env.test'] })],
      providers: [
        {
          provide: Providers.ENV_CONFIG_SERVICE,
          useFactory: (configService: ConfigService) => {
            return new NestjsEnvConfigService(configService);
          },
          inject: [ConfigService],
        },
      ],
    }).compile();

    sut = module.get<EnvConfigService>(Providers.ENV_CONFIG_SERVICE);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the variable PORT', () => {
    expect(sut.getPort()).toBe(3334);
  });

  it('should return the variable RABBITMQ_USER', () => {
    expect(sut.getBrokerUser()).toBe('rmquser');
  });

  it('should return the variable RABBITMQ_PASSWORD', () => {
    expect(sut.getBrokerPassword()).toBe('rmqpassword');
  });

  it('should return the variable RABBITMQ_HOST', () => {
    expect(sut.getBrokerHost()).toBe('localhost:5672');
  });
});
