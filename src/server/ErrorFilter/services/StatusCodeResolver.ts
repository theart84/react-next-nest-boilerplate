import { HttpStatus, Injectable } from '@nestjs/common';
import { has } from 'lodash';

import { ErrorCode } from '@common/enums/ErrorCode';

@Injectable()
export class StatusCodeResolver {
  private readonly mapping = {
    [ErrorCode.ROUTE_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCode.REST_VALIDATION_ERROR]: HttpStatus.UNPROCESSABLE_ENTITY,
    [ErrorCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
    default: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  public resolve(systemErrorCode: ErrorCode): number {
    return (has(this.mapping, systemErrorCode)
      ? this.mapping[systemErrorCode]
      : this.mapping.default) as number;
  }
}
