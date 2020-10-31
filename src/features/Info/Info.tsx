import { FC } from 'react';

import { infoSlice } from '@features/Info/duck/slice';
import {
  IWithFeatureState,
  withFeatureState,
} from '@common/redux/hocs/withFeatureState';
import { Features } from '@common/enums/Features';

export const InfoComponent: FC<IWithFeatureState<Features.INFO>> = ({
  state: { phone },
}) => <div>Phone: {phone}</div>;

export const Info = withFeatureState({
  feature: Features.INFO,
  actions: infoSlice.actions,
})(InfoComponent);
