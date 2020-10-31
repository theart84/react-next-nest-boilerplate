import { FC } from 'react';

import { mainSlice } from '@features/Main/duck/slice';
import {
  IWithFeatureState,
  withFeatureState,
} from '@common/redux/hocs/withFeatureState';
import { Features } from '@common/enums/Features';

export const MainComponent: FC<IWithFeatureState<Features.MAIN>> = ({
  state,
}) => <div>title from Redux: {state.title}</div>;

export const Main = withFeatureState({
  feature: Features.MAIN,
  actions: mainSlice.actions,
})(MainComponent);
