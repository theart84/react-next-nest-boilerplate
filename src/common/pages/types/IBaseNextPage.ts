import { NextPage } from 'next';

import { Pages } from '@common/enums/Pages';
import { IPageResponse } from '@common/pages/types/IPageResponse';
import { INextPageContext } from '@common/pages/types/INextPageContext';
import { IPageApiServicesInstance } from '@common/pages/utils/getPageApiService';
import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';

export type IBaseNextPage<
  Page extends Pages = Pages,
  CustomComponentParams extends Record<string, unknown> | undefined = undefined
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
    CustomComponentParams extends Record<string, unknown>
      ? CustomComponentParams
      : IPageResponse[Page]['page'] extends undefined
      ? void
      : IPageResponse[Page]['page']
  >;
};
