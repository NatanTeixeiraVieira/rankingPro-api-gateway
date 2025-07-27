import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from 'src/application/env-config-service/env-config.service';

export class NestjsEnvConfigService implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return Number(this.configService.get<string>('PORT') as string);
  }
}
