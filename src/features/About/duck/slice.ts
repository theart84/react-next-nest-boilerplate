import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Feature } from '@common/enums/Feature';
import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutCreateDto } from '@common/api/dto/About/AboutCreateDto';
import { apiAbout } from '@common/api/services/About/ApiAbout';

export interface IState extends IBaseFeatureState<IAbout> {
  tick: number;
}

export const asyncActions = {
  createAbout: createAsyncThunk(
    `${Feature.ABOUT}/create`,
    async (dto: AboutCreateDto): Promise<IAbout> => {
      const response = await apiAbout.create(dto);

      return response.payload;
    },
  ),
};

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
  extraReducers: {
    [asyncActions.createAbout.fulfilled.type]: (
      draft,
      payload: PayloadAction<IAbout>,
    ) => {
      draft.state = payload.payload;
    },
  },
});
