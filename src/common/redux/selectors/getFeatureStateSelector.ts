import { createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@common/redux/store';
import { IFeatureState } from '@common/redux/types/IFeatureState';
import { Feature } from '@common/enums/Feature';

export const getFeatureSelector = <FeatureName extends Feature>(
  feature: FeatureName,
) => (state: IRootState): IRootState[FeatureName] => state[feature];

export const getFeatureStateSelector = <FeatureName extends Feature>(
  feature: Feature,
): ((state: IRootState) => IFeatureState<FeatureName>) =>
  createSelector(getFeatureSelector(feature), (state) => state.state);
