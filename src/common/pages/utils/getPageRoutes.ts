import { Pages } from '@common/enums/Pages';

interface IPageRoute {
  route: string;
}

type IPagesRoutes = {
  [key in Pages]: IPageRoute;
};

const pagesRoutes: IPagesRoutes = {
  [Pages.INDEX]: {
    route: '/',
  },
  [Pages.SAMPLE]: {
    route: '/sample',
  },
  [Pages.SAMPLE_TEST]: {
    route: '/sample/test',
  },
  [Pages.INFO]: {
    route: '/info',
  },
};

export const getPageRoute = <T extends Pages>(
  page: T,
): IPagesRoutes[T]['route'] => pagesRoutes[page].route;
