import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

import { Page } from '@common/enums/Page';
import { IData } from '@common/api/ApiResponse';

@Injectable()
export class FormatResponse implements NestInterceptor {
  public constructor(private readonly pageFileName: Page) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const isApi = !!request.params.api;

    if (isApi) {
      return next.handle().pipe(
        map(
          (payload): IData => ({
            code: HttpStatus.OK,
            message: '',
            payload: payload || {},
          }),
        ),
      );
    }

    return next.handle().pipe(
      map(async (payload) => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await response.render(this.pageFileName, payload);

        // https://github.com/kyle-mccarthy/nest-next/issues/67#issuecomment-731663345
        await new Promise<void>((resolve) => process.nextTick(resolve));
      }),
    );
  }
}
