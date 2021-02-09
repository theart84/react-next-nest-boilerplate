import React, { FC, ReactElement } from 'react';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@testing-library/react';
import { Provider } from 'react-redux';

import { EnhancedStore } from '@reduxjs/toolkit';

import { initializeStore, IRootState } from '@common/redux/store';

interface IOptionParams extends Omit<RenderOptions, 'queries' | 'wrapper'> {
  initialState?: IRootState;
  store?: EnhancedStore<IRootState>;
}

/**
 * Оборачивает фичу в контейнер редакса. Необходима для тестирования фичи, обособленно от всего приложения
 */
export const renderWithRedux = (
  ui: ReactElement,
  {
    initialState,
    store = initializeStore(initialState),
    ...renderOptions
  }: IOptionParams = {},
): RenderResult => {
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
