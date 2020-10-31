import { createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@common/redux/store';
import { IFeatureState } from '@common/redux/types/IFeatureState';
import { Features } from '@common/enums/Features';

export const getFeatureSelector = <Feature extends Features>(
  feature: Feature,
) => (state: IRootState): IRootState[Feature] => state[feature];

export const getFeatureStateSelector = <Feature extends Features>(
  feature: Feature,
): ((state: IRootState) => IFeatureState<Feature>) =>
  createSelector(getFeatureSelector(feature), (state) => state.state);
