import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';

import { withReduxStore } from '@common/redux/hocs/withReduxStore';
import { IRootState } from '@common/redux/store';
import { INextPageContext } from '@common/pages/types/INextPageContext';
import { Layout } from '@components/Layout';
import { getPageApiService } from '@common/pages/utils/getPageApiService';
import { Pages } from '@common/enums/Pages';
import { IBaseNextPage } from '@common/pages/types/IBaseNextPage';

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

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext & {
  Component: IBaseNextPage;
  ctx: Omit<INextPageContext, 'isServer' | 'apiService'>;
}): Promise<AppInitialProps> => {
  let pageProperties = {};

  if (Component.init) {
    const pageName = ctx.pathname.replace('/views/', '');

    const ApiService = getPageApiService(pageName as Pages);

    const apiService = ApiService && new ApiService();

    pageProperties = await Component.init({
      ...ctx,
      isServer: !!ctx.req,
      apiService,
    });
  }

  return {
    pageProps: pageProperties,
  };
};

export default withReduxStore(App);
