import { Response } from 'express';
import { Injectable } from '@nestjs/common';

import { IRestHandler } from '@server/ErrorFilter/interfaces/IRestHandler';
import { LoggerSystemErrorHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerSystemErrorHandler';
import { StatusCodeResolver } from '@server/ErrorFilter/services/StatusCodeResolver';
import { ErrorDtoFactory } from '@server/ErrorFilter/factories/ErrorDtoFactory';
import { SystemError } from '@server/SystemError/dto/SystemError';

@Injectable()
export class RestSystemErrorHandler implements IRestHandler {
  public constructor(
    private readonly loggerSystemErrorHandler: LoggerSystemErrorHandler,
    private readonly statusCodeResolver: StatusCodeResolver,
    private readonly errorDtoFactory: ErrorDtoFactory,
  ) {}

  public async handle(err: SystemError, res: Response): Promise<void> {
    await this.loggerSystemErrorHandler.handle(err);

    res.status(this.statusCodeResolver.resolve(err.getSystemCode()));
    res.json(
      this.errorDtoFactory
        .create(
          err,
          err.getSystemCode(),
          err.getMessage(),
          err.getSystemAdditionalData(),
        )
        .normalize(),
    );
  }
}
