import {
  ExceptionFilter,
  ArgumentsHost,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { RenderFilter } from 'nest-next';

import { RestSystemErrorHandler } from '@server/ErrorFilter/services/RestHandler/RestSystemErrorHandler';
import { RestNotFoundHandler } from '@server/ErrorFilter/services/RestHandler/RestNotFoundHandler';
import { RestDefaultHandler } from '@server/ErrorFilter/services/RestHandler/RestDefaultHandler';
import { RestRequestValidationErrorHandler } from '@server/ErrorFilter/services/RestHandler/RestRequestValidationErrorHandler';
import { SystemError } from '@server/SystemError/dto/SystemError';
import { SystemValidationError } from '@server/SystemValidationError/dto/SystemValidationError';

@Injectable()
export class ErrorFilter implements ExceptionFilter {
  private renderFilter: RenderFilter;

  public constructor(
    private readonly systemErrorHandler: RestSystemErrorHandler,
    private readonly notFoundHandler: RestNotFoundHandler,
    private readonly defaultHandler: RestDefaultHandler,
    private readonly requestValidationErrorHandler: RestRequestValidationErrorHandler,
  ) {}

  public setRenderFilter(renderFilter: RenderFilter): void {
    this.renderFilter = renderFilter;
  }

  public async catch(error: Error, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (req.path.includes('_next')) {
      // eslint-disable-next-line promise/no-promise-in-callback, promise/valid-params
      await this.renderFilter.catch(error, host);

      return;
    }

    if (error instanceof SystemError) {
      await this.systemErrorHandler.handle(error, res);

      return;
    }

    if (error instanceof NotFoundException) {
      await this.notFoundHandler.handle(error, res);

      return;
    }

    if (error instanceof SystemValidationError) {
      await this.requestValidationErrorHandler.handle(error, res);

      return;
    }

    await this.defaultHandler.handle(error, res);
  }
}
