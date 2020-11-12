import { HttpStatus, Injectable } from '@nestjs/common';
import { has } from 'lodash';

import { ErrorCodes } from '@common/enums/ErrorCodes';

@Injectable()
export class StatusCodeResolver {
  private readonly mapping = {
    [ErrorCodes.ROUTE_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCodes.REST_VALIDATION_ERROR]: HttpStatus.UNPROCESSABLE_ENTITY,
    default: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  public resolve(systemErrorCode: ErrorCodes): number {
    return (has(this.mapping, systemErrorCode)
      ? this.mapping[systemErrorCode]
      : this.mapping.default) as number;
  }
}
