import { createSelector } from 'reselect';

import { getFeatureSelector } from '@common/redux/selectors/getFeatureStateSelector';
import { Features } from '@common/enums/Features';

const featureSelector = getFeatureSelector(Features.ABOUT);

export const tickSelector = createSelector(
  featureSelector,
  (state) => state.tick,
);
