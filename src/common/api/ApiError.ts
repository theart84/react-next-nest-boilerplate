import { AnyObject } from 'immer/dist/types/types-internal';

import { ApiResponse } from '@common/api/ApiResponse';

export class ApiError<T extends AnyObject> extends Error {
  public response?: ApiResponse<T>;

  public constructor(response?: ApiResponse<T>, message?: string) {
    super(message);

    this.response = response;
  }
}
