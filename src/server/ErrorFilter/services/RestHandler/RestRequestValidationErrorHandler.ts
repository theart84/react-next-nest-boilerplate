import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import stringify from 'json-stringify-safe';
import { ValidationError } from 'class-validator';

import { LoggerRequestValidationErrorHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerRequestValidationErrorHandler';
import { StatusCodeResolver } from '@server/ErrorFilter/services/StatusCodeResolver';
import { ErrorDtoFactory } from '@server/ErrorFilter/factories/ErrorDtoFactory';
import { IRestHandler } from '@server/ErrorFilter/interfaces/IRestHandler';
import { SystemErrors } from '@common/enums/SystemErrors';

@Injectable()
export class RestRequestValidationErrorHandler implements IRestHandler {
  public constructor(
    private readonly loggerRequestValidationErrorHandler: LoggerRequestValidationErrorHandler,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolver,
    private readonly errorDtoFactory: ErrorDtoFactory,
  ) {}

  public async handle(err: ValidationError[], res: Response): Promise<void> {
    await this.loggerRequestValidationErrorHandler.handle(err);

    const dto = this.errorDtoFactory.create(
      err,
      SystemErrors.REST_VALIDATION_ERROR,
      'Validation error',
    );

    res.status(
      this.systemErrorStatusCodeResolver.resolve(
        SystemErrors.REST_VALIDATION_ERROR,
      ),
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
