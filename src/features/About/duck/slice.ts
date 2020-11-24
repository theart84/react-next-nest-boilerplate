import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Feature } from '@common/enums/Feature';
import { IAbout } from '@common/api/dto/About/IAbout';

export interface IState extends IBaseFeatureState<IAbout> {
  tick: number;
}

export const aboutSlice = createSlice({
  name: Feature.ABOUT,
  initialState: {
    state: {
      name: 'INIT NAME',
      surname: 'INIT SURNAME',
    },
    tick: 0,
  } as IState,
  reducers: {
    setState: (draft, action: PayloadAction<IAbout>) => {
      draft.state = action.payload;
    },
    increment: (draft) => {
      draft.tick += 1;
    },
    decrement: (draft) => {
      draft.tick -= 1;
    },
  },
});
