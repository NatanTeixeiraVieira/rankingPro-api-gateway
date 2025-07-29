export interface EnvConfigService {
  getPort(): number;
  getBrokerUser(): string;
  getBrokerPassword(): string;
  getBrokerHost(): string;
}
