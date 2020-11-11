export interface ILoggerHandler {
  handle(err): Promise<void>;
}
