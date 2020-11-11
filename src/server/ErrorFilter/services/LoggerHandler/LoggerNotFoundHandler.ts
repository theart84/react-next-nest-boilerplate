import stringify from 'json-stringify-safe';
import { Injectable } from '@nestjs/common';

import { LoggerService } from '@server/Logger/services/LoggerService';
import { ILoggerHandler } from '@server/ErrorFilter/interfaces/ILoggerHandler';

@Injectable()
export class LoggerNotFoundHandler implements ILoggerHandler {
  public constructor(private readonly loggerService: LoggerService) {}

  public async handle(err: Error): Promise<void> {
    await this.loggerService.notice('Not found', {
      extra: {
        error: stringify(err),
      },
    });
  }
}
