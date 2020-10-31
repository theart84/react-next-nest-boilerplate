import Head from 'next/head';

import { About } from '@features/About/About';
import { aboutSlice } from '@features/About/duck/slice';
import { IBaseNextPage } from '@common/pages/types/IBaseNextPage';
import { Pages } from '@common/enums/Pages';

export const Test: IBaseNextPage<Pages.SAMPLE_TEST> = ({ title }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <About />
  </div>
);

Test.init = async ({ store, query, isServer, apiService }) => {
  const payload = isServer ? query : (await apiService.test()).payload;

  store.dispatch(aboutSlice.actions.setState(payload.features.about));

  return {
    title: payload.page.title,
  };
};

export { Test as default };
