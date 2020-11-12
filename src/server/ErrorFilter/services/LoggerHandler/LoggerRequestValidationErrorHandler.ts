import stringify from 'json-stringify-safe';
import { Injectable } from '@nestjs/common';

import { LoggerService } from '@server/Logger/services/LoggerService';
import { ILoggerHandler } from '@server/ErrorFilter/interfaces/ILoggerHandler';
import { SystemValidationError } from '@server/SystemValidationError/dto/SystemValidationError';

@Injectable()
export class LoggerRequestValidationErrorHandler implements ILoggerHandler {
  public constructor(private readonly loggerService: LoggerService) {}

  public async handle(err: SystemValidationError): Promise<void> {
    await this.loggerService.warning('Validation error', {
      extra: {
        validationErrors: stringify(err),
      },
    });
  }
}
