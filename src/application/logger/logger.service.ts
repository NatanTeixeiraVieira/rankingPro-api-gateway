export interface LoggerService {
  log(message: string): void;
  error(message: string, stack?: string): void;
  setContext(context: string): void;
}
