import { NextPageContext } from 'next';
import { Store } from 'redux';

import { IRootState } from '@common/redux/store';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { ApiErrorNext } from '@common/api/services/ErrorNext/ApiErrorNext';

export type INextPageContext<
  Response extends Record<keyof unknown, unknown> | undefined,
  ApiPageService extends ApiPageBase | undefined
> = NextPageContext & {
  store: Store<IRootState>;
  isServer: boolean;
  apiService: ApiPageService;
  query: Response;
  errorApiService: ApiErrorNext;
};
