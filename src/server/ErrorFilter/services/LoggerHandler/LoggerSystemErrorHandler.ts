import { Injectable } from '@nestjs/common';

import { SystemError } from '@server/SystemError/dto/SystemError';
import { LoggerService } from '@server/Logger/services/LoggerService';
import { ILoggerHandler } from '@server/ErrorFilter/interfaces/ILoggerHandler';

@Injectable()
export class LoggerSystemErrorHandler implements ILoggerHandler {
  public constructor(private readonly loggerService: LoggerService) {}

  public async handle(err: SystemError): Promise<void> {
    await this.loggerService.notice('System error has been occurred', {
      extra: {
        systemError: {
          code: err.getSystemCode(),
          message: err.getMessage(),
          additionalData: err.getSystemAdditionalData(),
        },
      },
    });
  }
}
