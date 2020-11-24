import { ApiSamplePage } from '@common/api/services/Page/ApiSamplePage';
import { Page } from '@common/enums/Page';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { ApiInfoPage } from '@common/api/services/Page/ApiInfoPage';

type IPageApiServicesInstanceBase = {
  [key in Page]?: ApiPageBase;
};

export interface IPageApiServicesInstance extends IPageApiServicesInstanceBase {
  [Page.SAMPLE]: ApiSamplePage;
  [Page.SAMPLE_TEST]: ApiSamplePage;
  [Page.INFO]: ApiInfoPage;
}

const pagesApiServices: IPageApiServicesInstance = {
  [Page.SAMPLE]: new ApiSamplePage(),
  [Page.SAMPLE_TEST]: new ApiSamplePage(),
  [Page.INFO]: new ApiInfoPage(),
};

export const getPageApiService = <PageName extends Page>(
  page: PageName,
): IPageApiServicesInstance[PageName] => pagesApiServices[page];
