import Axios, { AxiosInstance } from 'axios';

import { ErrorNextBody } from '@common/api/dto/ErrorNext/ErrorNextBody';
import { ErrorNextRoute } from '@server/ErrorNext/enums/ErrorNextRoute';
import { ErrorNextItem } from '@common/api/dto/ErrorNext/ErrorNextItem';
import { APP_PUBLIC_URL } from '@common/utils/constants';

const ERROR_SENDING_TIMEOUT = 1_000;

export class ApiErrorNext {
  private readonly axios: AxiosInstance;

  private errors: ErrorNextItem[] = [];

  private readonly baseUrl = APP_PUBLIC_URL;

  public constructor() {
    this.axios = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setInterval(async () => {
      try {
        if (this.errors.length === 0) {
          return;
        }

        await this.axios.post<ErrorNextBody>(ErrorNextRoute.SEND_ERROR, {
          errors: this.errors,
        });

        this.errors = [];
      } catch {
        //
      }
    }, ERROR_SENDING_TIMEOUT);
  }

  public sendError({ name, message, stack }: Error): void {
    this.errors.push({
      name: name || 'Unknown error',
      message: message || '',
      stack,
    });
  }
}

export const apiErrorNext = new ApiErrorNext();
