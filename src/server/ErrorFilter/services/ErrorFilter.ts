/* eslint
@typescript-eslint/explicit-module-boundary-types: off,
@typescript-eslint/no-explicit-any: off,
@typescript-eslint/no-unsafe-member-access: off
*/
import { ExceptionFilter, ArgumentsHost, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

import { RestSystemErrorHandler } from '@server/ErrorFilter/services/RestHandler/RestSystemErrorHandler';
import { RestNotFoundHandler } from '@server/ErrorFilter/services/RestHandler/RestNotFoundHandler';
import { RestDefaultHandler } from '@server/ErrorFilter/services/RestHandler/RestDefaultHandler';
import { RestRequestValidationErrorHandler } from '@server/ErrorFilter/services/RestHandler/RestRequestValidationErrorHandler';
import { NodeEnvs } from '@common/enums/NodeEnvs';
import { SystemError } from '@server/SystemError/dto/SystemError';

@Injectable()
export class ErrorFilter implements ExceptionFilter {
  public constructor(
    private readonly systemErrorHandler: RestSystemErrorHandler,
    private readonly notFoundHandler: RestNotFoundHandler,
    private readonly defaultHandler: RestDefaultHandler,
    private readonly requestValidationErrorHandler: RestRequestValidationErrorHandler,
  ) {}

  public async catch(err: any, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();

    const req = ctx.getRequest<Request>();

    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === NodeEnvs.DEVELOPMENT ? err : {};

    if (err.name === 'SystemError') {
      await this.systemErrorHandler.handle(err as SystemError, res);
    } else if (err.message.error === 'Not Found') {
      await this.notFoundHandler.handle(err as Error, res);
    } else if (
      Array.isArray(err.message.message) &&
      err.message.message[err.message.message.length - 1] instanceof
        ValidationError
    ) {
      await this.requestValidationErrorHandler.handle(
        err as ValidationError[],
        res,
      );
    } else {
      await this.defaultHandler.handle(err as SystemError, res);
    }
  }
}
