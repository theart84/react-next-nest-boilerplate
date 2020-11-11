import stringify from 'json-stringify-safe';
import { Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { LoggerService } from '@server/Logger/services/LoggerService';
import { ILoggerHandler } from '@server/ErrorFilter/interfaces/ILoggerHandler';

@Injectable()
export class LoggerRequestValidationErrorHandler implements ILoggerHandler {
  public constructor(private readonly loggerService: LoggerService) {}

  public async handle(err: ValidationError[]): Promise<void> {
    await this.loggerService.warning('Validation error', {
      extra: {
        validationErrors: stringify(err),
      },
    });
  }
}
