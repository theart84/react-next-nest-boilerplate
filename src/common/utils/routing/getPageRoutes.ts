import { Page } from '@common/enums/Page';
import { API_PAGE_PREFIX } from '@common/utils/constants';

interface IPageRoute {
  route: string;
}

type IPagesRoutes = {
  [key in Page]: IPageRoute;
};

const pagesRoutes: IPagesRoutes = {
  [Page.INDEX]: {
    route: '/',
  },
  [Page.SAMPLE]: {
    route: '/sample',
  },
  [Page.SAMPLE_TEST]: {
    route: '/sample/test',
  },
  [Page.INFO]: {
    route: '/info',
  },
};

export const getPageRoute = <PageName extends Page>(
  page: PageName,
): IPagesRoutes[PageName]['route'] => pagesRoutes[page].route;

export const getApiRoute = (route: string): string =>
  `${API_PAGE_PREFIX}${route}`;

export const getApiPageRoute = (page: Page): string =>
  getApiRoute(getPageRoute(page));
