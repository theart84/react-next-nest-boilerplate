import { LoggerLevel } from '@server/Logger/enums/LoggerLevel';
import { LoggerChannel } from '@server/Logger/enums/LoggerChannel';

export interface ILoggerOptions {
  level?: LoggerLevel;
  channel?: LoggerChannel;
  extra?: Record<string, unknown>;
  isWithStackTrace?: boolean;
}
