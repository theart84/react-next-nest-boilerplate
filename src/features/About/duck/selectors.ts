import { createSelector } from 'reselect';

import { getFeatureSelector } from '@common/redux/selectors/getFeatureStateSelector';
import { Feature } from '@common/enums/Feature';

const featureSelector = getFeatureSelector(Feature.ABOUT);

export const tickSelector = createSelector(
  featureSelector,
  (state) => state.tick,
);
