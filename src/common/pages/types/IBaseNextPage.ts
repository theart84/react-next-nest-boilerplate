import { NextPage } from 'next';

import { Pages } from '@common/enums/Pages';
import { IPageResponse } from '@common/pages/types/IPageResponse';
import { INextPageContext } from '@common/pages/types/INextPageContext';
import { IPageApiServicesInstance } from '@common/pages/utils/getPageApiService';
import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';

export type IBaseNextPage<
  Page extends Pages = Pages,
  CustomComponentParams = Record<string, unknown>
> = NextPage<
  IPageResponse[Page] extends IBasePageResponse
    ? IPageResponse[Page]['page']
    : CustomComponentParams
> & {
  init?(
    context: INextPageContext<
      IPageResponse[Page],
      IPageApiServicesInstance[Page]
    >,
  ): Promise<
    IPageResponse[Page] extends IBasePageResponse
      ? IPageResponse[Page]['page']
      : CustomComponentParams
  >;
};
