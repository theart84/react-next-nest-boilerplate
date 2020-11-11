/* eslint no-underscore-dangle: off */
import React from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { AppContext, AppInitialProps } from 'next/app';

import { initializeStore, IRootState } from '@common/redux/store';
import { INextPageContext } from '@common/pages/types/INextPageContext';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    __NEXT_REDUX_STORE__?: EnhancedStore<IRootState>;
  }
}

const getOrCreateStore = (
  initialState?: IRootState,
): EnhancedStore<IRootState> => {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window.__NEXT_REDUX_STORE__;
};

interface IProperties {
  initialReduxState: IRootState;
}

export const withReduxStore = (
  App: React.FC<{ reduxStore: EnhancedStore<IRootState> }> & {
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

    let appProperties = {};

    if (typeof App.getInitialProps === 'function') {
      appProperties = await App.getInitialProps(context);
    }

    return {
      ...appProperties,
      initialReduxState: store.getState(),
    };
  };

  return WithRedux;
};
