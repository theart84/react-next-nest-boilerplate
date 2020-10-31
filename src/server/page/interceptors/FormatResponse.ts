import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

import { Pages } from '@common/enums/Pages';

@Injectable()
export class FormatResponse implements NestInterceptor {
  public constructor(private readonly pageFileName: Pages) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const isApi = !!request.params.api;

    if (isApi) {
      return next.handle().pipe(
        map((payload) => ({
          code: 200,
          message: '',
          payload,
        })),
      );
    }

    return next
      .handle()
      .pipe(map((payload) => response.render(this.pageFileName, payload)));
  }
}
