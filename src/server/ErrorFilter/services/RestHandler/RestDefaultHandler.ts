import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { IRestHandler } from '@server/ErrorFilter/interfaces/IRestHandler';
import { StatusCodeResolver } from '@server/ErrorFilter/services/StatusCodeResolver';
import { ErrorDtoFactory } from '@server/ErrorFilter/factories/ErrorDtoFactory';
import { ErrorCodes } from '@common/enums/ErrorCodes';
import { LoggerDefaultHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerDefaultHandler';

@Injectable()
export class RestDefaultHandler implements IRestHandler {
  public constructor(
    private readonly loggerDefaultHandler: LoggerDefaultHandler,
    private readonly statusCodeResolver: StatusCodeResolver,
    private readonly errorDtoFactory: ErrorDtoFactory,
  ) {}

  public async handle(err: Error, res: Response): Promise<void> {
    await this.loggerDefaultHandler.handle(err);

    const dto = this.errorDtoFactory.create(
      err,
      ErrorCodes.OTHER,
      'Internal error',
    );

    res.status(this.statusCodeResolver.resolve(ErrorCodes.OTHER));
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
