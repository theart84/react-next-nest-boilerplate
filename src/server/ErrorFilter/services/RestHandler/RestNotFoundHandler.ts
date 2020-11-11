import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import stringify from 'json-stringify-safe';

import { IRestHandler } from '@server/ErrorFilter/interfaces/IRestHandler';
import { LoggerNotFoundHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerNotFoundHandler';
import { StatusCodeResolver } from '@server/ErrorFilter/services/StatusCodeResolver';
import { ErrorDtoFactory } from '@server/ErrorFilter/factories/ErrorDtoFactory';
import { SystemErrors } from '@common/enums/SystemErrors';

@Injectable()
export class RestNotFoundHandler implements IRestHandler {
  public constructor(
    private readonly loggerNotFoundService: LoggerNotFoundHandler,
    private readonly statusCodeResolver: StatusCodeResolver,
    private readonly errorDtoFactory: ErrorDtoFactory,
  ) {}

  public async handle(err: Error, res: Response): Promise<void> {
    await this.loggerNotFoundService.handle(err);

    const dto = this.errorDtoFactory.create(
      err,
      SystemErrors.ROUTE_NOT_FOUND,
      'Not found',
    );

    res.status(this.statusCodeResolver.resolve(SystemErrors.ROUTE_NOT_FOUND));
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify(dto.normalize()));
  }
}
