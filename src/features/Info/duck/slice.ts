import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Features } from '@common/enums/Features';
import { IInfo } from '@common/dto/features/IInfo';

export type IState = IBaseFeatureState<IInfo>;

export const infoSlice = createSlice({
  name: Features.INFO,
  initialState: {
    state: {
      phone: 0,
    },
  } as IState,
  reducers: {
    setState: (draft, action: PayloadAction<IInfo>) => {
      draft.state = action.payload;
    },
  },
});
