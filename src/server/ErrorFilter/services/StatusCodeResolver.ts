import { HttpStatus, Injectable } from '@nestjs/common';
import { has } from 'lodash';

import { SystemErrors } from '@common/enums/SystemErrors';

@Injectable()
export class StatusCodeResolver {
  private readonly mapping = {
    [SystemErrors.ROUTE_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [SystemErrors.REST_VALIDATION_ERROR]: HttpStatus.UNPROCESSABLE_ENTITY,
    default: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  public resolve(systemErrorCode: SystemErrors): number {
    return (has(this.mapping, systemErrorCode)
      ? this.mapping[systemErrorCode]
      : this.mapping.default) as number;
  }
}
