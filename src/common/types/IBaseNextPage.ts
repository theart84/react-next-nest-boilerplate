import { NextPage } from 'next';

import { Page } from '@common/enums/Page';
import { IPageResponse } from '@common/api/types/IPageResponse';
import { INextPageContext } from '@common/types/INextPageContext';
import { IPageApiServicesInstance } from '@common/api/utils/getPageApiService';
import { IBasePageResponse } from '@common/types/IBasePageResponse';

export type IBaseNextPage<
  PageName extends Page = Page,
  CustomComponentParams extends Record<string, unknown> | undefined = undefined
> = NextPage<
  IPageResponse[PageName] extends IBasePageResponse
    ? IPageResponse[PageName]['page']
    : CustomComponentParams
> & {
  init?(
    context: INextPageContext<
      IPageResponse[PageName],
      IPageApiServicesInstance[PageName]
    >,
  ): Promise<
    CustomComponentParams extends Record<string, unknown>
      ? CustomComponentParams
      : IPageResponse[PageName]['page'] extends undefined
      ? void
      : IPageResponse[PageName]['page']
  > | void;
};
