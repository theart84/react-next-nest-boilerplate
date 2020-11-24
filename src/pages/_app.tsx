import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';

import { withReduxStore } from '@common/redux/hocs/withReduxStore';
import { IRootState } from '@common/redux/store';
import { INextPageContext } from '@common/types/INextPageContext';
import { Layout } from '@components/Layout/Layout';
import { getPageApiService } from '@common/api/utils/getPageApiService';
import { Page } from '@common/enums/Page';
import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { apiErrorNext } from '@common/api/services/ErrorNext/ApiErrorNext';

export const App = ({
  Component,
  pageProps,
  reduxStore,
}: AppProps & { reduxStore: EnhancedStore<IRootState> }): JSX.Element => (
  <Provider store={reduxStore}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

App.getInitialProps = async <
  Response extends Record<keyof unknown, unknown>,
  ApiPageService extends ApiPageBase
>({
  Component,
  ctx,
}: AppContext & {
  Component: IBaseNextPage;
  ctx: Omit<
    INextPageContext<Response, ApiPageService>,
    'isServer' | 'apiService'
  >;
}): Promise<AppInitialProps> => {
  let pageProperties: unknown = {};

  if (Component.init) {
    const pageName = ctx.pathname.replace('/views/', '');

    const apiService = getPageApiService(pageName as Page);

    pageProperties = await Component.init({
      ...ctx,
      isServer: !!ctx.req,
      apiService,
      errorApiService: apiErrorNext,
    });
  }

  return {
    pageProps: pageProperties,
  };
};

export default withReduxStore(App);
