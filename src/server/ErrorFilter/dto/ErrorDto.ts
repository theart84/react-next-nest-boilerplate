/* eslint
@typescript-eslint/no-explicit-any: off,
@typescript-eslint/no-unsafe-return: off,
@typescript-eslint/explicit-module-boundary-types: off
*/
import { get } from 'lodash';

import { ErrorCode } from '@common/enums/ErrorCode';
import { IData } from '@common/api/ApiResponse';

export class ErrorDto implements IData {
  public constructor(private error: any, private allowStack?: boolean) {}

  public code!: ErrorCode;

  public payload: any;

  public message!: string;

  public normalize(): IData {
    return {
      code: this.code,
      payload: this.payload,
      message: this.message,
      stack: this.allowStack ? get(this.error, 'stack') : undefined,
    };
  }
}
