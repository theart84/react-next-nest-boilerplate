import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Feature } from '@common/enums/Feature';
import { IInfo } from '@common/api/dto/Info/IInfo';

export type IState = IBaseFeatureState<IInfo>;

export const infoSlice = createSlice({
  name: Feature.INFO,
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
