import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { LoggerRequestValidationErrorHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerRequestValidationErrorHandler';
import { StatusCodeResolver } from '@server/ErrorFilter/services/StatusCodeResolver';
import { ErrorDtoFactory } from '@server/ErrorFilter/factories/ErrorDtoFactory';
import { IRestHandler } from '@server/ErrorFilter/interfaces/IRestHandler';
import { ErrorCode } from '@common/enums/ErrorCode';
import { SystemValidationError } from '@server/SystemValidationError/dto/SystemValidationError';

@Injectable()
export class RestRequestValidationErrorHandler implements IRestHandler {
  public constructor(
    private readonly loggerRequestValidationErrorHandler: LoggerRequestValidationErrorHandler,
    private readonly systemErrorStatusCodeResolver: StatusCodeResolver,
    private readonly errorDtoFactory: ErrorDtoFactory,
  ) {}

  public async handle(
    err: SystemValidationError,
    res: Response,
  ): Promise<void> {
    await this.loggerRequestValidationErrorHandler.handle(err);

    const dto = this.errorDtoFactory.create(
      err,
      ErrorCode.REST_VALIDATION_ERROR,
      'Validation error',
      err.getErrors(),
    );

    res.status(
      this.systemErrorStatusCodeResolver.resolve(
        ErrorCode.REST_VALIDATION_ERROR,
      ),
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
