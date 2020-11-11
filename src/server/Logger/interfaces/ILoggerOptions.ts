import { LoggerLevelEnum } from '@server/Logger/enums/LoggerLevelEnum';
import { LoggerChannelEnum } from '@server/Logger/enums/LoggerChannelEnum';

export interface ILoggerOptions {
  level?: LoggerLevelEnum;
  channel?: LoggerChannelEnum;
  extra?: Record<string, unknown>;
  isWithStackTrace?: boolean;
}
