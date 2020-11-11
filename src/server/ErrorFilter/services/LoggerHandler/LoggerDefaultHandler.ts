import stringify from 'json-stringify-safe';
import { Injectable } from '@nestjs/common';

import { LoggerService } from '@server/Logger/services/LoggerService';
import { ILoggerHandler } from '@server/ErrorFilter/interfaces/ILoggerHandler';

@Injectable()
export class LoggerDefaultHandler implements ILoggerHandler {
  public constructor(private readonly loggerService: LoggerService) {}

  public async handle(err: Error): Promise<void> {
    await this.loggerService.critical('Unknown error has occurred', {
      extra: {
        error: stringify(err),
      },
    });
  }
}
