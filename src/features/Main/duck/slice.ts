import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMain } from '@common/api/dto/Main/IMain';
import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Feature } from '@common/enums/Feature';

export type IState = IBaseFeatureState<IMain>;

export const mainSlice = createSlice({
  name: Feature.MAIN,
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
