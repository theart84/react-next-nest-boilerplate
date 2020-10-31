import { NextPageContext } from 'next';
import { Store } from 'redux';

import { IRootState } from '@common/redux/store';
import { ApiPageBase } from '@common/api/ApiPageBase';

export type INextPageContext<
  Response extends Record<keyof unknown, unknown> = unknown,
  ApiPageService extends ApiPageBase = undefined
> = NextPageContext & {
  store: Store<IRootState>;
  isServer: boolean;
  apiService?: ApiPageService;
  query: Response;
};
