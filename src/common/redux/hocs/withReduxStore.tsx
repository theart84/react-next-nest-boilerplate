/* eslint no-underscore-dangle: off */
import React from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

import { initializeStore, IRootState } from '@common/redux/store';
import { INextPageContext } from '@common/types/INextPageContext';
import { IS_SERVER } from '@common/utils/constants';

const getOrCreateStore = (
  initialState?: IRootState,
): EnhancedStore<IRootState> => {
  if (IS_SERVER) {
    return initializeStore(initialState);
  }

  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = initializeStore(initialState);
  }

  return window.__NEXT_REDUX_STORE__;
};

interface IProperties extends AppProps {
  initialReduxState: IRootState;
}

export const withReduxStore = (
  App: React.FC<AppProps & { reduxStore: EnhancedStore<IRootState> }> & {
    getInitialProps(context: AppContext): Promise<AppInitialProps>;
  },
): ((properties: IProperties) => JSX.Element) => {
  const WithRedux = ({
    initialReduxState,
    ...properties
  }: IProperties): JSX.Element => {
    const reduxStore = getOrCreateStore(initialReduxState);

    return <App {...properties} reduxStore={reduxStore} />;
  };

  WithRedux.getInitialProps = async (context: AppContext) => {
    const store = getOrCreateStore();

    (context.ctx as INextPageContext).store = store;

    const appProperties = await App.getInitialProps(context);

    return {
      ...appProperties,
      initialReduxState: store.getState(),
    };
  };

  return WithRedux;
};
