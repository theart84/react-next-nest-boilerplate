import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMain } from '@common/dto/features/IMain';
import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Features } from '@common/enums/Features';

export type IState = IBaseFeatureState<IMain>;

export const mainSlice = createSlice({
  name: Features.MAIN,
  initialState: {
    state: {
      title: 'INIT TITLE',
    },
  } as IState,
  reducers: {
    setState: (draft, action: PayloadAction<IMain>) => {
      draft.state = action.payload;
    },
  },
});
