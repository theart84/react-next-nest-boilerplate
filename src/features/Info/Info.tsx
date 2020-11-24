import { FC } from 'react';

import { infoSlice } from '@features/Info/duck/slice';
import {
  IWithFeatureState,
  withFeatureState,
} from '@common/redux/hocs/withFeatureState';
import { Feature } from '@common/enums/Feature';

export const InfoComponent: FC<IWithFeatureState<Feature.INFO>> = ({
  state: { phone },
}) => <div>Phone: {phone}</div>;

export const Info = withFeatureState({
  feature: Feature.INFO,
  actions: infoSlice.actions,
})(InfoComponent);
