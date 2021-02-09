import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import Head from 'next/head';

import { withReduxStore } from '@common/redux/hocs/withReduxStore';
import { IRootState, setStates } from '@common/redux/store';
import { INextPageContext } from '@common/types/INextPageContext';
import { Layout } from '@components/Layout/Layout';
import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { IS_SERVER } from '@common/utils/constants';
import { apiPage } from '@common/api/services/ApiPage';

export const App = ({
  Component,
  pageProps,
  reduxStore,
}: AppProps & { reduxStore: EnhancedStore<IRootState> }): JSX.Element => (
  <Provider store={reduxStore}>
    <Head>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <title>{pageProps?.title}</title>
    </Head>
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
  ctx: INextPageContext;
}): Promise<AppInitialProps> => {
  const payload = IS_SERVER
    ? ctx.query
    : (await apiPage.init(Component.page)).payload;

  if (Component.features) {
    Component.features.forEach((feature) => {
      const setState = setStates[feature];

      const state = payload.features[feature];

      ctx.store.dispatch(setState(state));
    });
  }

  return {
    pageProps: payload.page,
  };
};

export default withReduxStore(App);
