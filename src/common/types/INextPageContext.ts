import { NextPageContext } from 'next';
import { Store } from 'redux';

import { IRootState } from '@common/redux/store';
import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

export type INextPageContext = NextPageContext & {
  store: Store<IRootState>;
  query: IBasePageResponse;
};
