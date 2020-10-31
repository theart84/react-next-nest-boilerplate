import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';

import { Features } from '@common/enums/Features';
import { mainSlice } from '@features/Main/duck/slice';
import { aboutSlice } from '@features/About/duck/slice';
import { infoSlice } from '@features/Info/duck/slice';

const reducer = {
  [Features.MAIN]: mainSlice.reducer,
  [Features.ABOUT]: aboutSlice.reducer,
  [Features.INFO]: infoSlice.reducer,
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
