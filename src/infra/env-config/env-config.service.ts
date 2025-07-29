import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from 'src/application/env-config-service/env-config.service';

export class NestjsEnvConfigService implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getBrokerUser(): string {
    return this.configService.get<string>('RABBITMQ_USER') as string;
  }

  getBrokerPassword(): string {
    return this.configService.get<string>('RABBITMQ_PASSWORD') as string;
  }

  getBrokerHost(): string {
    return this.configService.get<string>('RABBITMQ_HOST') as string;
  }

  getPort(): number {
    return Number(this.configService.get<string>('PORT') as string);
  }
}
