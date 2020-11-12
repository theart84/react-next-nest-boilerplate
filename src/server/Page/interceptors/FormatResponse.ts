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

import { Pages } from '@common/enums/Pages';
import { IData } from '@common/api/ApiResponse';

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
        map(
          (payload): IData => ({
            code: HttpStatus.OK,
            message: '',
            payload,
          }),
        ),
      );
    }

    return next
      .handle()
      .pipe(map((payload) => response.render(this.pageFileName, payload)));
  }
}
