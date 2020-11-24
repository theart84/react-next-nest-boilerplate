import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';

import { Feature } from '@common/enums/Feature';
import { mainSlice } from '@features/Main/duck/slice';
import { aboutSlice } from '@features/About/duck/slice';
import { infoSlice } from '@features/Info/duck/slice';

const reducer = {
  [Feature.MAIN]: mainSlice.reducer,
  [Feature.ABOUT]: aboutSlice.reducer,
  [Feature.INFO]: infoSlice.reducer,
};

export type IRootState = StateFromReducersMapObject<typeof reducer>;

const middleware = getDefaultMiddleware({ thunk: true });

export const initializeStore = (
  preloadedState?: IRootState,
): EnhancedStore<IRootState> =>
  configureStore({
    reducer,
    middleware,
    preloadedState,
  });
