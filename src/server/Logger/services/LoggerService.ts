import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger } from 'winston';
import * as StackTrace from 'stacktrace-js';
import stringifySafe from 'json-stringify-safe';
import moment from 'moment';

import { LoggerChannel } from '@server/Logger/enums/LoggerChannel';
import { ILoggerOptions } from '@server/Logger/interfaces/ILoggerOptions';
import { LoggerLevel } from '@server/Logger/enums/LoggerLevel';
import { ILoggerContext } from '@server/Logger/interfaces/ILoggerContext';

@Injectable()
export class LoggerService {
  private defaultChannel = LoggerChannel.APPLICATION;

  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  public getDefaultChannel(): LoggerChannel {
    return this.defaultChannel;
  }

  public setDefaultChannel(channel: LoggerChannel): this {
    this.defaultChannel = channel;

    return this;
  }

  public async debug(message: string, options?: ILoggerOptions): Promise<void> {
    await this.log(message, {
      ...options,
      level: LoggerLevel.DEBUG,
    });
  }

  public async info(message: string, options?: ILoggerOptions): Promise<void> {
    await this.log(message, {
      ...options,
      level: LoggerLevel.INFO,
    });
  }

  public async notice(
    message: string,
    options?: ILoggerOptions,
  ): Promise<void> {
    await this.log(message, {
      ...options,
      level: LoggerLevel.NOTICE,
    });
  }

  public async warning(
    message: string,
    options?: ILoggerOptions,
  ): Promise<void> {
    await this.log(message, {
      ...options,
      level: LoggerLevel.WARNING,
    });
  }

  public async error(message: string, options?: ILoggerOptions): Promise<void> {
    await this.log(message, {
      isWithStackTrace: true,
      ...options,
      level: LoggerLevel.ERROR,
    });
  }

  public async critical(
    message: string,
    options?: ILoggerOptions,
  ): Promise<void> {
    await this.log(message, {
      isWithStackTrace: true,
      ...options,
      level: LoggerLevel.CRITICAL,
    });
  }

  public async alert(message: string, options?: ILoggerOptions): Promise<void> {
    await this.log(message, {
      isWithStackTrace: true,
      ...options,
      level: LoggerLevel.ALERT,
    });
  }

  public async emergency(
    message: string,
    options?: ILoggerOptions,
  ): Promise<void> {
    await this.log(message, {
      isWithStackTrace: true,
      ...options,
      level: LoggerLevel.EMERGENCY,
    });
  }

  private async log(message: string, options?: ILoggerOptions): Promise<void> {
    const { isWithStackTrace = false, level, channel, extra } = {
      ...options,
      level: options?.level || LoggerLevel.INFO,
      channel: options?.channel || this.getDefaultChannel(),
      extra: options?.extra,
    };

    let context: ILoggerContext | undefined;

    if (isWithStackTrace) {
      context = {
        stackTrace: await StackTrace.get(),
      };
    }

    const dateTimeFormatted = moment().format('YYYY-MM-DD HH:mm:ss');

    const extraJSON = stringifySafe(extra);

    const contextJSON = stringifySafe(context);

    this.logger.info(
      `[${dateTimeFormatted}] ${channel}.${level} message: ${message} context: ${contextJSON} extra: ${extraJSON}`,
    );
  }
}
