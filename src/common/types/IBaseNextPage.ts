import { NextPage } from 'next';

import { Page } from '@common/enums/Page';
import { IPageResponse } from '@common/api/types/IPageResponse';
import { Feature } from '@common/enums/Feature';

export type IBaseNextPage<PageName extends Page = Page> = NextPage<
  IPageResponse[PageName]['page']
> & {
  features?: Feature[];
  page: Page;
};
