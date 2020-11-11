import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { AnyObject } from 'immer/dist/types/types-internal';

import { ApiResponse, IData } from '@common/api/ApiResponse';
import { ApiError } from '@common/api/ApiError';

export abstract class ApiServiceBase {
  private readonly axios: AxiosInstance;

  protected constructor() {
    this.axios = Axios.create({
      baseURL: '/',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  protected get<Response extends AnyObject>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<Response>> {
    return this.response<Response>(this.axios.get(url, config));
  }

  protected post<
    Request extends AnyObject,
    Response extends AnyObject = AnyObject
  >(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<Response>> {
    return this.response<Response>(this.axios.post(url, data, config));
  }

  protected put<
    Request extends AnyObject,
    Response extends AnyObject = AnyObject
  >(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<Response>> {
    return this.response<Response>(this.axios.put(url, data, config));
  }

  protected patch<
    Request extends AnyObject,
    Response extends AnyObject = AnyObject
  >(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<Response>> {
    return this.response<Response>(this.axios.patch(url, data, config));
  }

  protected delete<Response extends AnyObject = AnyObject>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<Response>> {
    return this.response<Response>(this.axios.delete(url, config));
  }

  private response<Response extends AnyObject>(
    promise: AxiosPromise<IData<Response>>,
  ): Promise<ApiResponse<Response>> {
    return this.createResponseFromAxios<Response>(promise);
  }

  // eslint-disable-next-line class-methods-use-this
  private isApiResponseType<Response extends IData<AnyObject>>(
    response: Response,
  ): boolean {
    return (
      response &&
      Number.isInteger(response.code) &&
      typeof response.message === 'string' &&
      typeof response.payload === 'object' &&
      (response.location === undefined || typeof response.location === 'string')
    );
  }

  private transformResponse<Response extends AnyObject>(
    response: AxiosResponse<IData<Response>>,
  ): ApiResponse<Response> | never {
    const { data } = response;

    if (this.isApiResponseType(data)) {
      return new ApiResponse(data);
    }

    throw new TypeError(
      `Server returned invalid data: ${JSON.stringify(response)}`,
    );
  }

  private async createResponseFromAxios<T extends AnyObject>(
    promise: AxiosPromise<IData<T>>,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await promise;

      return this.transformResponse(response);
    } catch (error) {
      if ('isAxiosError' in error && 'response' in error) {
        throw new ApiError(
          this.transformResponse((error as AxiosError).response),
        );
      }

      throw error;
    }
  }
}
