import { FC } from 'react';

import { mainSlice } from '@features/Main/duck/slice';
import {
  IWithFeatureState,
  withFeatureState,
} from '@common/redux/hocs/withFeatureState';
import { Feature } from '@common/enums/Feature';

export const MainComponent: FC<IWithFeatureState<Feature.MAIN>> = ({
  state,
}) => <div>title from Redux: {state.title}</div>;

export const Main = withFeatureState({
  feature: Feature.MAIN,
  actions: mainSlice.actions,
})(MainComponent);
