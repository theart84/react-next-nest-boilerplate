import { Page } from '@common/enums/Page';

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
