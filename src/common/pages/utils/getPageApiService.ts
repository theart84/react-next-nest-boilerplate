import { ApiSamplePage } from '@common/api/pages/ApiSamplePage';
import { Pages } from '@common/enums/Pages';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { ApiInfoPage } from '@common/api/pages/ApiInfoPage';

type IPageApiServicesBase = {
  [key in Pages]?: typeof ApiPageBase;
};

type IPageApiServicesInstanceBase = {
  [key in Pages]?: ApiPageBase;
};

const pagesApiServices: IPageApiServicesBase = {
  [Pages.SAMPLE]: ApiSamplePage,
  [Pages.SAMPLE_TEST]: ApiSamplePage,
  [Pages.INFO]: ApiInfoPage,
};

export interface IPageApiServicesInstance extends IPageApiServicesInstanceBase {
  [Pages.SAMPLE]: ApiSamplePage;
  [Pages.SAMPLE_TEST]: ApiSamplePage;
  [Pages.INFO]: ApiInfoPage;
}

export const getPageApiService = <T extends Pages>(
  page: T,
): typeof pagesApiServices[T] => pagesApiServices[page];
